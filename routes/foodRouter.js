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
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read a foods record by ID
  router.get('/foods/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM foods WHERE id = $1';
      const result = await pool.query(query, [id]);
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