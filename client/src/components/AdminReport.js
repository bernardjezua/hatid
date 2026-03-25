import React from 'react';
import Users from "../images/Users.jpg";
import Orders from "../images/Orders.jpg";
import Sales from "../images/Sales.jpg";

export default function AdminReport() {
    return (
        <>
    <div className="pt-20 pb-20 flex justify-center items-center">
        <div style={{ width: '230px' }} className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">
                        <a href="#registered-users">
                            <img className="w-full h-48 border-gray-200 mx-auto" src={Users} alt="Users Symbol" />
                            <div className="px-2 py-2">
                                <div className="pr-12 pt-3 text-m mb-2">USERS</div>
                                <p className="pb-1 font-bold text-2xl">23</p>
                            </div>
                        </a>
                    </div>
                    <div style={{ width: '230px' }} className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">
                        <a href="#order-details">
                            <img className="w-full h-48 border-gray-200 mx-auto" src={Orders} alt="Orders Symbol" />
                            <div className="px-2 py-2">
                                <div className="pr-12 pt-3 text-m mb-2">ORDERS</div>
                                <p className="pb-1 font-bold text-2xl">105</p>
                            </div>
                        </a>
                    </div>
                    <div style={{ width: '230px' }} className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">
                        <a href="#products-sold">
                            <img className="w-full h-48 border-gray-200 mx-auto" src={Sales} alt="Sales Symbol" />
                            <div className="px-2 py-2">
                                <div className="pr-12 pt-3 text-m mb-2">SALES</div>
                                <p className="pb-1 font-bold text-2xl">387 Pesos</p>
                            </div>
                        </a>
                    </div>
                </div>
        </>
    );
}
