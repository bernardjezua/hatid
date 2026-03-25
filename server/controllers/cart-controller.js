import User from '../models/User.js';

export const syncCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const userId = req.userId; // From auth middleware (sets req.userId)

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { cart: cart } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error('Cart sync error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate({
      path: 'cart.product',
      model: 'Product'
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};