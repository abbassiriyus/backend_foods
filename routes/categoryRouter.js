const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bog'lanish obyekti

// CREATE - Yaratish
router.post('/category', async (req, res) => {
  try {
    const { title, image } = req.body;
    const query = 'INSERT INTO category (title, image) VALUES ($1, $2) RETURNING *';
    const values = [title, image];

    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - O'qish
router.get('/category', async (req, res) => {
  try {
    const query = 'SELECT * FROM category';
    const result = await db.query(query);
    const query1 = 'SELECT * FROM foods';
    const resul1 = await db.query(query1);

    for (let i = 0; i < result.rows.length; i++) {
  result.rows[i].count=0
      for (let j = 0; j <resul1.rows.length; j++) {
 if(result.rows[i].id==resul1.rows[j].category_id){
  result.rows[i].count++
 }
   }}
      res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// UPDATE - O'zgartirish
router.put('/category/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, image } = req.body;
    const query = 'UPDATE category SET title = $1, image = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
    const values = [title, image, id];

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

// DELETE - O'chirish
router.delete('/category/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM category WHERE id = $1';
    const values = [id];

    await db.query(query, values);
    res.json({ message: 'Malumot ochirildi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;