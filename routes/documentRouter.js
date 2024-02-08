const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();


// Create a document record
router.post('/document', async (req, res) => {
    try {
      const { user_povar_id, file } = req.body;
      const query =
        'INSERT INTO document (user_povar_id, file) VALUES ($1, $2) RETURNING *';
      const values = [user_povar_id, file];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read all document records
  router.get('/document', async (req, res) => {
    try {
      const query = 'SELECT * FROM document';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read a document record by ID
  router.get('/document/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM document WHERE id = $1';
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
  
  // Update a document record by ID
  router.put('/document/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { user_povar_id, file } = req.body;
      const query =
        'UPDATE document SET user_povar_id = $1, file = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
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
  
  // Delete a document record by ID
  router.delete('/document/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM document WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



module.exports=router