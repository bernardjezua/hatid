import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Special check for hardcoded production admin token
    if (token === "admin-root-token-hatid-prod") {
      req.userId = "admin-root-id";
      req.userRole = "admin";
      return next();
    }

    const secret = process.env.SECRET_KEY || process.env.SALT || 'DEFAULT_SECRET_KEY';
    const decoded = jwt.verify(token, secret);
    
    req.userId = decoded.id; // Sign used { id: ... }
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden: Requires admin role' });
  }
  next();
};
