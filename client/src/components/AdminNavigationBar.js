import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from "../images/hatid_logo.png";

export default function AdminNavigationBar() {
  const { logout } = useAuth();

  return (
    <header className="glass-nav px-8 py-4 flex items-center justify-between shadow-soft">
      <div className="flex items-center gap-8">
        <Link to="/admin" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-forest shadow-premium">
            <img className="h-full w-full object-cover transition-transform group-hover:scale-110" src={logo} alt="logo" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-primary-forest tracking-tighter leading-none">HATID</span>
            <span className="text-[10px] font-bold text-accent-olive uppercase tracking-[0.2em]">Admin Portal</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/admin/profile" className="text-sm font-bold text-primary-900 hover:text-accent-olive transition-colors underline-offset-4 hover:underline">
          Admin Profile
        </Link>
        <button 
          onClick={logout}
          className="btn-sage !py-2 !px-6 text-sm"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}