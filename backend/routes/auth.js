const express = require('express');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { createUser } = require('../controllers/authController');

const router = express.Router();

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  if (err.code === 11000) {
    errors.email = 'That email already exists';
    return errors;
  }

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = '60m';
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// GET (Protected) Get the profile of the currently logged-in user.
router.get('/me', (req, res) => {
  try {
    res.json({ mssg: 'Get profile of the currently logged-in user' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// POST Log in and receive a JSON Web Token (JWT).
router.post('/login', async (req, res) => {
  try {
    res.json({ mssg: 'Log in and receive a JSON Web Token (JWT).' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// POST Create a new customer account.
router.post('/register', createUser);

module.exports = router;
