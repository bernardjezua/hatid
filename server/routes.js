import express from 'express';
import { signUp, login, checkIfLoggedIn, updateProfile } from './controllers/auth-controller.js';
import { getProducts, addProduct, findProduct, updateProduct, deleteProduct } from './controllers/product-controller.js';
import { createOrder, getOrders, updateOrderStatus, getOrdersByUser } from './controllers/order-controller.js';
import { getAllUsers, getFinancialOverview, updateUserRole, updateUserWallet } from './controllers/admin-controller.js';
import { syncCart, getCart } from './controllers/cart-controller.js';
import { verifyToken, isAdmin } from './middlewares/auth.js';

const setUpRoutes = (app) => {
  // Auth Routes
  app.post("/api/auth/signup", signUp);
  app.post("/api/auth/login", login);
  app.get("/api/auth/status", checkIfLoggedIn);
  app.patch("/api/auth/profile", verifyToken, updateProfile);

  // Product Routes
  app.get("/api/products", getProducts);
  app.post("/api/products", verifyToken, isAdmin, addProduct);
  app.put("/api/products/:id", verifyToken, isAdmin, updateProduct);
  app.delete("/api/products/:id", verifyToken, isAdmin, deleteProduct);
  app.post("/api/products/search", findProduct);

  // Cart Routes
  app.post("/api/cart/sync", verifyToken, syncCart);
  app.get("/api/cart", verifyToken, getCart);

  // Explicit user-requested paths for data persistence layer
  app.post('/api/users/cart', verifyToken, syncCart);
  app.get('/api/users/cart', verifyToken, getCart);

  // Order Routes
  app.post("/api/orders", verifyToken, createOrder);
  app.get("/api/orders", verifyToken, getOrders); 
  app.get("/api/orders/user", verifyToken, getOrdersByUser);
  app.patch("/api/orders/:orderid", verifyToken, updateOrderStatus);
  
  // Admin Specific Routes
  app.get("/api/admin/users", verifyToken, isAdmin, getAllUsers);
  app.get("/api/admin/analytics", verifyToken, isAdmin, getFinancialOverview);
  app.patch("/api/admin/users/:id/role", verifyToken, isAdmin, updateUserRole);
  app.patch("/api/admin/users/:id/wallet", verifyToken, isAdmin, updateUserWallet);
}

export default setUpRoutes;
