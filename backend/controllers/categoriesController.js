const Category = require('../models/CategoryModel');

const createCategories = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

module.exports = {
  createCategories,
  getCategories,
};
