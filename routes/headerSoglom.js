const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bog'lanish obyekti

// CREATE - Yaratish
router.post('/soglom', async (req, res) => {
  try {
    const { food_ca_id } = req.body;
    const query = 'INSERT INTO soglom (food_ca_id) VALUES ($1) RETURNING *';
    const values = [food_ca_id];
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - O'qish
router.get('/soglom/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM soglom WHERE id = $1';
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
router.get('/soglom/', async (req, res) => {
    try {
      const query = 'SELECT * FROM category';
      const result = await db.query(query);
      const query1 = 'SELECT * FROM soglom';
      const result1 = await db.query(query1);
      var send_data=[]
      for (let i = 0; i < result.rows.length; i++) {
        for (let j = 0; j < result1.rows.length; j++) {
           if(result.rows[i].id==result1.rows[j].food_ca_id){
            result.rows[i].food_ca_id=result1.rows[j].id
            send_data.push(result.rows[i])
           }
        }
        
      }
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Malumot topilmadi' });
      } else {
        res.json(send_data);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// UPDATE - O'zgartirish
router.put('/soglom/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { food_ca_id } = req.body;
    const query = 'UPDATE soglom SET food_ca_id = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
    const values = [food_ca_id, id];

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
router.delete('/soglom/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM soglom WHERE id = $1';
    const values = [id];

    await db.query(query, values);
    res.json({ message: 'Malumot o\'chirildi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;