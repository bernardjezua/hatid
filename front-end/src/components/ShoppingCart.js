// import React, { useState, useEffect } from 'react';

const cart = [
    {
      email: "john.doe@gmail.com",
      products: [
        {
          name: "Ampalaya",
          type: "crops",
          imgSrc: "/images/crops/ampalaya.jpg",
          price: 115,
          units: "kg",
          qty: 5
        },
        {
          name: "Apple",
          type: "crops",
          imgSrc: "/images/crops/apple.jpg",
          price: 120,
          units: "kg",
          qty: 5
        }
      ]
    }
]

export default function ShoppingCart(){

    // find name/email of current user
    //  after finding, use to find their cart in cart database
    // const tempEmail = "john.doe@gmail.com"
    // const tempEmail2 = "jane.smith@gmail.com"

    // const [ cart, setCart ] = useState([])

    // useEffect(() => {
    //     fetch('http://localhost:3001/get-carts')
    //       .then(response => response.json())
    //       .then(body => {
    //         setCart(body)
    //       })
    //   }, [])

    // //
    // const currentCart = cart.find(t => t.email === "@@@ insert-current-user-email-here @@@")
    // setCart(currentCart)

    // console.log(cart[0].products)

    function getTotal (){
        let total = 0
        cart[0].products.forEach(function (item, index){
            total = total + (item.qty * item.price)
        })

        return total
    }

    function checkout (){
        
    }

    return(
        <>
            <div className="text-3xl uppercase font-semibold pt-12 text-center">
                My Shopping Cart
            </div>

            <div className="flex flex-row bg-yellow-gray grid grid-cols-5 gap-2 place-items-center mt-14 border-t border-b border-gray-400">
                <div class="pr-12 pt-3 text-xl mb-2">Item</div>
                <div class="pr-12 pt-3 text-xl mb-2">Price</div>
                <div class="pr-12 pt-3 text-xl mb-2">Qty.</div>
                <div class="pr-12 pt-3 text-xl mb-2">Total</div>
            </div>

            {cart[0].products.map((product) => (
            <div className="divide-y divide-gray-400">
                <div className="grid grid-cols-5 gap-2 place-items-center">
                    <div class="pl-24 grid grid-cols-2 gap-2 place-items-center">
                        <img class="shrink-0" src={product.imgSrc} alt="..."/>
                        <div class="pr-12 text-xl font-bold ">
                            {product.name}
                            <div class="font-normal text-base">
                                {product.type}
                            </div>
                        </div>
                    </div>
                    <div class="pr-12 pt-3 text-xl mb-2">{"₱" + product.price + " / " + product.units}</div>
                    
                    <div class="pr-12 pt-3 text-xl mb-2">{product.qty + " " + product.units}</div>

                    <div class="pr-12 pt-3 text-xl mb-2 font-bold">{"₱" + (product.qty * product.price)}</div>

                    <button class="bg-dark-green border text-white active:bg-gray-200 disabled:opacity-50 inline-flex justify-center items-center px-2 py-1 border-r border-black w-24">Remove</button>
                </div> 
            </div>
            ))}
            {/* this part only needed if there is delivery fee */}
            {/* <div className="bg-yellow-gray border-t border-b border-gray-400 grid grid-cols-4 gap-2 place-items-center">
                <div class=""></div>
                <div class=""></div>
                <div class="pr-12 pt-3 text-xl font-bold">
                    Subtotal:
                </div>
                <div class="pr-12 pt-3 text-xl">
                    -
                </div>            
            </div>

            <div className="bg-yellow-gray border-b border-gray-400 grid grid-cols-4 gap-2 place-items-center">
                <div class=""></div>
                <div class=""></div>
                <div class="pr-12 pt-3 text-xl font-bold">
                    Delivery Fee:
                </div>
                <div class="pr-12 pt-3 text-xl">
                    -
                </div>            
            </div> */}

            <div className="bg-yellow-gray border-t border-b border-gray-400 grid grid-cols-5 gap-2 place-items-center">
                <div class=""></div>
                <div class=""></div>
                <div class="pr-12 pt-3 text-2xl mb-2 font-bold">
                    Total:
                </div>
                <div class="pr-12 pt-3 text-2xl mb-2 font-bold">
                    {"₱" + getTotal()}
                </div>            
            </div>
            
            <div className="bg-yellow-gray border-b border-gray-400 grid grid-cols-5 place-content-evenly gap-2 place-items-center pt-5 pb-5">
                <div class=""></div>
                <div class=""></div>
                <div class=""></div>
                <button class="bg-dark-green border text-white active:bg-gray-200 disabled:opacity-50 inline-flex justify-center items-center px-2 py-1 border-r border-black w-44 h-12">
                    Proceed to Checkout
                </button>
            </div>
        </>
    )
}