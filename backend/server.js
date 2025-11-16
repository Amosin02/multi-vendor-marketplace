require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoriesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
