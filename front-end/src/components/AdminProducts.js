import React, { useEffect, useState } from 'react';

export default function AdminProducts() {

  const [ products, setProducts ] = useState([])

  const productsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [showInputs, setShowInputs] = useState(false);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productQty, setProductQty] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productUnits, setProductUnits] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/get-products')
      .then(response => response.json())
      .then(body => {
        setProducts(body)
      })
  })


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleButtonClick = () => {
    setShowInputs(true);
  };

  const handleAddProduct = () => {
    // Implement logic to add the new product to your data or state

    if (productName === "" || productType === "" || productQty === "" || productPrice ==="" || productUnits === ""){
      alert("Empty Inputs!");
      return
    }

    const newProduct = {
      name: productName,
      type: productType,
      imgSrc: "",
      price: productPrice,
      units: productUnits,
      qty: productQty,
    }

    fetch('http://localhost:3001/add-product',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify(newProduct)
    })
    .then(response => response.text())
    .then(body => {
      console.log(body) // returns true if add was successful
    }, [])

    setProducts([...products, newProduct]);

    // Reset input fields and hide them
    setProductName('');
    setProductType('');
    setProductQty('');
    setProductPrice('');
    setProductUnits('');
    setShowInputs(false);
    
    };

  return (
    <>
      <div className="pt-20 pb-20 flex justify-center items-center">
        <div style={{ width: '600px' }} className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">

          <div className="flex justify-between items-center mb-2">
            <h1 className="w-full text-2xl mb-4">List of Products</h1>
            <button
              onClick={handleButtonClick}
              className="bg-green-700 border text-white hover:bg-gray-500 active:bg-gray-700 disabled:opacity-50 inline-flex justify-center items-center px-2 py-1 border-r border-white w-10"
            >
              +
            </button>
          </div>
          {showInputs && (
            <div className="flex flex-col mb-2">
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border p-2 mb-2"
              />
              <input
                type="text"
                placeholder="Product Type (crops or poultry)"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="border p-2 mb-2"
              />
              <input
                type="number"
                placeholder="Product Qty"
                value={productQty}
                onChange={(e) => setProductQty(e.target.value)}
                className="border p-2 mb-2"
              />
              <input
                type="text"
                placeholder="Product Units per Item Sold (e.g. pc, kg, 500g, 500ml)"
                value={productUnits}
                onChange={(e) => setProductUnits(e.target.value)}
                className="border p-2 mb-2"
              />
              <input
                type="number"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="border p-2 mb-2"
              />
              <button onClick={handleAddProduct} className="bg-amber-400 text-white py-2 px-4 rounded">
                Add Product
              </button>
            </div>
          )}
          <div className="flex justify-between items-center mb-2">
            <div className="text-xl font-bold">Product</div>
            <div className="text-xl font-bold">Qty</div>
            <div className="text-xl font-bold">Price</div>
          </div>
          {currentProducts.map((product, index) => (
            <div key={index} className="px-2 py-2">
              <div className="flex justify-between items-center">
                <div className="px-2 py-2">
                  <img className="w-12 h-15 border-gray-200 mx-auto justify-center" src={`${product.imgSrc}`} alt="..." />
                  <p className="text-base">{product.name}</p>
                </div>
                <div className="text-base">{product.qty}</div>
                <div className="text-base">{"₱" + product.price + " / " + product.units}</div>
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
