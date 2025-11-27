const Product = require('../models/ProductModel');

// create products
const createProduct = async (req, res) => {
  const { name, price, category, vendor } = req.body;

  try {
    const product = Product.create({ name, price, category, vendor });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all products & can also search for vendors/categories
const getProducts = async (req, res) => {
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
};

// search for products

// get products using id

module.exports = {
  // put here all the functions that will be created
  getProducts,
  createProduct,
};
