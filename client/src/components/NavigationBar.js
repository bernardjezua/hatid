import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from "../images/hatid_logo.png";

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);

export default function NavigationBar() {
  const { user, cart, logout } = useAuth();
  const cartCount = cart?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

  return (
    <header className="glass-nav px-4 md:px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-[100]">
      <div className="flex items-center gap-8 flex-1">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary-forest shadow-premium">
            <img className="h-full w-full object-cover transition-transform group-hover:scale-110" src={logo} alt="logo" />
          </div>
          <span className="text-2xl font-black text-primary-forest tracking-tighter">HATID</span>
        </Link>
 
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-bold text-primary-900 hover:text-accent-olive transition-colors">Home</Link>
          <Link to="/about" className="text-sm font-bold text-primary-900 hover:text-accent-olive transition-colors">About Us</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-sm font-bold text-accent-olive bg-accent-olive/10 px-3 py-1 rounded-full hover:bg-accent-olive/20 transition-colors">Admin Panel</Link>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Link to="/shoppingcart" className="relative group">
          <div className="bg-primary-sage/50 p-2.5 rounded-full transition-all group-hover:scale-110 group-hover:bg-primary-sage text-primary-forest relative">
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
        
        <div className="h-8 w-px bg-neutral-200 hidden md:block"></div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="text-xs text-neutral-500 font-medium">Welcome back,</p>
              <p className="text-sm font-bold text-primary-forest leading-tight">{user.name}</p>
            </div>
            <Link to="/profile" className="p-2.5 bg-neutral-100 rounded-full hover:bg-primary-sage/20 transition-all">
              <UserIcon />
            </Link>
            <button 
              onClick={logout}
              className="flex items-center gap-2 p-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all transform active:scale-95"
              title="Logout"
            >
                <LogOutIcon />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-bold text-primary-forest hover:opacity-70 transition-opacity">Sign In</Link>
            <Link to="/signup" className="btn-forest !py-2 !px-5 text-sm">Join Community</Link>
          </div>
        )}
      </div>
    </header>
  );
}
