const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bog'lanish obyekti

// CREATE - Yaratish
router.post('/ishyonalishi', async (req, res) => {
  try {
    const { title } = req.body;
    const query = 'INSERT INTO ish_yonalishi (title) VALUES ($1) RETURNING *';
    const values = [title];
  
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - O'qish
router.get('/ishyonalishi/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM ish_yonalishi WHERE id = $1';
    const values = [id];
  
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Malumot topilmadi' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// READ - O'qish
router.get('/ishyonalishi', async (req, res) => {
    try {
      const query = 'SELECT * FROM ish_yonalishi';
      const result = await db.query(query);
      const query2 = 'SELECT * FROM user_povar';
      const result2 = await db.query(query2);
for (let i = 0; i < result.rows.length; i++) {
  result.rows[i].count=0
for (let j = 0; j < result2.rows.length; j++) {
 if(result.rows[i].title==result2.rows[j].ish_yonalishi){
  result.rows[i].count++
 }
    
}
}



      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Malumot topilmadi' });
      } else {
        res.json(result.rows);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// UPDATE - O'zgartirish
router.put('/ishyonalishi/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title } = req.body;
    const query = 'UPDATE ish_yonalishi SET title = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
    const values = [title, id];
  
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Ma\'lumot topilmadi' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - O'chirish
router.delete('/ishyonalishi/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM ish_yonalishi WHERE id = $1';
    const values = [id];
  
    await db.query(query, values);
    res.json({ message: 'Ma\'lumot o\'chirildi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;