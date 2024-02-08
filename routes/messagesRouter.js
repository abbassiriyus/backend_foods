const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();


// Create a message record
router.post('/messages', async (req, res) => {
    try {
      const { message } = req.body;
      const query = `
        INSERT INTO messages (message) VALUES ($1) RETURNING *
      `;
      const values = [message];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read all message records
  router.get('/messages', async (req, res) => {
    try {
      const query = 'SELECT * FROM messages';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read a message record by ID
  router.get('/messages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM messages WHERE id = $1';
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
  
  // Update a message record by ID
  router.put('/messages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const query = `
        UPDATE messages SET
          message = $1,
          time_update = current_timestamp
        WHERE id = $2
        RETURNING *
      `;
      const values = [message, id];
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
  
  // Delete a message record by ID
  router.delete('/messages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM messages WHERE id = $1';
      const result = await pool.query(query, [id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(200).json({ message: 'Record deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
   



module.exports=router