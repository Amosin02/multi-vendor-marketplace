const express = require('express');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const {
  createUser,
  loginUser,
  getDetailsOfMe,
} = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// GET (Protected) Get the profile of the currently logged-in user.
router.get('/me', requireAuth, getDetailsOfMe);

// POST Log in and receive a JSON Web Token (JWT).
router.post('/login', loginUser);

// POST Create a new customer account.
router.post('/register', createUser);

module.exports = router;
