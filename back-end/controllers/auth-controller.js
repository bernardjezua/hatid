import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Cart from '../models/Cart.js'; // Assuming you have a Cart model
import Order from '../models/Order.js'; // Assuming you have an Order model

// Get user model registered in Mongoose
const User = mongoose.model("User");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();

    if (result._id) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send({ success: false });
    }

    const tokenPayload = { _id: user._id };
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY || 'DEFAULT_SECRET_KEY');

    return res.send({
      success: true,
      token,
      username: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

const checkIfLoggedIn = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.authToken) {
      return res.send({ isLoggedIn: false });
    }

    const tokenPayload = jwt.verify(req.cookies.authToken, process.env.SECRET_KEY || 'DEFAULT_SECRET_KEY');
    const user = await User.findById(tokenPayload._id);

    if (user) {
      return res.send({ isLoggedIn: true });
    } else {
      return res.send({ isLoggedIn: false });
    }
  } catch (error) {
    console.error(error);
    return res.send({ isLoggedIn: false });
  }
};

const createCart = async (req, res) => {
  try {
    const user = req.user;
    const newCart = new Cart({
      user: user._id,
      products: req.body.products, // Assuming products is an array of product objects
    });

    const result = await newCart.save();

    user.cart.push(result._id);
    await user.save();

    return res.send({ success: true, cartId: result._id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

const getCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await Cart.findOne({ user: user._id }).populate('products.product');

    if (!cart) {
      return res.send({ success: false, message: 'Cart not found' });
    }

    return res.send({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const newOrder = new Order({
      user: user._id,
      products: req.body.products, // Assuming products is an array of product objects
      totalAmount: req.body.totalAmount,
    });

    const result = await newOrder.save();

    user.orders.push(result._id);
    await user.save();

    // Optionally, you might want to clear the user's cart after creating an order
    await Cart.findOneAndDelete({ user: user._id });

    return res.send({ success: true, orderId: result._id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const user = req.user; // Assuming you have middleware to set req.user

    const orders = await Order.find({ user: user._id });

    return res.send({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export { signUp, login, checkIfLoggedIn, createCart, getCart, createOrder, getOrders };
