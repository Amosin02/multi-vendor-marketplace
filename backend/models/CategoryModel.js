const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures no two categories have the same name
      trim: true,
    },
    // You could add a description or image path here if needed later
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Category', categorySchema);
