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

module.exports = {
  createCategories,
};
