const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Links this cart to a User
      required: true,
      unique: true, // Ensures one user has only one cart
    },

    // 'items' is an array of sub-documents
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product', // Links to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Quantity must be at least 1
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Casrt', cartSchema);
