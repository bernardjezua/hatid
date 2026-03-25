import express from 'express';
import { signUp, login, checkIfLoggedIn } from './controllers/auth-controller.js';
import { getProducts, addProduct, findProduct } from './controllers/product-controller.js';
import { createOrder, getOrders, updateOrderStatus, getOrdersByUser } from './controllers/order-controller.js';
import { getAllUsers, getFinancialOverview } from './controllers/admin-controller.js';
import { syncCart, getCart } from './controllers/cart-controller.js';
import { verifyToken, isAdmin } from './middlewares/auth.js';

const setUpRoutes = (app) => {
  // Auth Routes
  app.post("/api/auth/signup", signUp);
  app.post("/api/auth/login", login);
  app.get("/api/auth/status", checkIfLoggedIn);

  // Product Routes
  app.get("/api/products", getProducts);
  app.post("/api/products", verifyToken, isAdmin, addProduct);
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
  
  // Admin Specific Routes
  app.get("/api/admin/users", verifyToken, isAdmin, getAllUsers);
  app.get("/api/admin/analytics", verifyToken, isAdmin, getFinancialOverview);
}

export default setUpRoutes;
