const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { password, email, phone, place } = req.body;
    const query = 'INSERT INTO users (password, email, phone, place) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [password, email, phone, place];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password, email, phone, place } = req.body;
    const query = 'UPDATE users SET password = $1, email = $2, phone = $3, place = $4 WHERE id = $5 RETURNING *';
    const values = [password, email, phone, place, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user by ID
router.patch('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { password, email, phone, place } = req.body;
  
      const updates = {};
      if (password) updates.password = password;
      if (email) updates.email = email;
      if (phone) updates.phone = phone;
      if (place) updates.place = place;
  
      const query = 'UPDATE users SET password = $1, email = $2, phone = $3, place = $4 WHERE id = $5 RETURNING *';
      const values = [updates.password, updates.email, updates.phone, updates.place, id];
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = $1';
    await pool.query(query, [id]);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports=router