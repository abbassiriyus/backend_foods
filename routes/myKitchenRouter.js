const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();

// Create a my_kitchen record
router.post('/my_kitchen', async (req, res) => {
    try {
      const { user_povar_id, image } = req.body;
      const query =
        'INSERT INTO my_kitchen (user_povar_id, image) VALUES ($1, $2) RETURNING *';
      const values = [user_povar_id, image];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read all my_kitchen records
  router.get('/my_kitchen', async (req, res) => {
    try {
      const query = 'SELECT * FROM my_kitchen';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read a my_kitchen record by ID
  router.get('/my_kitchen/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM my_kitchen WHERE id = $1';
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
  
  // Update a my_kitchen record by ID
  router.put('/my_kitchen/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { user_povar_id, image } = req.body;
      const query =
        'UPDATE my_kitchen SET user_povar_id = $1, image = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
      const values = [user_povar_id, image, id];
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
  
  // Delete a my_kitchen record by ID
  router.delete('/my_kitchen/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM my_kitchen WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  




module.exports=router