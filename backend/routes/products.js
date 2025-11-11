const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.json({ mssg: 'Get all the products' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.get('/:id', (req, res) => {
  try {
    res.json({ mssg: 'Get details of product categories' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
