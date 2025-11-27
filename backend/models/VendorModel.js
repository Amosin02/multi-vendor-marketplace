const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures no two vendors have the same name
      trim: true,
    },
    // Optional: You could add fields like 'contactEmail' or 'website' here
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Vendor', vendorSchema);
