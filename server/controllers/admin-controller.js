import User from '../models/User.js';
import Order from '../models/Order.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

export const getFinancialOverview = async (req, res) => {
  try {
    const orders = await Order.find();
    
    const totalIncome = orders
      .filter(order => order.status === 'approved')
      .reduce((sum, order) => sum + order.totalAmount, 0);
      
    const analytics = {
      totalIncome,
      orderVolume: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      approvedOrders: orders.filter(o => o.status === 'approved').length,
      declinedOrders: orders.filter(o => o.status === 'declined').length,
    };

    res.status(200).json({ success: true, analytics });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
};
