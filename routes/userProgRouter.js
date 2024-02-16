const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a user_prog
router.post('/userprog', (req, res) => {
  const { user_id, food_id, image } = req.body;
  const query = 'INSERT INTO user_prog (user_id, food_id, image) VALUES ($1, $2, $3) RETURNING *';
  const values = [user_id, food_id, image];

  db.query(query, values)
    .then(result => res.json(result.rows[0]))
    .catch(error => res.status(500).json({ error }));
});

// Read all user_prog records
router.get('/userprog/', (req, res) => {
  const query = 'SELECT * FROM user_prog';

  db.query(query)
    .then(result => res.json(result.rows))
    .catch(error => res.status(500).json({ error }));
});
router.get('/userprog/header', async (req, res) => {
  try {
    const query = 'SELECT * FROM user_prog';
    const query2 = 'SELECT * FROM foods';
    const query3 = 'SELECT * FROM users';
    const query4 = 'SELECT * FROM food_mark'; 
    const query5 = 'SELECT * FROM user_povar';
    const result = await db.query(query);
    const result2 = await db.query(query2);
    const result3 = await db.query(query3);
    const result4 = await db.query(query4);
    const result5 = await db.query(query5);

for (let i = 0; i < result3.rows.length; i++) {
for (let j = 0; j < result5.rows.length; j++) {
 if(result3.rows[i].id==result5.rows[j].user_id){
  result3.rows[i].ish_yonalishi_title=result5.rows[j].ish_yonalishi
 }
}}
for (let i = 0; i < result2.rows.length; i++) {
      result2.rows[i].mark=5
      result2.rows[i].mark_org=0
     for (let j = 0; j < result4.rows.length; j++) {
      if(result2.rows[i].id==result4.rows[j].user_id){
        result2.rows[i].mark=(result4.rows[j].mark+result2.rows[i].mark)/2
        result2.rows[i].mark_org=result2.rows[i].mark_org+1
      }
     }
    }
for (let i = 0; i < result.rows.length; i++) {
for (let j = 0; j < result2.rows.length; j++) {
if(result2.rows[j].id==result.rows[i].food_id){
  result.rows[i].food_name=result2.rows[j].food_name
  result.rows[i].price=result2.rows[j].price
  result.rows[i].user_povar_id=result2.rows[j].user_povar_id
  result.rows[i].food_name=result2.rows[j].food_name
  result.rows[i].mark=result2.rows[j].mark
  result.rows[i].mark_org=result2.rows[j].mark_org
  result.rows[i].user_image=result2.rows[j].image
}
}
for (let j = 0; j < result3.rows.length; j++) {
  if(result3.rows[j].id==result.rows[i].user_id){
    result.rows[i].username=result3.rows[j].username
    result.rows[i].lastname=result3.rows[j].lastname
    result.rows[i].name=result3.rows[j].name
    result.rows[i].ish_yonalishi_title=result3.rows[j].ish_yonalishi_title
    result.rows[i].username=result3.rows[j].username
  }
  }
}
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Read a specific user_prog record
router.get('/userprog/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM user_prog WHERE id = $1';
  const values = [id];
  db.query(query, values)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Record not found' });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(error => res.status(500).json({ error }));
});

// Update a user_prog record
router.put('/userprog/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, food_id, image } = req.body;
  const query = 'UPDATE user_prog SET user_id = $1, food_id = $2, image = $3, time_update = current_timestamp WHERE id = $4 RETURNING *';
  const values = [user_id, food_id, image, id];

  db.query(query, values)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Record not found' });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(error => res.status(500).json({ error }));
});

// Delete a user_prog record
router.delete('/userprog/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM user_prog WHERE id = $1';
  const values = [id];

  db.query(query, values)
    .then(() => res.json({ message: 'Record deleted successfully' }))
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;