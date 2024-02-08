const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();

// Create a food_advantage record
router.post('/food_advantages', async (req, res) => {
    try {
      const { food_id, advantages_id } = req.body;
      const query =
        'INSERT INTO food_advantages (food_id, advantages_id) VALUES ($1, $2) RETURNING *';
      const values = [food_id, advantages_id];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read all food_advantage records
  router.get('/food_advantages', async (req, res) => {
    try {
      const query = 'SELECT * FROM food_advantages';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read a food_advantage record by ID
  router.get('/food_advantages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM food_advantages WHERE id = $1';
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
  
  // Update a food_advantage record by ID
  router.put('/food_advantages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { food_id, advantages_id } = req.body;
      const query =
        'UPDATE food_advantages SET food_id = $1, advantages_id = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
      const values = [food_id, advantages_id, id];
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
  
  // Delete a food_advantage record by ID
  router.delete('/food_advantages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM food_advantages WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  




module.exports=router