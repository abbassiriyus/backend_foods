const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bog'lanish obyekti

// Yeni bir kullanıcı kategori oluşturma
router.post('/user_category', async (req, res) => {
  const { user_id, category_id } = req.body;

  try {
    const query = 'INSERT INTO user_category (user_id, category_id) VALUES ($1, $2) RETURNING *';
    const values = [user_id, category_id];
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Kategori oluşturulamadı.' });
  }
});

// Tüm kullanıcı kategorilerini getirme
router.get('/user_category', async (req, res) => {
  try {
    const query = 'SELECT * FROM user_category';
    const result = await db.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Kategoriler getirilemedi.' });
  }
});

// Belirli bir kullanıcının kategorisini getirme
router.get('/user_category/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const query = 'SELECT * FROM user_category WHERE user_id = $1';
    const values = [user_id];
    const result = await db.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Kategori getirilemedi.' });
  }
});

// Kullanıcı kategorisini güncelleme
router.put('/user_category/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { category_id } = req.body;

  try {
    const query = 'UPDATE user_category SET category_id = $1 WHERE user_id = $2 RETURNING *';
    const values = [category_id, user_id];
    const result = await db.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Kategori güncellenemedi.' });
  }
});

// Kullanıcı kategorisini silme
router.delete('/user_category/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM user_category WHERE id = $1';
    const values = [id];
    await db.query(query, values);
    res.json({ message: 'Kategori silindi.' });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Kategori silinemedi.' });
  }
});

module.exports = router;