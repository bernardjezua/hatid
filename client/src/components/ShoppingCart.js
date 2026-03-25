import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ShoppingCart() {
    const navigate = useNavigate();
    const { user, cart, updateQuantity, removeFromCart, clearCart } = useAuth();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        
        if (!user) {
            alert("Please log in to checkout.");
            navigate('/login');
            return;
        }

        setIsCheckingOut(true);

        try {
            const token = localStorage.getItem('token');
            const mappedProducts = cart.map(item => ({
                product: item._id,
                quantity: item.quantity || 1
            }));

            const response = await fetch("http://127.0.0.1:3001/api/orders", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    products: mappedProducts,
                    totalAmount: getTotal()
                })
            });

            const body = await response.json();
            
            if (body.success) {
                alert("Order placed successfully! Waiting for admin approval.");
                clearCart();
                navigate('/');
            } else {
                alert(body.message || "Checkout failed");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-neutral-light flex flex-col items-center justify-center pt-10 pb-20">
                <h2 className="text-3xl font-bold text-primary-900 mb-4">Your Cart is Empty</h2>
                <p className="text-neutral-500 mb-8">Looks like you haven't added any fresh produce yet.</p>
                <button 
                    onClick={() => navigate('/products')}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-primary-700 transition"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-light pt-10 pb-20 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-primary-900 mb-8 text-center sm:text-left">Shopping Cart</h1>
                
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden mb-8">
                    <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-neutral-50 border-b border-neutral-200 text-sm font-semibold text-neutral-600 uppercase tracking-wider">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                    </div>
                    
                    <div className="divide-y divide-neutral-200">
                        {cart.map((item) => (
                            <div key={item._id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 items-center">
                                <div className="col-span-1 border-b border-neutral-200 pb-4 sm:border-0 sm:pb-0 sm:col-span-6 flex items-center gap-4">
                                    <div className="w-20 h-20 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">No Img</div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-primary-900">{item.name}</h3>
                                        <p className="text-sm text-neutral-500 capitalize">{item.category}</p>
                                        <button 
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this item from your cart?")) {
                                                    removeFromCart(item._id);
                                                }
                                            }}
                                            className="text-sm text-red-500 hover:text-red-700 mt-1 sm:hidden font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="col-span-1 font-bold sm:col-span-2 sm:text-center text-neutral-700">
                                    <span className="sm:hidden text-neutral-500 font-normal mr-2">Price:</span>
                                    ₱{item.price?.toLocaleString() || '0.00'}
                                </div>
                                
                                <div className="col-span-1 sm:col-span-2 flex sm:justify-center">
                                    <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden w-24 h-8 bg-white">
                                        <button 
                                            onClick={() => {
                                                if (item.quantity === 1) {
                                                    if (window.confirm("Are you sure you want to delete this item from your cart?")) {
                                                        updateQuantity(item._id, -1);
                                                    }
                                                } else {
                                                    updateQuantity(item._id, -1);
                                                }
                                            }}
                                            className="w-8 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 transition"
                                        >-</button>
                                        <div className="flex-1 text-center font-medium text-sm">{item.quantity}</div>
                                        <button 
                                            onClick={() => updateQuantity(item._id, 1)}
                                            className="w-8 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 transition"
                                        >+</button>
                                    </div>
                                </div>
                                
                                <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-end items-center font-bold text-lg text-primary-700">
                                    <span className="sm:hidden text-neutral-500 font-normal mr-2 text-base">Subtotal:</span>
                                    <div className="flex items-center gap-4">
                                        ₱{(item.price * (item.quantity || 1)).toLocaleString()}
                                        <button 
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this item from your cart?")) {
                                                    removeFromCart(item._id);
                                                }
                                            }}
                                            className="hidden sm:flex text-red-400 hover:text-red-600 transition p-1 hover:bg-red-50 rounded"
                                            title="Remove item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 max-w-md ml-auto">
                    <div className="flex justify-between items-center mb-6 border-b border-neutral-200 pb-4">
                        <span className="text-lg text-neutral-600 font-medium">Order Total</span>
                        <span className="text-3xl font-bold text-primary-800">₱{getTotal().toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-primary-600 hover:bg-primary-700 border border-transparent disabled:bg-neutral-300 disabled:cursor-not-allowed text-white text-lg font-medium py-4 rounded-lg shadow-sm transition-colors flex justify-center items-center"
                    >
                        {isCheckingOut ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Processing...
                            </span>
                        ) : 'Confirm Checkout'}
                    </button>
                    <p className="text-sm text-neutral-500 text-center mt-4">
                        Payment will be collected upon delivery/pickup.
                    </p>
                </div>
            </div>
        </div>
    );
}