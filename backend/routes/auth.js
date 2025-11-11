const express = require('express');

const router = express.Router();

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
router.post('/login', (req, res) => {
  try {
    res.json({ mssg: 'Log in and receive a JSON Web Token (JWT).' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// POST Create a new customer account.
router.post('/register', (req, res) => {
  try {
    res.json({ mssg: 'Create a new customer account.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
