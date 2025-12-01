const Product = require('../models/ProductModel');
const { options } = require('../routes/products');

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
      const filteredVendor = await Product.find({ vendor: vendorId });
      productQuery = filteredVendor;
    }

    if (categoryId) {
      const filteredProducts = await Product.find({ category: categoryId });
      productQuery = filteredProducts;
    }

    if (!categoryId && !vendorId) {
      productQuery = await Product.find({});
    }

    res.json({ Product: productQuery });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

// search for products
const searchProduct = async (req, res) => {
  try {
    const itemSearched = req.query.q;

    let productSearched = {};

    productSearched = await Product.find({
      name: { $regex: itemSearched, $options: 'i' },
    });

    if (productSearched) {
      res.json({ mssg: productSearched });
    } else {
      res.json({ mssg: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

// get products using id
const getProductId = async (req, res) => {
  try {
    const productId = req.params.id;

    const productQuery = await Product.find({ _id: productId });

    if (productQuery) {
      res.json({ mssg: productQuery });
    } else {
      res.json({ mssg: 'No product with that ID' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

module.exports = {
  // put here all the functions that will be created
  getProducts,
  createProduct,
  getProductId,
  searchProduct,
};
