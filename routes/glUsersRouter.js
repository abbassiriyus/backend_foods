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
router.get('/gl_users/', async (req, res) => {
 try{
  const query2 = 'SELECT * FROM gl_users';
  const result2 = await pool.query(query2);
   console.log(result2.rows);
  const query3 = 'SELECT * FROM  users';
  const result3 = await pool.query(query3);
   console.log(result3.rows);
  const query4 = 'SELECT * FROM  category';
  const result4 = await pool.query(query4);
  const query5 = 'SELECT * FROM  user_category';
  const result5 = await pool.query(query5);

  for (let i = 0; i < result5.rows.length; i++) {
  for (let j = 0; j < result4.rows.length; j++) {
  if(result5.rows[i].category_id==result4.rows[j].id){
    result5.rows[i].title==result4.rows[j].title
  }}}


for (let i = 0; i < result3.rows.length; i++) {
  result3.rows[i].category=[]
  for (let j = 0; j < result5.rows.length; j++) {
 if(result3.rows[i].id===result5.rows[j].user_id){
  result3.rows[i].category.push(result5.rows[j])
 }}}


var senddate=[]
for (let i = 0; i < result3.rows.length; i++) {
  result3.rows[i].push=false
  for (let j = 0; j < result2.rows.length; j++) {
  if(result3.rows[i].id==result2.rows[j].user_ca_id){
    result3.rows[i].push=true 
  }
}
if(result3.rows[i].push){
  senddate.push(result3.rows[i])
}
}

res.status(200).send(senddate)
 }catch(er){
res.status(500).send(er)
 }
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