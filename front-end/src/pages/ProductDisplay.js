import React from 'react';
import { Link } from 'react-router-dom';
import ProductScreen from '../components/ProductScreen';
import data from '../data';

export default function ProductDisplay(){

    return(
        <div className="min-h-screen bg-light-gray m-0 pt-0">
            <header className="bg-yellow-gray">
                <div className="h-12 border-b border-black mx-auto flex max-w-8xl p-6 lg:px-14 items-center gap-1">
                    <Link to="/"> Home </Link>
                        /
                    <Link to=""> Products </Link>
                        /
                    <Link className="underline decoration-1" to=""> ll </Link>
                </div>
            </header>
            <ProductScreen />
        </div>
    )
}