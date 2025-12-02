const express = require('express');
const {
  createCategories,
  getCategories,
  getProductsOfThatCategory,
} = require('../controllers/categoriesController');

const router = express.Router();

router.post('/', createCategories);

router.get('/', getCategories);

// get the products from that category
router.get('/:id/products', getProductsOfThatCategory);

module.exports = router;
