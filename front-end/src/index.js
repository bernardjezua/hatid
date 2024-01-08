import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import NavigationBar from './components/NavigationBar';
import AdminNavigationBar from './components/AdminNavigationBar';
import Footer from './components/Footer';
import ProductsCrops from "./pages/ProductCropsPage";
import ProductsPoultry from "./pages/ProductPoultryPage";
import ProductDisplay from "./pages/ProductDisplay";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import Home from "./pages/MainPage";
import AdminPage from "./pages/AdminDashboard";
import Profile from "./pages/ProfilePage";

const router = createBrowserRouter([
  { path:'/login' , element: <LogIn />},
  { path:'/signup' , element: <SignUp />},

  { path:'/' , element: <NavigationBar />, children: [
    { path:'/' , element: <Home />},
    { path:'/Products/:name' , element: <ProductDisplay />},
    { path:'/Products/Crops' , element: <ProductsCrops />},
    { path:'/Products/Poultry' , element: <ProductsPoultry />},
    { path:'/ShoppingCart' , element: <ShoppingCartPage />},
    { path: '/profile', element: <Profile />}
  ]},

  { path:'/admin' , element: <AdminNavigationBar />, children: [
    { path: '/admin', element: <AdminPage />},
    { path: '/admin/profile', element: <Profile />}
  ]},

  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);

