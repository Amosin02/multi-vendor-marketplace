const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensures the price can't be negative
    },

    // This is the Mongoose way to handle your "Foreign Keys"
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category', // This links to your 'Category' model
      required: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor', // This links to your 'Vendor' model
      required: true,
    },
  },
  {
    // This automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
