import React, { useState } from 'react';

export default function CardProducts({ products }) {
  const productsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="pt-20 pb-20 flex justify-center items-center">
        <div style={{ width: '600px' }} className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h1 className="w-full text-2xl mb-4" id="products-sold">Product Sold</h1>
            </div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-xl font-bold">Product</div>
            <div className="text-xl font-bold">Qty</div>
            <div className="text-xl font-bold">Total Price</div>
          </div>
          {currentProducts.map((product, index) => (
            <div key={index} className="px-2 py-2">
              <div className="flex justify-between items-center">
                <div className="px-2 py-2">
                  <img className="w-12 h-15 border-gray-200 mx-auto justify-center" src={product.imgSrc} alt="..." />
                  <p className="text-base">{product.name}</p>
                </div>
                {/* should be the total quantity once sold or odered confirm */}
                <div className="text-base">{product.qty}</div>
                {/* should be the total price of the sold item */}
                <div className="text-base">{product.price}</div> 
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
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
