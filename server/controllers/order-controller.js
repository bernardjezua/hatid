import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    // products: [{ product: productId, quantity: number }]
    const order = new Order({
      user: req.userId,
      products,
      totalAmount
    });
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'firstName lastName email').populate('products.product');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderid } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'approved', 'declined'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(orderid, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status', error: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
        .populate('products.product')
        .sort({ orderDate: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user orders', error: error.message });
  }
};
