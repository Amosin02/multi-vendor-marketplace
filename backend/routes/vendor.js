const express = require('express');
const {
  createProduct,
  createVendor,
} = require('../controllers/vendorController');

const router = express.Router();

router.post('/', createVendor);

// GET /vendor/products // Get a list of the vendor's own products.
// how tho
router.get('/products', (req, res) => {
  res.json({ mssg: "Get all vendor's own products" });
});

// POST /vendor/products // Create a new product for the vendor's store.
router.post('/products', createProduct);

// GET /vendor/products/{id} // Get details of one of their own products.
router.get('/products/:id', (req, res) => {
  res.json({ mssg: 'Get details of one of their own products' });
});

// PUT /vendor/products/{id} // Update one of their own products.
router.put('/products/:id', (req, res) => {
  res.json({ mssg: 'Update one of their own products' });
});

// DELETE /vendor/products/{id} // Delete one of their own products.
router.delete('/products/{id}', (req, res) => {
  res.json({ mssg: 'Delete one of their own products' });
});

module.exports = router;
