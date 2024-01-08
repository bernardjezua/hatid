// server.js

import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './backend/models/User.js';
import Cart from './backend/models/Cart.js';
import Order from './backend/models/Order.js';
import setUpRoutes from './routes.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/hatid';

// allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,POST,PUT,DELETE,PATCH'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type,X-Requested-With,Cookie'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

(async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');

    setUpRoutes(app);

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
})();
