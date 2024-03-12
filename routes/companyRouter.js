const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const { upload_image, put_image, delete_file, delete_image } = require('../middleware/file_upload');
const router = express.Router();


// Create a company record
router.post('/company', async (req, res) => {
    try {
      const {
        app_store,
        playmarket,
        telegram,
        vkantakt,
        okru,
        whatsapp,
        email,
      } = req.body;
      var image = upload_image(req);
      const query = `
        INSERT INTO company (image, app_store, playmarket, telegram, vkantakt, okru, whatsapp, email)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const values = [
        image,
        app_store,
        playmarket,
        telegram,
        vkantakt,
        okru,
        whatsapp,
        email,
      ];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read all company records
  router.get('/company', async (req, res) => {
    try {
      const query = 'SELECT * FROM company';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read a company record by ID
  router.get('/company/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM company WHERE id = $1';
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
  
  // Update a company record by ID
  router.put('/company/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        app_store,
        playmarket,
        telegram,
        vkantakt,
        okru,
        whatsapp,
        email
      } = req.body;
      
      const query2 = 'SELECT * FROM company WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      var image=put_image(result2.rows[0].image,req)
      const query = `
        UPDATE company SET
          image = $1,
          app_store = $2,
          playmarket = $3,
          telegram = $4,
          vkantakt = $5,
          okru = $6,
          whatsapp = $7,
          email = $8,
          time_update = current_timestamp
        WHERE id = $9
        RETURNING *
      `;
      const values = [
        image,
        app_store,
        playmarket,
        telegram,
        vkantakt,
        okru,
        whatsapp,
        email,
        id,
      ];
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
  
  // Delete a company record by ID
  router.delete('/company/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM company WHERE id = $1';
      const result = await pool.query(query, [id]);
      const query2= 'SELECT * FROM company WHERE id = $1';
      const result2 = await pool.query(query2, [id]);
      delete_image(result2.rows[0].image)
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(200).json({ message: 'Record deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });




module.exports=router