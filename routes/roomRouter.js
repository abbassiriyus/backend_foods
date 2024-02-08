const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();

// Create a room record
router.post('/room', async (req, res) => {
    try {
      const { room_sender } = req.body;
      const query = `
        INSERT INTO room (room_sender) VALUES ($1) RETURNING *
      `;
      const values = [room_sender];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read all room records
  router.get('/room', async (req, res) => {
    try {
      const query = 'SELECT * FROM room';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Read a room record by ID
  router.get('/room/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM room WHERE id = $1';
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
  
  // Update a room record by ID
  router.put('/room/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { room_sender } = req.body;
      const query = `
        UPDATE room SET
          room_sender = $1,
          time_update = current_timestamp
        WHERE id = $2
        RETURNING *
      `;
      const values = [room_sender, id];
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
  
  // Delete a room record by ID
  router.delete('/room/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM room WHERE id = $1';
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