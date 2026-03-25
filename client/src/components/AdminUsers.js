import React, { useState } from 'react';

export default function AdminUsers({ users }) {
  const usersPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="pt-20 pb-20 flex justify-center items-center">
        <div style={{ width: '600px' }} className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">

          <div className="flex justify-between items-center mb-2">
            <h1 className="w-full text-2xl mb-4" id="registered-users">List of Registered Users</h1>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-xl font-bold ">Name</div>
            <div className="text-xl font-bold">Email</div>
          </div>
          {currentUsers.map((user, index) => (
            <div key={index} className="px-2 py-2">
              <div className="flex justify-between items-center">
                <div className="text-base">{user.name}</div>
                <div className="text-base">{user.email}</div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
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
