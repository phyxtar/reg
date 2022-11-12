import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import shortid from 'shortid';
import Razorpay from 'razorpay';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import shopRoutes from './routes/shopRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import uploadRoutes1 from './routes/uploadRoutes1.js';
import uploadRoutes2 from './routes/uploadRoutes2.js';
import uploadRoutes3 from './routes/uploadRoutes3.js';
import Order from './models/orderModel.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/shops', shopRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/upload1', uploadRoutes1);
app.use('/api/upload2', uploadRoutes2);
app.use('/api/upload3', uploadRoutes3);

// app.get('/api/config/razorpay', (req, res) =>
//   res.send(process.env.RAZORPAY_ID)
// );

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

// initializee Razorpay crededntials

const razorpay = new Razorpay({
  key_id: 'rzp_test_zMS9I7prWhZhsi',
  key_secret: 'xhDMc4fMjcjZpvFC1hm5lMSm',
});

app.post('/razorpay', async (req, res) => {
  const payment_capture = 1;
  const amount = 1198;
  const currency = 'INR';

  const options = {
    amount: amount * 100,
    currency: currency,
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
