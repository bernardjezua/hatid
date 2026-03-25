import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    
    // Check and deduct wallet balance
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    if (user.walletBalance < totalAmount) {
      return res.status(400).json({ success: false, message: 'Insufficient wallet balance' });
    }

    user.walletBalance -= totalAmount;
    await user.save();

    // products: [{ product: productId, quantity: number }]
    // Map products to include snapshots
    const orderItems = await Promise.all(products.map(async (item) => {
      const pData = await Product.findById(item.product);
      return {
        product: item.product,
        quantity: item.quantity,
        name: pData?.name || 'Deleted Product',
        price: pData?.price || 0,
        imageUrl: pData?.imageUrl || ''
      };
    }));

    const order = new Order({
      user: req.userId,
      products: orderItems,
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
    const orders = await Order.find()
      .populate('user', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName')
      .populate('products.product');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderid } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'approved', 'received', 'declined'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const order = await Order.findById(orderid).populate('products.product');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    const prevStatus = order.status;
    if (prevStatus === status) return res.status(200).json({ success: true, order });

    // 1. Inventory Reconciliation
    // Moving TO approved: Deduct stock
    if (status === 'approved' && prevStatus !== 'approved') {
      for (const item of order.products) {
        if (item.product) {
          const product = await Product.findById(item.product._id);
          if (product) {
            product.stockQuantity -= item.quantity;
            await product.save();
          }
        }
      }
    } 
    // Moving FROM approved: Restore stock
    else if (prevStatus === 'approved' && status !== 'approved') {
      for (const item of order.products) {
        if (item.product) {
          const product = await Product.findById(item.product._id);
          if (product) {
            product.stockQuantity += item.quantity;
            await product.save();
          }
        }
      }
    }

    // 2. Wallet Reconciliation
    // Moving TO declined: Refund balance
    if (status === 'declined' && prevStatus !== 'declined') {
      const user = await User.findById(order.user);
      if (user) {
        user.walletBalance += order.totalAmount;
        await user.save();
      }
    }
    // Moving FROM declined: Re-deduct balance
    else if (prevStatus === 'declined' && status !== 'declined') {
      const user = await User.findById(order.user);
      if (user) {
        if (user.walletBalance < order.totalAmount) {
           return res.status(400).json({ success: false, message: 'User has insufficient balance to re-open this order' });
        }
        user.walletBalance -= order.totalAmount;
        await user.save();
      }
    }

    if (status === 'approved' || status === 'declined') {
      const mongoose = (await import('mongoose')).default;
      if (mongoose.Types.ObjectId.isValid(req.userId)) {
        order.approvedBy = req.userId;
      } else {
        // Fallback for root admin or other non-ObjectId identifiers
        order.approvedBy = null; 
      }
    }

    order.status = status;
    await order.save();
    
    // Re-populate to get admin name for the response
    const updatedOrder = await Order.findById(order._id)
      .populate('user', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName')
      .populate('products.product');

    res.status(200).json({ success: true, order: updatedOrder });
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
