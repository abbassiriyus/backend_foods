const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();

// Create an advantage
router.post('/advantages', async (req, res) => {
    try {
      const { title } = req.body;
      const query =
        'INSERT INTO advantages (title) VALUES ($1) RETURNING *';
      const values = [title];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read all advantages
  router.get('/advantages', async (req, res) => {
    try {
      const query = 'SELECT * FROM advantages';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read an advantage by ID
  router.get('/advantages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM advantages WHERE id = $1';
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Advantage not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Update an advantage by ID
  router.put('/advantages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const query =
        'UPDATE advantages SET title = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
      const values = [title, id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Advantage not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Delete an advantage by ID
  router.delete('/advantages/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM advantages WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });




module.exports=router