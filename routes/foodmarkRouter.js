const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bog'lanish obyekti

// CREATE - Yaratish
router.post('/foodmark', async (req, res) => {
  try {
    const { user_id, description, mark } = req.body;
    const query = 'INSERT INTO food_mark (user_id, description, mark) VALUES ($1, $2, $3) RETURNING *';
    const values = [user_id, description, mark];
  
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/foodmark', async (req, res) => {
  try {
    const query = 'SELECT * FROM food_mark';
  
  
    const result = await db.query(query);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Ma\'lumot topilmadi' });
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - O'qish
router.get('/foodmark/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM food_mark WHERE id = $1';
    const values = [id];
  
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

// UPDATE - O'zgartirish
router.put('/foodmark/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, description, mark } = req.body;
    const query = 'UPDATE food_mark SET user_id = $1, description = $2, mark = $3, time_update = current_timestamp WHERE id = $4 RETURNING *';
    const values = [user_id, description, mark, id];
  
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
router.delete('/foodmark/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM food_mark WHERE id = $1';
    const values = [id];
  
    await db.query(query, values);
    res.json({ message: 'Ma\'lumot o\'chirildi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;