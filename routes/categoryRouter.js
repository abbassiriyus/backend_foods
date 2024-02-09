const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();


// Create a category
router.post('/category', async (req, res) => {
    try {
      const { title } = req.body;
      const query =
        'INSERT INTO category (title) VALUES ($1) RETURNING *';
      const values = [title];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Get all categories
  router.get('/category', async (req, res) => {
    try {
      const query = 'SELECT * FROM category';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Get a category by ID
  router.get('/category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM category WHERE id = $1';
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Update a category by ID
  router.put('/category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const query =
        'UPDATE category SET title = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
      const values = [title, id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Delete a category by ID
  router.delete('/category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM category WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  



module.exports=router