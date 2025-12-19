const express = require('express');
const {
  createProduct,
  createVendor,
  getVendorProducts,
  getThisProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/vendorController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createVendor);

// GET /vendor/products // Get a list of the vendor's own products.
router.get('/products', getVendorProducts);

// POST /vendor/products // Create a new product for the vendor's store.
router.post('/products', createProduct);

// GET /vendor/products/{id} // Get details of one of their own products.
router.get('/products/:id', getThisProduct);

// PUT /vendor/products/{id} // Update one of their own products.
router.put('/products/:id', requireAuth, updateProduct);

// DELETE /vendor/products/{id} // Delete one of their own products.
router.delete('/products/:id', requireAuth, deleteProduct);

module.exports = router;
