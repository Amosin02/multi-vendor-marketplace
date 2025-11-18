const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true, // No two users can share the same email
      lowercase: true, // Stores the email in lowercase
      trim: true,
      validate: [isEmail, 'Enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: [6, 'Minimum Password length is 6 characters'],
      // Note: You should ALWAYS hash this password using a library like
      // 'bcrypt' BEFORE saving it to the database!
    },
    role: {
      type: String,
      enum: ['customer', 'admin'], // Restricts the role to one of these two values
      default: 'customer',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

module.exports = mongoose.model('User', userSchema);
