import connectDB from './config/db.js';
import express from 'express';
import shops from './data/shops.js';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/shops', (req, res) => {
  res.json(shops);
});

app.get('/api/shops/:id', (req, res) => {
  const shop = shops.find((s) => s._id === req.params.id);
  res.json(shop);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
