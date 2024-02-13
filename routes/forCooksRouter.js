// Importar los módulos necesarios
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar el objeto de la conexión a la base de datos

// Obtener todos los elementos del carrusel
router.get('/carousel_forcooks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM carousel_forcooks');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los elementos del carrusel' });
  }
});

// Obtener un elemento del carrusel por su ID
router.get('/carousel_forcooks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM carousel_forcooks WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Elemento del carrusel no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el elemento del carrusel' });
  }
});

// Crear un nuevo elemento del carrusel
router.post('/carousel_forcooks', async (req, res) => {
  const { name, image, kasb, desk } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO carousel_forcooks (name, image, kasb, desk) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, image, kasb, desk]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear un nuevo elemento del carrusel' });
  }
});

// Actualizar un elemento del carrusel
router.put('/carousel_forcooks/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image, kasb, desk } = req.body;
  try {
    const result = await pool.query(
      'UPDATE carousel_forcooks SET name = $1, image = $2, kasb = $3, desk = $4, time_update = current_timestamp WHERE id = $5 RETURNING *',
      [name, image, kasb, desk, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Elemento del carrusel no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el elemento del carrusel' });
  }
});

// Eliminar un elemento del carrusel
router.delete('/carousel_forcooks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM carousel_forcooks WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json({ message: 'Elemento del carrusel eliminado' });
    } else {
      res.status(404).json({ message: 'Elemento del carrusel no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el elemento del carrusel' });
  }
});

module.exports = router;