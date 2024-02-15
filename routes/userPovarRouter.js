const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database

const router = express.Router();



router.post('/user_povar', async (req, res) => {
  try {
    const { user_id, deskription,ish_yonalishi, expertise, place, is_prepared } = req.body;
    const query =
      'INSERT INTO user_povar (user_id, deskription, expertise, place, is_prepared,image,ish_yonalishi) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *';
    const values = [user_id, deskription, expertise, place, is_prepared,image,ish_yonalishi];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});

// Get all users
router.get('/user_povar', async (req, res) => {
  try {
    const query = 'SELECT * FROM user_povar';
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});

// Get a user by ID
router.get('/user_povar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM user_povar WHERE id = $1';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});

// Update a user by ID
router.put('/user_povar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, deskription, expertise, place, is_prepared,ish_yonalishi } = req.body;
    const query =
      'UPDATE user_povar SET user_id = $1, deskription = $2, expertise = $3, place = $4, is_prepared = $5,ish_yonalishi=$6, time_update = current_timestamp WHERE id = $t RETURNING *';
    const values = [user_id, deskription, expertise, place, is_prepared,ish_yonalishi, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});

// Delete a user by ID
router.delete('/user_povar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM user_povar WHERE id = $1';
    await pool.query(query, [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});



module.exports=router