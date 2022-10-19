import connectDB from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import shopRoutes from './routes/shopRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import uploadRoutes2 from './routes/uploadRoutes2.js';
import uploadRoutes3 from './routes/uploadRoutes3.js';
import uploadRoutes4 from './routes/uploadRoutes4.js';
import uploadRoutes5 from './routes/uploadRoutes5.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('API is running');
// });

app.use('/api/shops', shopRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/upload2', uploadRoutes2);
app.use('/api/upload3', uploadRoutes3);
app.use('/api/upload4', uploadRoutes4);
app.use('/api/upload5', uploadRoutes5);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
