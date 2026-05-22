const express = require('express');
const pool = require('../config/db');

const router = express.Router();

function toProduct(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: Number(row.price),
    discountPercentage: Number(row.discount_percentage),
    rating: Number(row.rating),
    stock: row.stock,
    brand: row.brand,
    category: row.category_slug,
    thumbnail: row.thumbnail,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
  };
}

// GET /api/products — home page (data?.products)
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const [rows] = await pool.query(
      'SELECT * FROM products ORDER BY id LIMIT ?',
      [limit]
    );
    const products = rows.map(toProduct);
    res.json({ products, total: products.length, limit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET /api/products/search?q= — BEFORE /:id
router.get('/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) {
      return res.json({ products: [], total: 0 });
    }
    const like = `%${q}%`;
    const [rows] = await pool.query(
      `SELECT * FROM products
       WHERE title LIKE ? OR description LIKE ?
       ORDER BY id`,
      [like, like]
    );
    const products = rows.map(toProduct);
    res.json({ products, total: products.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Search failed' });
  }
});

// GET /api/products/category/:slug — BEFORE /:id
router.get('/category/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE category_slug = ? ORDER BY id',
      [req.params.slug]
    );
    const products = rows.map(toProduct);
    res.json({ products, total: products.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch category' });
  }
});

// GET /api/products/:id — product detail (must be LAST)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(toProduct(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

module.exports = router;