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

  const query3 = 'SELECT * FROM  users';
  const result3 = await pool.query(query3);
   console.log(result3.rows);
  const query4 = 'SELECT * FROM  category';
  const result4 = await pool.query(query4);
  const query5 = 'SELECT * FROM  user_category';
  const result5 = await pool.query(query5);

  const query6 = 'SELECT * FROM  food_mark';
  const result6 = await pool.query(query6);
  const query7 = 'SELECT * FROM  user_povar';
  const result7 = await pool.query(query7);
  for (let i = 0; i < result5.rows.length; i++) {
  for (let j = 0; j < result4.rows.length; j++) {
  if(result5.rows[i].category_id==result4.rows[j].id){
    result5.rows[i].title=result4.rows[j].title
  }}}


for (let i = 0; i < result3.rows.length; i++) {
  result3.rows[i].category=[]
  for (let j = 0; j < result5.rows.length; j++) {
 if(result3.rows[i].id===result5.rows[j].user_id){
  result3.rows[i].category.push(result5.rows[j])
 }}}

for (let i = 0; i < result3.rows.length; i++) {
  result3.rows[i].mark=5
  result3.rows[i].mark_org=0
for (let j = 0; j <result6.rows.length; j++) {
if(result6.rows[j].user_id==result3.rows[i].id){
  result3.rows[i].mark=(result3.rows[i].mark+result3.rows[i].mark)/2
  result3.rows[i].mark_org++
}
}}
var senddate=[]
for (let i = 0; i < result3.rows.length; i++) {
  result3.rows[i].push=false
  for (let j = 0; j < result1.rows.length; j++) {
    if(result.rows[i].id==result1.rows[j].food_ca_id){
     result.rows[i].food_ca_id=result1.rows[j].id
   send_data.push(result.rows[i])
    }
 }
if(result3.rows[i].push){
  senddate.push(result3.rows[i])
}
}

for (let i = 0; i < senddate.length; i++) {
for (let j = 0; j < result7.rows.length; j++) {
if(senddate[i].id===result7.rows[j].user_id){
senddate[i].ish_yonalishi=result7.rows[j].ish_yonalishi
}}}


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