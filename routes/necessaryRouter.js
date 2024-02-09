const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const { upload_file, put_file, delete_file } = require('../middleware/file_upload');
const router = express.Router();



// Create a necessary record
router.post('/necessary', async (req, res) => {
    try {
      const { title } = req.body;
      var file = upload_file(req);
      const query =
        'INSERT INTO necessary (file, title) VALUES ($1, $2) RETURNING *';
      const values = [file, title];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read all necessary records
  router.get('/necessary', async (req, res) => {
    try {
      const query = 'SELECT * FROM necessary';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read a necessary record by ID
  router.get('/necessary/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM necessary WHERE id = $1';
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
  
  // Update a necessary record by ID
  router.put('/necessary/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const query2 = 'SELECT * FROM necessary WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      var file=put_file(result2.rows[0].file,req)
      const query =
        'UPDATE necessary SET file = $1, title = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
      const values = [file, title, id];
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
  
  // Delete a necessary record by ID
  router.delete('/necessary/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query2= 'SELECT * FROM necessary WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      delete_file(result2.rows[0].file)
      const query = 'DELETE FROM necessary WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  



module.exports=router