import React, {useState, useEffect} from 'react'
// import { Link } from 'react-router-dom';

export default function CardProducts({products}){
    // const[qty, setQty] = useState(1);

    const tempEmail = "john.doe@gmail.com"
    // const tempEmail = "jane.smith@gmail.com"

    const [ cart, setCart ] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/get-carts')
          .then(response => response.json())
          .then(body => {
            setCart(body)
            console.log(cart)
          })
      }, [])

    // const currentCart = cart.find(t => t.email === tempEmail)
    // setCart(currentCart)

    const handleAddtoCart = (toAdd) => {
    
        // var newCartItem = {}

        // fetch('http://localhost:3001/find-product',
        // {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },  
        //   body: JSON.stringify(toAdd)
        // })
        // .then(response => response.json())
        // .then(body => {
        //     newCartItem = body
        // }, [])
    
        // fetch('http://localhost:3001/add-cart-item',
        // {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },  
        //   body: JSON.stringify(newCartItem)
        // })
        // .then(response => response.text())
        // .then(body => {
        //   console.log(body) // returns true if add was successful
        // }, [])
    
    };

    function changeQty(qtyID, op){
        var value = parseInt(document.getElementById(qtyID).innerText, 10);
        value = isNaN(value) ? 0 : value;
        if (op === "+"){
            value++;
        }else{
            value--;
        }
        document.getElementById(qtyID).innerText = value;
    }

    return(
        <>
            <div className="pt-20 pb-20 flex justify-center items-center">
                <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 space-y-4 md:space-y-0">
                        {products && products.map((product) => {
                            return(
                                <div class="w-60 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">    
                                    <img class="w-full h-48 border-gray-200 mx-auto justify-center" src={product.imgSrc} alt="..." />
                                    <div class="px-2 py-2">
                                        <div class="pr-12 pt-3 text-xl mb-2">{product.name}</div>
                                        <p class="pb-1 font-bold text-base">{"₱" + product.price + " / " + product.units} </p>
                                        <p class="pb-1 text-base">Qty: {product.qty} </p>
                                    </div>
                                <div class="inline-flex items-center mt-2">
                                    <button onClick={() => changeQty("qty" + product.name, "-")} class="bg-white rounded-l border text-black hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex justify-center items-center px-2 py-1 border-r border-black w-10">
                                        -
                                    </button>
                                    <div id={"qty" + product.name} class="bg-white border-t border-b border-black text-black hover:bg-gray-100 inline-flex justify-center items-center px-4 py-1 select-none w-32">
                                        {1}
                                    </div>
                                    <button onClick={() =>  changeQty("qty" + product.name, "+")} class="bg-white rounded-r border text-black hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex justify-center items-center px-2 py-1 border-r border-black w-10">
                                        +
                                    </button>
                                </div>
                                <div class="inline-flex items-center mt-2">
                                    <button onclick={()=>handleAddtoCart(product.name)} class="bg-dark-green border text-white active:bg-gray-200 disabled:opacity-50 inline-flex justify-center items-center px-2 py-1 border-r border-black w-52">
                                            Add to Cart
                                    </button>
                                </div>
                            </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}