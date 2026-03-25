import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async (token) => {
    try {
      const res = await fetch("http://127.0.0.1:3001/api/users/cart", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        const mappedCart = data.cart.map(item => ({
          ...item.product,
          quantity: item.quantity,
          _id: item.product._id
        }));
        setCart(mappedCart);
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  }, []);

  const checkLoginStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setCart([]);
        setLoading(false);
        return;
      }

      const response = await fetch("http://127.0.0.1:3001/api/auth/status", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const body = await response.json();
      
      if (body.isLoggedIn) {
        setUser({
          role: body.role,
          name: body.user?.name || localStorage.getItem('userName') || 'Farmer',
          email: body.user?.email || localStorage.getItem('userEmail') || ''
        });
        // Fetch cart from server
        fetchCart(token);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        setUser(null);
        setCart([]);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const syncCartWithServer = useCallback(async (currentCart) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const formattedCart = currentCart.map(item => ({
        product: item._id,
        quantity: item.quantity || 1
      }));

      await fetch("http://127.0.0.1:3001/api/cart/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ cart: formattedCart })
      });
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userName', `${userData.firstName} ${userData.lastName}`);
    setUser({
        role: userData.role,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email
    });
    fetchCart(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setUser(null);
    setCart([]);
    window.location.href = '/login';
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === product._id);
      let newCart;
      if (exists) {
        newCart = prev.map(item => 
          item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      syncCartWithServer(newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      const newCart = prev.map(item => {
        if (item._id === productId) {
          const newQty = Math.max(0, (item.quantity || 1) + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
      syncCartWithServer(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = prev.filter(item => item._id !== productId);
      syncCartWithServer(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    syncCartWithServer([]);
  };

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <AuthContext.Provider value={{ 
        user, cart, loading, login, logout, 
        addToCart, updateQuantity, removeFromCart, clearCart,
        checkLoginStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
