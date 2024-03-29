const express = require('express');
const router = express.Router();
const pool= require('../db.js');
const { upload_image } = require('../middleware/file_upload.js');


// CREATE - POST so'rovi
router.post('/gl_otzif', (req, res) => {
  const { fullname, servis,deskription } = req.body;
  
  const query = 'INSERT INTO gl_otzif (image, fullname, servis,deskription) VALUES ($1, $2, $3,$4) RETURNING *';
  var image=""
  if((req.files && req.files.image) || req.body.image ){
   image = upload_image(req);
  }
  const values = [image, fullname, servis,deskription];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Malumotni qoshishda xatolik yuz berdi:', err);
      res.status(500).send({error:err.message});
    } else {
      res.status(201).json(result.rows[0]);
    }
  });
});

// READ - GET so'rovi
router.get('/gl_otzif', (req, res) => {
  const query = 'SELECT * FROM gl_otzif';

  pool.query(query, (err, result) => {
    if (err) {
      console.error('Malumotlarni oqishda xatolik yuz berdi:', err);
      res.status(500).send({error:err.message});
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// READ - GET so'rovi by ID
router.get('/gl_otzif/:id', (req, res) => {
    const id = req.params.id;
  
    const query = 'SELECT * FROM gl_otzif WHERE id = $1';
    const values = [id];
  
    pool.query(query, values, (err, result) => {
      if (err) {
        console.error('Ma\'lumotlarni o\'qishda xatolik yuz berdi:', err);
        res.status(500).send({error:err.message});
      } else {
        if (result.rows.length > 0) {
          res.status(200).json(result.rows[0]);
        } else {
          res.status(404).send('Ma\'lumot topilmadi');
        }
      }
    });
  });

// UPDATE - PUT so'rovi
router.put('/gl_otzif/:id', (req, res) => {
  const id = req.params.id;
  const { image, fullname, servis,deskription } = req.body;

  const query = 'UPDATE gl_otzif SET image = $1, fullname = $2, servis = $3,deskription=$4, time_update = current_timestamp WHERE id = $5 RETURNING *';
  const values = [image, fullname, servis,deskription, id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Ma\'lumotni yangilashda xatolik yuz berdi:', err);
      res.status(500).send({error:err.message});
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

// DELETE - DELETE so'rovi
router.delete('/gl_otzif/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM gl_otzif WHERE id = $1';
  const values = [id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Ma\'lumotni o\'chirishda xatolik yuz berdi:', err);
      res.status(500).send({error:err.message});
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;