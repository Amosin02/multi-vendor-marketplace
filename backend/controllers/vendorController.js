const Product = require('../models/ProductModel');
const Vendor = require('../models/VendorModel');

const createVendor = async (req, res) => {
  const { vendorId, name } = req.body;

  try {
    const vendor = await Vendor.create({ vendorId, name });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /vendor/products // Get a list of the vendor's own products.
const getVendorProducts = async (req, res) => {
  const { vendor } = req.body;

  try {
    const product = await Product.find({ vendor: vendor });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
const getThisProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.find({ _id: productId });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /vendor/products/{id} // Update one of their own products.
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const vendorId = req.user.id;
  const { price, name, category, vendor } = req.body;
  const updateData = {};

  if (name && name.trim() !== '') updateData.name = name;
  if (price !== undefined && price !== null && price !== '')
    updateData.price = price;
  if (category && category.trim() !== '') updateData.category = category;
  if (vendor && vendor.trim() !== '') updateData.vendor = vendor;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, vendor: vendorId }, // Ownership check
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Update failed. Product not found or unauthorized.',
      });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /vendor/products/{id} // Delete one of their own products.
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const vendorId = req.user.id; // From your requireAuth middleware

  try {
    // We check for BOTH the product ID AND the owner's ID
    const deletedProduct = await Product.findOneAndDelete({
      _id: productId,
      vendor: vendorId,
    });

    if (!deletedProduct) {
      // This will trigger if the ID is wrong OR if it belongs to someone else
      return res.status(404).json({
        message: 'Product not found or you are not authorized to delete it',
      });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      id: deletedProduct._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  createVendor,
  getVendorProducts,
  getThisProduct,
  updateProduct,
  deleteProduct,
};
