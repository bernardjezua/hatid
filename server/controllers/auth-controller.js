import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'Email already exists' });

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    
    res.status(201).json({ success: true, message: 'User created' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Production Admin Hardcoded Check (via Env)
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (email === adminEmail) {
      const isAdminMatch = await bcrypt.compare(password, adminPasswordHash);
      if (isAdminMatch) {
        return res.status(200).json({
          success: true,
          token: "admin-root-token-hatid-prod", // In production, we'd sign a real JWT, but for this specific check:
          user: {
            id: "admin-root-id",
            firstName: "Root",
            lastName: "Admin",
            email: adminEmail,
            role: "admin"
          }
        });
      }
    }

    console.log("Step 1: Finding user for email:", email);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("Step 1b: User NOT found in database.");
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    console.log("Step 2: User found. Comparing password...");
    let isMatch = false;
    try {
        isMatch = await user.correctPassword(password);
    } catch (passwordErr) {
        console.error("Step 2 ERROR (bcrypt):", passwordErr);
        throw new Error("Password comparison failed: " + passwordErr.message);
    }
    
    console.log("Step 3: Password match result:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    console.log("Step 4: Signing JWT...");
    const secret = process.env.SECRET_KEY || process.env.SALT || 'DEFAULT_SECRET_KEY';
    const token = user.createJWT(secret);
    
    console.log("Step 5: Login successful, sending response.");
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        walletBalance: user.walletBalance,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error("CRITICAL LOGIN ERROR:", err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error', 
      error_code: "AUTH_FAILURE",
      debug_message: err.message 
    });
  }
};

export const checkIfLoggedIn = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ isLoggedIn: false });
    }

    const token = authHeader.split(' ')[1];

    // Support for Hardcoded Admin Token
    if (token === "admin-root-token-hatid-prod") {
       return res.status(200).json({ 
         isLoggedIn: true, 
         role: 'admin',
         user: { name: 'Root Admin', email: process.env.ADMIN_EMAIL }
       });
    }

    const secret = process.env.SECRET_KEY || process.env.SALT || 'DEFAULT_SECRET_KEY';
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);

    if (user) {
      return res.status(200).json({ 
        isLoggedIn: true, 
        role: user.role,
        user: { 
          name: `${user.firstName} ${user.lastName}`, 
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          walletBalance: user.walletBalance,
          avatar: user.avatar
        }
      });
    }
    return res.status(401).json({ isLoggedIn: false });
  } catch (error) {
    return res.status(401).json({ isLoggedIn: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, avatar } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.status(200).json({ success: true, user: {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar
    }});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
