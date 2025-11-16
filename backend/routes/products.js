const express = require('express');

const router = express.Router();

// --- Mock Data ---

// 1. Vendors (The Stores)
const vendors = [
  {
    id: 10,
    storeName: 'TechNova',
    description: 'The latest and greatest in high-tech gadgets.',
  },
  {
    id: 20,
    storeName: 'HomeBrew Goods',
    description: 'Quality goods for your kitchen and home.',
  },
  {
    id: 30,
    storeName: 'PageTurners',
    description: 'Your one-stop shop for bestsellers and hidden gems.',
  },
];

// 2. Categories (The Product Types)
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

// 3. Products (Linked by categoryId and vendorId)
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

router.get('/', (req, res) => {
  try {
    const vendorId = req.query.vendor;
    const categoryId = req.query.category;

    const queryOptions = {
      where: {},
    };

    let productQuery = {};

    if (vendorId) {
      const filteredVendor = products.filter(
        (product) => product.vendorId === parseInt(vendorId, 10)
      );
      productQuery = filteredVendor;
    }

    if (categoryId) {
      const filteredProducts = products.filter(
        (product) => product.categoryId === parseInt(categoryId, 10)
      );
      productQuery = filteredProducts;
    }

    if (!categoryId && !vendorId) {
      productQuery = products;
    }

    res.json({ mssg: productQuery });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.get('/search', (req, res) => {
  try {
    const itemSearched = req.query.q;

    let productSearched = {};

    productSearched = products.find(
      (product) => product.name.toLowerCase() === itemSearched.toLowerCase()
    );

    if (productSearched) {
      res.json({ mssg: productSearched });
    } else {
      res.json({ mssg: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);

    const productQuery = products.find((product) => product.id === productId);

    if (productQuery) {
      res.json({ mssg: productQuery });
    } else {
      res.json({ mssg: 'No product with that ID' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
