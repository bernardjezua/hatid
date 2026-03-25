import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import User from './models/User.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';
import setUpRoutes from './routes.js';

import cors from 'cors';

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;
const dbUrl = process.env.DB_URL;

console.log('Attempting to connect to MongoDB...');
console.log('Using DB URL (partial):', dbUrl ? dbUrl.split('@')[1] : 'NOT SET');


(async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB successfully.');

    setUpRoutes(app);

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
})();
