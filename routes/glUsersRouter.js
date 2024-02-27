const express = require('express');
const router = express.Router();
const pool = require("../db.js");


// CREATE - POST işlemi
router.post('/gl_users', (req, res) => {
  const { user_ca_id } = req.body;

  const query = 'INSERT INTO gl_users (user_ca_id) VALUES ($1) RETURNING *';
  const values = [user_ca_id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Veritabanına yazarken hata oluştu:', err);
      res.status(500).send('Sunucuda bir hata oluştu');
    } else {
      res.status(201).json(result.rows[0]);
    }
  });
});

// READ - GET işlemi
router.get('/gl_users/', (req, res) => {
  const query = 'SELECT * FROM gl_users';
  const query2= 'SELECT * FROM users';
  pool.query(query, (err, result) => {
    if (err) {
      console.error('Veritabanından okurken hata oluştu:', err);
      res.status(500).send('Sunucuda bir hata oluştu');
    } else {
      if (result.rows.length > 0) {
pool.query(query,(err2,result2)=>{



})

        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).send('Veri bulunamadı');
      }
    }
  });
});

// UPDATE - PUT işlemi
router.put('/gl_users/:id', (req, res) => {
  const id = req.params.id;
  const { user_ca_id } = req.body;

  const query = 'UPDATE gl_users SET user_ca_id = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
  const values = [user_ca_id, id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Veritabanında güncellerken hata oluştu:', err);
      res.status(500).send('Sunucuda bir hata oluştu');
    } else {
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).send('Veri bulunamadı');
      }
    }
  });
});

// DELETE - DELETE işlemi
router.delete('/gl_users/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM gl_users WHERE id = $1';
  const values = [id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Veritabanından silerken hata oluştu:', err);
      res.status(500).send('Sunucuda bir hata oluştu');
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;