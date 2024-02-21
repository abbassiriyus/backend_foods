const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database

const router = express.Router();



router.post('/user_povar', async (req, res) => {
  try {
    const { user_id, deskription,ish_yonalishi, expertise, place, is_prepared } = req.body;
    const query =
      'INSERT INTO user_povar (user_id, deskription, expertise, place, is_prepared,image,ish_yonalishi) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *';
    const values = [user_id, deskription, expertise, place, is_prepared,image,ish_yonalishi];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});


// Get all users
router.get('/user_povar', async (req, res) => {
  try {
    const query = 'SELECT * FROM user_povar';
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});

// Get all users
router.get('/getpovar', async (req, res) => {
  try {
    const query = 'SELECT * FROM user_povar';
    const query1 = 'SELECT * FROM users';
    const query2 = 'SELECT * FROM foods';
    const result = await pool.query(query);
    const result1 = await pool.query(query1);
    const result2 = await pool.query(query2);

    const query3 = 'SELECT * FROM food_mark';
    const result3 = await pool.query(query3);


    const query5 = 'SELECT * FROM category';
    const result5 = await pool.query(query5);
    const query6 = 'SELECT * FROM user_category';
    const result6 = await pool.query(query6);


    for (let i = 0; i < result6.rows.length; i++) {
for (let j = 0; j < result5.rows.length; j++) {
if(result6.rows[i].category_id===result5.rows[j].id){
  result6.rows[i].title=result5.rows[j].title
}}}



    for (let i = 0; i <result.rows.length; i++) {
      result.rows[i].category=[]
     for (let j = 0; j < result1.rows.length; j++) {
     if(result.rows[i].user_id==result1.rows[j].id){
      result.rows[i].name=result1.rows[j].name
      result.rows[i].address=result1.rows[j].address
      result.rows[i].city=result1.rows[j].city
      result.rows[i].country=result1.rows[j].country
      result.rows[i].postal_code=result1.rows[j].postal_code
      result.rows[i].about_me=result1.rows[j].about_me
      result.rows[i].username=result1.rows[j].username
      result.rows[i].lastname=result1.rows[j].lastname
      result.rows[i].image=result1.rows[j].image
     }}
for (let j = 0; j < result6.rows.length; j++) {
if(result6.rows[j].user_id===result.rows[i].user_id){
  result.rows[i].category.push(result6.rows[j])

}
  
}    
    }


for (let i = 0; i < result.rows.length; i++) {
result.rows[i].mark=5
result.rows[i].mark_org=0
  for (let j = 0; j < result3.rows.length; j++) {
   if(result.rows[i].user_id==result3.rows[j].user_id){
  result.rows[i].mark_org++
  result.rows[i].mark=(result.rows[i].mark+result3.rows[j].mark)/2
 }
}
  
}


for (let i = 0; i <result.rows.length; i++) {
      result.rows[i].foods=[]
      for (let j = 0; j < result2.rows.length; j++) {
      if(result.rows[i].user_id==result2.rows[j].user_povar_id){
        result.rows[i].foods.push(result2.rows[j])
      }
      }}
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});



// Get a user by ID
router.get('/user_povar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM user_povar WHERE id = $1';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});

// Update a user by ID
router.put('/user_povar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, deskription, expertise, place, is_prepared,ish_yonalishi } = req.body;
    const query =
      'UPDATE user_povar SET user_id = $1, deskription = $2, expertise = $3, place = $4, is_prepared = $5,ish_yonalishi=$6, time_update = current_timestamp WHERE id = $7 RETURNING *';
    const values = [user_id, deskription, expertise, place, is_prepared,ish_yonalishi, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});

// Delete a user by ID
router.delete('/user_povar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM user_povar WHERE id = $1';
    await pool.query(query, [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});



module.exports=router