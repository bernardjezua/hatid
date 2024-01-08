import React from 'react';
import AdminReport from '../components/AdminReport';
import AdminUsers from '../components/AdminUsers';
import AdminProducts from '../components/AdminProducts';
import AdminOrders from '../components/AdminOrders';
import AdminSold from '../components/AdminSold';
import UsersData from '../UsersData';
import data from '../data';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-light-gray m-0 pt-0 flex flex-wrap justify-center">
      <p className="text-4xl uppercase font-semibold pt-36 text-center ml-4">Welcome to Dashboard!</p>
      <div className="flex-grow flex justify-center">
        <AdminReport />
      </div>
      <div className="flex w-full">
        <div className="flex-grow mt-4">
          <AdminUsers users={UsersData} />
        </div>
        <div className="flex-grow mt-4">
          <AdminProducts />
        </div>
      </div>
      <div className="flex w-full">
      <div className="flex-grow flex justify-center">
        <AdminOrders users={UsersData} />
      </div>
        <div className="flex-grow mt-4">
          <AdminSold products={data} />
        </div>
      </div>
    </div>
  );
}
