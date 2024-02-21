const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const { upload_image, put_image, delete_file, delete_image } = require('../middleware/file_upload');
const router = express.Router();

// Create a foods record
router.post('/foods', async (req, res) => {
    try {
      const {
        user_povar_id,
        category_id,
        foods_name,
        portion,
        weight,
        preparation_time,
        storage_condition,
        calorie,
        proteins,
        oils,
        carbs,
        packages,
        price
      } = req.body;
      var image = upload_image(req);
      const query =
        'INSERT INTO foods (user_povar_id, category_id, foods_name, portion, weight, preparation_time, storage_condition, calorie, proteins, oils, carbs, packages, price, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
      const values = [
        user_povar_id,
        category_id,
        foods_name,
        portion,
        weight,
        preparation_time,
        storage_condition,
        calorie,
        proteins,
        oils,
        carbs,
        packages,
        price,
        image,
      ];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read all foods records
  router.get('/foods', async (req, res) => {
    try {
      const query = 'SELECT * FROM foods';
      const result = await pool.query(query);
      const query2 = 'SELECT * FROM users';
      const result2 = await pool.query(query2);
      const query3 = 'SELECT * FROM food_mark';
      const result3 = await pool.query(query3);

for (let i = 0; i < result2.rows.length; i++) {
    result2.rows[i].mark=5
    result2.rows[i].mark_org=0
 for (let j = 0; j < result3.rows.length; j++) {
  console.log(result2.rows[i].id,result3.rows[j].user_id);
 if(result2.rows[i].id==result3.rows[j].user_id){
    result2.rows[i].mark=(result2.rows[i].mark+result3.rows[j].mark)/2
    result2.rows[i].mark_org=result2.rows[i].mark_org+1
    console.log( result2.rows[i].mark);
 }
}}
for (let i = 0; i < result.rows.length; i++) {
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
        res.status(200).json(result.rows);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
    // const query2 = 'SELECT * FROM users';
      // const result2 = await pool.query(query2);
      // const query3 = 'SELECT * FROM food_mark';
      // const result3 = await pool.query(query3);

  // Read a foods record by ID
router.get('/foods/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM foods WHERE id = $1';
      const result = await pool.query(query, [id]);
if (result.rows.length === 0) {
    res.status(404).json({ message: 'Malumot topilmadi' });
    } else {
    var one_food=result.rows[0]
    const query2 = 'SELECT * FROM users WHERE id = $1';
    const result2 = await pool.query(query2, [one_food.user_povar_id]);
    if(result2.rows.length===0){
    res.status(404).send("bu shirinlik uchun user topilmadi")
    }else{
     var food_user=result2.rows[0]
      const query3 = 'SELECT * FROM food_mark WHERE user_id = $1';
      const result3 = await pool.query(query3,[food_user.id]);
      const query6 = 'SELECT * FROM user_povar WHERE user_id = $1';
      const pover = await pool.query(query6,[food_user.id]);
      const query4 = 'SELECT * FROM user_category WHERE user_id = $1';
      const usercategory = await pool.query(query4,[food_user.id]);
      const query5 = 'SELECT * FROM category';
      const category = await pool.query(query5); 
      console.log(usercategory.rows);
for (let i = 0; i < usercategory.rows.length; i++) {
for (let j = 0; j < category.rows.length; j++) {
 
 if(category.rows[j].id===usercategory.rows[i].category_id){
  usercategory.rows[i].title=category.rows[j].title
 }
}}
if(pover.rows.length==0){
  food_user.pover=false
}else{
food_user.pover=pover.rows[0]
}     
     food_user.category=usercategory.rows
     food_user.mark_org=result3.rows.length
     food_user.mark=5

for (let i = 0; i < result3.rows.length; i++) {
food_user.mark=(result3.rows[i].mark+food_user.mark)/2
}
res.status(200).json({food:one_food,user:food_user,comment:result3.rows});
    
}}
   } catch (error) {
    console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a foods record by ID
  router.put('/foods/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        user_povar_id,
        category_id,
        foods_name,
        portion,
        weight,
        preparation_time,
        storage_condition,
        calorie,
        proteins,
        oils,
        carbs,
        packages,
        price,
      
      } = req.body;
      const query2 = 'SELECT * FROM foods WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      var image=put_image(result2.rows[0].image,req)
      const query =
        'UPDATE foods SET user_povar_id = $1, category_id = $2, foods_name = $3, portion = $4, weight = $5, preparation_time = $6, storage_condition = $7, calorie = $8, proteins = $9, oils = $10, carbs = $11, packages = $12, price = $13, image = $14, time_update = current_timestamp WHERE id = $15 RETURNING *';
      const values = [
        user_povar_id,
        category_id,
        foods_name,
        portion,
        weight,
        preparation_time,
       storage_condition,
        calorie,
        proteins,
        oils,
        carbs,
        packages,
        price,
        image,
        id,
      ];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Delete a foods record by ID
  router.delete('/foods/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query2= 'SELECT * FROM foods WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      delete_image(result2.rows[0].image)
      const query = 'DELETE FROM foods WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  




module.exports=router