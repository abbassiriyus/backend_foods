const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();

// Create a food record
router.post('/food', async (req, res) => {
    try {
      const {
        user_povar_id,
        category_id,
        food_name,
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
      } = req.body;
      const query =
        'INSERT INTO food (user_povar_id, category_id, food_name, portion, weight, preparation_time, storage_condition, calorie, proteins, oils, carbs, packages, price, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
      const values = [
        user_povar_id,
        category_id,
        food_name,
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
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read all food records
  router.get('/food', async (req, res) => {
    try {
      const query = 'SELECT * FROM food';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read a food record by ID
  router.get('/food/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM food WHERE id = $1';
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Update a food record by ID
  router.put('/food/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        user_povar_id,
        category_id,
        food_name,
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
      } = req.body;
      const query =
        'UPDATE food SET user_povar_id = $1, category_id = $2, food_name = $3, portion = $4, weight = $5, preparation_time = $6, storage_condition = $7, calorie = $8, proteins = $9, oils = $10, carbs = $11, packages = $12, price = $13, image = $14, time_update = current_timestamp WHERE id = $15 RETURNING *';
      const values = [
        user_povar_id,
        category_id,
        food_name,
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
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a food record by ID
  router.delete('/food/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM food WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  




module.exports=router