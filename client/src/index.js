import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import ProtectedRoute from './components/ProtectedRoute';

import './index.css';
import NavigationBar from './components/NavigationBar';
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import AdminNavigationBar from './components/AdminNavigationBar';
import ProductDisplay from "./pages/ProductDisplay";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import Home from "./pages/MainPage";
import AdminPage from "./pages/AdminDashboard";
import Profile from "./pages/ProfilePage";
import AllProductsPage from "./pages/AllProductsPage";

const AppLayout = () => (
  <>
    <NavigationBar />
    <Outlet />
  </>
);

const AdminLayout = () => (
  <ProtectedRoute adminOnly={true}>
    <AdminNavigationBar />
    <Outlet />
  </ProtectedRoute>
);

const router = createBrowserRouter([
  { path:'/login' , element: <LogIn />},
  { path:'/signup' , element: <SignUp />},

  { 
    path:'/' , 
    element: <AppLayout />, 
    children: [
      { path:'/' , element: <Home />},
      { path:'/products' , element: <AllProductsPage />},
      { path:'/products/:name' , element: <ProductDisplay />},
      { path:'/category/:category' , element: <CategoryPage />},
      { path:'/about' , element: <AboutPage />},
      { 
        path:'/shoppingcart' , 
        element: (
          <ProtectedRoute>
            <ShoppingCartPage />
          </ProtectedRoute>
        )
      },
      { 
        path: '/profile', 
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ]
  },
 
  { 
    path:'/admin' , 
    element: <AdminLayout />, 
    children: [
      { path: '/admin', element: <AdminPage />},
      { path: '/admin/profile', element: <Profile />}
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UIProvider>
        <RouterProvider router={router} />
      </UIProvider>
    </AuthProvider>
  </React.StrictMode>
);
