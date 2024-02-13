// Importar los módulos necesarios
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar el objeto de la conexión a la base de datos

// Obtener todos los registros
router.get('/vopros_atvet', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vopros_atvet');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los registros' });
  }
});

// Obtener un registro por su ID
router.get('/vopros_atvet/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM vopros_atvet WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el registro' });
  }
});

// Crear un nuevo registro
router.post('/vopros_atvet', async (req, res) => {
  const { title, desk } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO vopros_atvet (title, desk) VALUES ($1, $2) RETURNING *',
      [title, desk]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear un nuevo registro' });
  }
});

// Actualizar un registro
router.put('/vopros_atvet/:id', async (req, res) => {
  const { id } = req.params;
  const { title, desk } = req.body;
  try {
    const result = await pool.query(
      'UPDATE vopros_atvet SET title = $1, desk = $2, time_update = current_timestamp WHERE id = $3 RETURNING *',
      [title, desk, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el registro' });
  }
});

// Eliminar un registro
router.delete('/vopros_atvet/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM vopros_atvet WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json({ message: 'Registro eliminado' });
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el registro' });
  }
});

module.exports = router;