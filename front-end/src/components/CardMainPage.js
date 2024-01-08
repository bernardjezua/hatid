import React from 'react';
import { Link } from 'react-router-dom';

export default function CardMainPage({products}){
    
    return(
        <>
            <div className="min-h-screen pb-20 flex justify-center items-center py-12">
                <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 space-y-4 md:space-y-0">
                        {products.map((product) => {
                            return(
                                <div class="w-60 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">    
                                <Link to="">
                                    <img class="w-full h-48 border-gray-200 mx-auto justify-center" src={product.imgSrc} alt="..." />
                                    <div class="px-2 py-2">
                                        <div class="pr-12 pt-3 text-xl mb-2">{product.name}</div>
                                        <p class="pb-1 font-bold text-base">{"₱" + product.price + " / " + product.units} </p>
                                    </div>
                                </Link>    
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}