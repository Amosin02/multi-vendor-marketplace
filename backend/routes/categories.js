const express = require('express');
const {
  createCategories,
  getCategories,
} = require('../controllers/categoriesController');

const router = express.Router();

const categories = [
  {
    id: 1,
    name: 'Electronics',
  },
  {
    id: 2,
    name: 'Home & Kitchen',
  },
  {
    id: 3,
    name: 'Books',
  },
];

const products = [
  {
    id: 101,
    name: 'Wireless Headphones',
    price: 149.99,
    categoryId: 1, // Belongs to Electronics
    vendorId: 10, // Sold by TechNova
  },
  {
    id: 102,
    name: 'Smartwatch',
    price: 299.99,
    categoryId: 1, // Belongs to Electronics
    vendorId: 10, // Sold by TechNova
  },
  {
    id: 201,
    name: 'French Press Coffee Maker',
    price: 39.99,
    categoryId: 2, // Belongs to Home & Kitchen
    vendorId: 20, // Sold by HomeBrew Goods
  },
  {
    id: 202,
    name: 'Digital Kitchen Scale',
    price: 19.99,
    categoryId: 2, // Belongs to Home & Kitchen
    vendorId: 20, // Sold by HomeBrew Goods
  },
  {
    id: 301,
    name: 'The Sci-Fi Classic',
    price: 14.99,
    categoryId: 3, // Belongs to Books
    vendorId: 30, // Sold by PageTurners
  },
  {
    id: 302,
    name: 'Modern Mystery Novel',
    price: 16.5,
    categoryId: 3, // Belongs to Books
    vendorId: 30, // Sold by PageTurners
  },
  {
    id: 103,
    name: 'Portable Power Bank',
    price: 45.0,
    categoryId: 1, // Belongs to Electronics
    vendorId: 10, // Sold by TechNova
  },
];

router.post('/', createCategories);

router.get('/', getCategories);

router.get('/:id/products', (req, res) => {
  try {
    const catId = req.params.id;

    let productQuery = {};

    if (catId) {
      productQuery = products.filter(
        (product) => product.categoryId === parseInt(catId, 10)
      );
    }

    res.json({ mssg: productQuery });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
