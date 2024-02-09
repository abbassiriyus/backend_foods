const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();


// Create a povar_category record
router.post('/povar_category', async (req, res) => {
    try {
      const { user_povar_id, category_id } = req.body;
      const query =
        'INSERT INTO povar_category (user_povar_id, category_id) VALUES ($1, $2) RETURNING *';
      const values = [user_povar_id, category_id];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read all povar_category records
  router.get('/povar_category', async (req, res) => {
    try {
      const query = 'SELECT * FROM povar_category';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read a povar_category record by ID
  router.get('/povar_category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM povar_category WHERE id = $1';
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
  
  // Update a povar_category record by ID
  router.put('/povar_category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { user_povar_id, category_id } = req.body;
      const query =
        'UPDATE povar_category SET user_povar_id = $1, category_id = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
      const values = [user_povar_id, category_id, id];
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
  
  // Delete a povar_category record by ID
  router.delete('/povar_category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM povar_category WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });



module.exports=router