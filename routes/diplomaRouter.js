const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();
// Create a diploma record
router.post('/diploma', async (req, res) => {
    try {
      const { user_povar_id, file } = req.body;
      const query =
        'INSERT INTO diploma (user_povar_id, file) VALUES ($1, $2) RETURNING *';
      const values = [user_povar_id, file];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read all diploma records
  router.get('/diploma', async (req, res) => {
    try {
      const query = 'SELECT * FROM diploma';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read a diploma record by ID
  router.get('/diploma/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM diploma WHERE id = $1';
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
  
  // Update a diploma record by ID
  router.put('/diploma/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { user_povar_id, file } = req.body;
      const query =
        'UPDATE diploma SET user_povar_id = $1, file = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
      const values = [user_povar_id, file, id];
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
  
  // Delete a diploma record by ID
  router.delete('/diploma/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM diploma WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });





module.exports=router