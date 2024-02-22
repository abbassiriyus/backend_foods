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
    const query2 = 'SELECT * FROM user_povar';
    const resul2 = await db.query(query2);
    const query3 = 'SELECT * FROM user_category';
    const resul3 = await db.query(query3);


    for (let i = 0; i < result.rows.length; i++) {
  result.rows[i].count=0
      for (let j = 0; j <resul1.rows.length; j++) {
 if(result.rows[i].id==resul1.rows[j].category_id){
  result.rows[i].count++
 }
   }}


   for (let i = 0; i < resul2.rows.length; i++) {
    resul2.rows[i].count1=0
  for (let j = 0; j < resul3.rows.length; j++) {
  if(resul2.rows[i].user_id==resul3.rows[j].user_id){
    resul2.rows[i].category_id=resul3.rows[j].category_id
    resul2.rows[i].count1++
  }}}
  for (let i = 0; i < result.rows.length; i++) {

 for (let j = 0; j < resul2.rows.length; j++) {
 if(result.rows[i].id==resul2.rows[j].category_id){
  result.rows[i].count1=resul2.rows[j].count1
 }
 }
  }


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