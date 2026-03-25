import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, stockQuantity, category } = req.body;
    const newProduct = new Product({ name, description, price, imageUrl, stockQuantity, category });
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const findProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.body.name });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};