import React from 'react';
import { Link } from 'react-router-dom';
import profile from "../images/Profile2.jpg";

export default function AdminReport({ users }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div style={{ width: '600px' }} className="p-4 bg-green-700 border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">
        <Link to="/users">
          <div className="bg-white p-8 rounded shadow-md w-96">
            {users.map((user) => (
              <div key={user.id} className="mb-4">
                <img className="h-20" src={profile} alt="profile"/>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-2xl font-bold">{user.name}</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-base">{user.email}</div>
                </div>
              </div>
            ))}            
           <p className="text-gray-600 mb-4">Account Type: <span className="font-semibold">Customer</span></p>
            <Link to="/">
              <button className="bg-red-800 text-white px-4 py-2 rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300">
                Logout
              </button>
            </Link>
          </div>
        </Link>
      </div>
    </div>
  );
}
