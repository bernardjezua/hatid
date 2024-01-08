import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import logo from "../images/hatid_logo.png";
import profile from "../images/profile.png";

export default function NavigationBar() {
  return (
    <>
    <header className="bg-dark-green">
      <nav className="h-24 mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-14">
        <div className="flex lg:flex-1 gap-x-8">
          <Link to="/admin" className="text-xl leading-9 text-light-gray">
            Home
          </Link>
        </div>
        <div className="lg:flex-2 pr-2">
                      
          <img className="h-24" src={logo} alt="logo"/>
                
        </div>
        <div className="flex lg:flex-1 leading-9 lg:justify-end gap-x-8">
          <Link to="/admin/profile" className="flex items-center">
            <img className="h-12" src={profile} alt="profile" />
          </Link>
        </div>
      </nav>
    </header>
    <Outlet />
    </>
  );
}