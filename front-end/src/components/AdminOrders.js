import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminOrders({ users }) {
  const usersPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleButtonClick = () => {
    // Handle button click here
  };

  return (
    <>
      <div id="order-details" className="pt-10 pb-10 flex justify-center items-center">
        <div style={{ width: '700px' }} className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h1 className="w-full text-2xl mb-2">Order Details</h1>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div style={{ width: '120px' }} className="text-xl font-bold">Customer</div>
              <div style={{ width: '120px' }} className="text-xl font-bold">Product</div>
              <div className="text-xl font-bold">QTY</div>
              <div className="text-xl font-bold">Total</div>
              <div className="text-xl font-bold">Status</div>
            </div>
          <div className="mb-2">
            {currentUsers.map((user, index) => (
              <div key={index} className="flex items-center mb-2">
                <div style={{ width: '230px' }} className="text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {user.name}
                </div>
                {user.products.map((product, productIndex) => (
                  <React.Fragment key={productIndex}>
                    <div className="w-40 text-base flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {product.product}
                    </div>
                  </React.Fragment>
                ))}
                     {user.products.map((product, productIndex) => (
                  <React.Fragment key={productIndex}>
                    <div className="w-20 text-base flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {product.qty}
                    </div>
                  </React.Fragment>
                ))}
                <div className="w-40 text-base flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">{user.total}</div>
                  <div className="flex items-center">
                    <button
                      onClick={handleButtonClick}
                      className="bg-green-700 border text-white hover:bg-gray-500 active:bg-gray-200 disabled:opacity-50 inline-flex justify-center items-center px-2 py-1 border-r border-white w-30 ml-1"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          <div className="flex justify-center mt-2">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-2 py-1 border rounded-md text-sm ${
                  currentPage === i + 1 ? 'bg-gray-300' : 'hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
