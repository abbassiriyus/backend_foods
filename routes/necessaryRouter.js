const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();



// Create a necessary record
router.post('/necessary', async (req, res) => {
    try {
      const { file, title } = req.body;
      const query =
        'INSERT INTO necessary (file, title) VALUES ($1, $2) RETURNING *';
      const values = [file, title];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read all necessary records
  router.get('/necessary', async (req, res) => {
    try {
      const query = 'SELECT * FROM necessary';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read a necessary record by ID
  router.get('/necessary/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM necessary WHERE id = $1';
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
  
  // Update a necessary record by ID
  router.put('/necessary/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { file, title } = req.body;
      const query =
        'UPDATE necessary SET file = $1, title = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
      const values = [file, title, id];
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
  
  // Delete a necessary record by ID
  router.delete('/necessary/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM necessary WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  



module.exports=router