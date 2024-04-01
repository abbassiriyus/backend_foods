const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bog'lanish obyekti

// CREATE - Yaratish
router.post('/gl_foods', async (req, res) => {
  try {
    const { food_ca_id } = req.body;
    const query = 'INSERT INTO gl_foods (food_ca_id) VALUES ($1) RETURNING *';
    const values = [food_ca_id];
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - O'qish
router.get('/gl_foods/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM gl_foods WHERE id = $1';
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
router.get('/gl_foods/', async (req, res) => {
    try {
        const query = 'SELECT * FROM foods';
        const result = await db.query(query);
        const query1 = 'SELECT * FROM gl_foods';
        const result1 = await db.query(query1);
        const query2 = 'SELECT * FROM users';
        const result2 = await db.query(query2);
        const query3 = 'SELECT * FROM food_mark';
        const result3 = await db.query(query3);
  
  for (let i = 0; i < result2.rows.length; i++) {
      result2.rows[i].mark=5
      result2.rows[i].mark_org=0
   for (let j = 0; j < result3.rows.length; j++) {
   if(result2.rows[i].id==result3.rows[j].user_id){
      result2.rows[i].mark=(result2.rows[i].mark+result3.rows[j].mark)/2
      result2.rows[i].mark_org++
   }
  }}
  
  
  
        var send_data=[]
        for (let i = 0; i < result.rows.length; i++) {
          for (let j = 0; j < result1.rows.length; j++) {
            if(result.rows[i].id==result1.rows[j].food_ca_id){
             result.rows[i].food_ca_id=result1.rows[j].id
           send_data.push(result.rows[i])
            }
         }
          for (let j = 0; j < result2.rows.length; j++) {
            if(result.rows[i].user_povar_id==result2.rows[j].id){
              result.rows[i].user_image=result2.rows[j].image
              result.rows[i].mark=result2.rows[j].mark
              result.rows[i].mark_org=result2.rows[j].mark_org
              result.rows[i].username=result2.rows[j].username
              result.rows[i].name=result2.rows[j].name
              result.rows[i].lastname=result2.rows[j].lastname
  
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
router.put('/gl_foods/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { food_ca_id } = req.body;
    const query = 'UPDATE gl_foods SET food_ca_id = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
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
router.delete('/gl_foods/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM gl_foods WHERE id = $1';
    const values = [id];

    await db.query(query, values);
    res.json({ message: 'Malumot o\'chirildi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;