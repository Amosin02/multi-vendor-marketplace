const express = require('express');
const {
  getProducts,
  getProductId,
  searchProduct,
} = require('../controllers/productsControllers');
const { createProduct } = require('../controllers/vendorController');

const router = express.Router();

// create products
router.post('/create', createProduct);

// get all products & can also search for vendors/categories
router.get('/', getProducts);

// search for products
router.get('/search', searchProduct);

// get products using id
router.get('/:id', getProductId);

module.exports = router;
