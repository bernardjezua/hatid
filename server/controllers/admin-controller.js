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

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!['customer', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update user role' });
  }
};

export const updateUserWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { balance } = req.body;
    
    if (typeof balance !== 'number' || balance < 0) {
      return res.status(400).json({ success: false, message: 'Invalid balance amount' });
    }

    const user = await User.findByIdAndUpdate(id, { walletBalance: balance }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update wallet balance' });
  }
};
