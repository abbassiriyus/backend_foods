const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const { put_file, delete_file, upload_file } = require('../middleware/file_upload');
const router = express.Router();
// Create a diploma record
router.post('/diploma', async (req, res) => {
    try {
      const { user_povar_id } = req.body;
      var file = upload_file(req);
      const query =
        'INSERT INTO diploma (user_povar_id, file) VALUES ($1, $2) RETURNING *';
      const values = [user_povar_id, file];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a diploma record by ID
  router.put('/diploma/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { user_povar_id } = req.body;
      const query2 = 'SELECT * FROM diploma WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      var file=put_file(result2.rows[0].file,req)
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
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a diploma record by ID
  router.delete('/diploma/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query2= 'SELECT * FROM diploma WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      delete_file(result2.rows[0].file)
      const query = 'DELETE FROM diploma WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });





module.exports=router