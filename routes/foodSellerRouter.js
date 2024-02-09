const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();

router.post('/food_seller', async (req, res) => {
    try {
      const {
        creator,
        fullname,
        phone,
        to_my_friend,
        deliver,
        the_city,
        village,
        home,
        office,
        building,
        convex,
        date,
        time,
        food_id,
      } = req.body;
      const query = `
        INSERT INTO food_seller (
          creator,
          fullname,
          phone,
          to_my_friend,
          deliver,
          the_city,
          village,
          home,
          office,
          building,
          convex,
          date,
          time,
          food_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *
      `;
      const values = [
        creator,
        fullname,
        phone,
        to_my_friend,
        deliver,
        the_city,
        village,
        home,
        office,
        building,
        convex,
        date,
        time,
        food_id,
      ];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read all food_seller records
  router.get('/food_seller', async (req, res) => {
    try {
      const query = 'SELECT * FROM food_seller';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read a food_seller record by ID
  router.get('/food_seller/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM food_seller WHERE id = $1';
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
  
  // Update a food_seller record by ID
  router.put('/food_seller/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        creator,
        fullname,
        phone,
        to_my_friend,
        deliver,
        the_city,
        village,
        home,
        office,
        building,
        convex,
        date,
        time,
        food_id,
      } = req.body;
      const query = `
        UPDATE food_seller SET
          creator = $1,
          fullname = $2,
          phone = $3,
          to_my_friend = $4,
          deliver = $5,
          the_city = $6,
          village = $7,
          home = $8,
          office = $9,
          building = $10,
          convex = $11,
          date = $12,
          time = $13,
          food_id = $14,
          time_update= current_timestamp
        WHERE id = $15
        RETURNING *
      `;
      const values = [
        creator,
        fullname,
        phone,
        to_my_friend,
        deliver,
        the_city,
        village,
        home,
        office,
        building,
        convex,
        date,
        time,
        food_id,
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
  
  // Delete a food_seller record by ID
  router.delete('/food_seller/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM food_seller WHERE id = $1';
      await pool.query(query, [id]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });




module.exports=router