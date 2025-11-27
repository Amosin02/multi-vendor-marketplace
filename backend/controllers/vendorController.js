const Product = require('../models/ProductModel');
const Vendor = require('../models/VendorModel');

const createVendor = async (req, res) => {
  const { name } = req.body;

  try {
    const vendor = await Vendor.create({ name });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /vendor/products // Get a list of the vendor's own products.

// POST /vendor/products // Create a new product for the vendor's store.
const createProduct = async (req, res) => {
  const { name, price, category, vendor } = req.body;

  try {
    const product = await Product.create({ name, price, category, vendor });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /vendor/products/{id} // Get details of one of their own products.

// PUT /vendor/products/{id} // Update one of their own products.

// DELETE /vendor/products/{id} // Delete one of their own products.

module.exports = {
  createProduct,
  createVendor,
};
