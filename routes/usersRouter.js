require('dotenv').config();
const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const { upload_image, generateVerificationCode, put_image, delete_image } = require('../middleware/file_upload');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Create a new user
router.post('/register', async (req, res) => {
  try {
    const { password, email, phone, address } = req.body;
    var image = upload_image(req);
    const query = 'INSERT INTO users (password, email, phone, address, image) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [password, email, phone, address, image];
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

router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  const query = 'SELECT * FROM users WHERE phone = $1';
  const result = await pool.query(query, [phone]);

  if (!phone || !password) {
    return res.status(400).json({ error: 'Phone ve password alanları zorunludur.' });
  }
  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Geçersiz telefon numarası veya şifre.' });
  }
  const payload = { phone };
  const token = jwt.sign(payload, process.env.SECRET_KEY);
if(result.rows[0].password===password){
  res.json({ token,user:result.rows });
}else{
  res.status(500).send("parolar xato kiritilgan")
}

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
    const { password, email, phone, address } = req.body;
    const query2 = 'SELECT * FROM users WHERE id = $1';
    const result2 = await pool.query(query2, [id]);
    var image=put_image(result2.rows[0].image,req)
    const query = 'UPDATE users SET password = $1, email = $2, phone = $3, address = $4,image = $5 WHERE id = $6 RETURNING *';
    const values = [password, email, phone, address,image, id];
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
      const { password, email, phone, address } = req.body;
      const updates = {};
      if (password) updates.password = password;
      if (email) updates.email = email;
      if (phone) updates.phone = phone;
      if (address) updates.address = address;
      const query2 = 'SELECT * FROM users WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      var image=put_image(result2.rows[0].image,req)
      const query = 'UPDATE users SET password = $1, email = $2, phone = $3, address = $4,image = $5 WHERE id = $6 RETURNING *';
      const values = [updates.password, updates.email, updates.phone, updates.address,image, id];
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
    res.status(500).json({ error: error.message });
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

router.post('/verify/check', async (req, res) => {
  const { phone, code } = req.body;
  try {
    const query = 'SELECT * FROM verify WHERE phone = $1 AND code = $2';
    const values = [phone, code];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      // Doğrulama kodu doğru
      const token = jwt.sign({ phone }, "secretKey"); // Token oluşturma
    const query1 = 'SELECT * FROM users WHERE phone = $1';
    const values1 = [phone];
    const result1 = await pool.query(query1, values1);
    if(result1.rows.length>0){
      res.json({ valid: true, token,user:result1.rows });
    }else{
      res.json({ valid: true, token });
    }
      
    } else {
      // Doğrulama kodu yanlış veya eşleşen bir kayıt bulunamadı
      res.json({ valid: false });
    }
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});


module.exports=router