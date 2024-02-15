require('dotenv').config();
const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const { upload_image, generateVerificationCode, put_image, delete_image } = require('../middleware/file_upload');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email ve password.' });
  }
  const { id } = req.params;
    const query = 'SELECT * FROM users WHERE email=$1 and password=$2';
    const result = await pool.query(query, [email,password]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {  const payload = { email, password };
  const token = jwt.sign(payload, process.env.SECRET_KEY);

  res.json({ token });

    }
  // Burada email ve password veya phone ve password bilgilerini kullanarak token yaratıyoruz
});
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization;

  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Token topilmadi. Kirish mumkin emas.' });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const { email, password } = payload;

    const query = 'SELECT * FROM users WHERE email=$1 and password=$2';
    const result = await pool.query(query, [email, password]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    }

    const user = result.rows[0];

    // Foydalanuvchi ma'lumotlari
    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Notogri yoki ajratilmagan token. Kirish mumkin emas.' });
  }
})
router.put('/update-data/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { email, name, address, city, country, postal_code, about_me, username, lastname } = req.body;     
      const query = `UPDATE users SET email = $1, name = $2, address = $3, city = $4, country = $5, postal_code = $6, about_me = $7, username = $8, lastname = $9 WHERE id = $10`;
      await pool.query(query, [email, name, address, city, country, postal_code, about_me, username, lastname, id]);
      res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports=router