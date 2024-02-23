const express = require('express');
const pool = require('../db'); // Assuming you have a 'db.js' file setting up your database
const router = express.Router();

// Create a room record
router.post('/room', async (req, res) => {
    try {
      const { user1,user2 } = req.body;
      const query = `
        INSERT INTO room (user1,user2) VALUES ($1,$2) RETURNING *
      `;
      const values = [user1,user2];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
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
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Read a room record by ID
  router.get('/room/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM room WHERE user1 = $1 OR user2 = $2';
      const result = await pool.query(query, [id , id]);
       const quary2='SELECT * FROM users'
       console.log(result.rows);
      const result2=await pool.query(quary2)
    for (let i = 0; i < result.rows.length; i++) {
      for (let j = 0; j < result2.rows.length; j++) {
      if(id!=result2.rows[j].id && (result2.rows[j].id==result.rows[i].user1 || result2.rows[j].id==result.rows[i].user2) ){
       result.rows[i].user=result2.rows[j]
      }
      } 
    }


      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(200).json(result.rows);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message  });
    }
  });
  
  // Update a room record by ID
  router.put('/room/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { user1 } = req.body;
      const query = `
        UPDATE room SET
          user1 = $1,
          user2=$2,
          time_update = current_timestamp
        WHERE id = $3
        RETURNING *
      `;
      const values = [user1,user2, id];
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
      res.status(500).json({ error: error.message  });
    }
  });




module.exports=router