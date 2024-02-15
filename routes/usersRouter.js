require('dotenv').config();
const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const { upload_image, generateVerificationCode, put_image, delete_image } = require('../middleware/file_upload');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Create a new user
router.post('/register', async (req, res) => {
  try {
    const { password, email, phone, place,ish_yonalishi_id } = req.body;
    var image = upload_image(req);
    const query = 'INSERT INTO users (password, email, phone, place, image,ish_yonalishi_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [password, email, phone, place, image,ish_yonalishi_id];
    // Generate a verification code
    const verificationCode = generateVerificationCode();
    // Generate a token
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    // Save the user data to the database
    const result = await pool.query(query, values);
    res.status(201).json({ data: result.rows[0], verificationCode, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// Token yaratma endpoint'i
router.post('/login', (req, res) => {
  const { email, password, phone } = req.body;
  if ((!email || !password) && (!phone || !password)) {
    return res.status(400).json({ error: 'Email ve password veya phone ve password alanları zorunludur.' });
  }
  // Burada email ve password veya phone ve password bilgilerini kullanarak token yaratıyoruz
  const payload = { email, password, phone };
  const token = jwt.sign(payload, process.env.SECRET_KEY);

  res.json({ token });
});



// Get all users
router.get('/users', async (req, res) => {
  // console.log("hello");
  try {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query); 
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
  res.status(200).send("asdasd")
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password, email, phone, place } = req.body;
    const query2 = 'SELECT * FROM users WHERE id = $1';
    const result2 = await pool.query(query2, [id]);
    var image=put_image(result2.rows[0].image,req)
    const query = 'UPDATE users SET password = $1, email = $2, phone = $3, place = $4,image = $5 WHERE id = $6 RETURNING *';
    const values = [password, email, phone, place,image, id];
    const result = await pool.query(query, values);
    if (result.rows.length===0){
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.patch('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { password, email, phone, place } = req.body;
      const updates = {};
      if (password) updates.password = password;
      if (email) updates.email = email;
      if (phone) updates.phone = phone;
      if (place) updates.place = place;
      const query2 = 'SELECT * FROM users WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      var image=put_image(result2.rows[0].image,req)
      const query = 'UPDATE users SET password = $1, email = $2, phone = $3, place = $4,image = $5 WHERE id = $6 RETURNING *';
      const values = [updates.password, updates.email, updates.phone, updates.place,image, id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query2= 'SELECT * FROM users WHERE id = $1';
    const result2 = await pool.query(query2, [id]);
    delete_image(result2.rows[0].image)
    const query = 'DELETE FROM users WHERE id = $1';
   var {rows} =await pool.query(query, [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Telefon numarası doğrulama kodu oluşturma ve kaydetme
router.post('/verify', async (req, res) => {
  const { phone } = req.body;

  try {
    const code = generateVerificationCode();
    const query2 = 'SELECT * FROM verify WHERE phone = $1';
    const values2 = [phone];
    const result2= await pool.query(query2, values2);
if(result2.rows.length==0){
const query = 'INSERT INTO verify (phone, code) VALUES ($1, $2) RETURNING id';
    const values = [phone, code];
    const result = await pool.query(query, values);
    res.status(201).json({ id: result.rows[0].id, code });
}else{
  const query3 = `UPDATE verify SET code = $1,
  time_update = current_timestamp WHERE id = $2 RETURNING *`;
console.log(result2.rows[0]);
const values3= [code, result2.rows[0].id];

const result3 = await pool.query(query3, values3);
res.status(201).json({ id: result2.rows[0].id, code });
}

    
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});
router.post('/verify2', async (req, res) => {
  const { phone } = req.body;

  try {
    const code = generateVerificationCode();
    const query2 = 'SELECT * FROM users WHERE phone = $1';
    const values2 = [phone];
const result2= await pool.query(query2, values2);
if(result2.rows.length==0){
 res.status(500).send("user topilmadi") 
}else{
res.status(200).send("succsess")
}  
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});



module.exports=router