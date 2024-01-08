import React from 'react';
import header1 from "../images/header1.jpg";
import header2 from "../images/header2.jpg";
import header3 from "../images/header3.jpg";
// import data from '../data'
import HeaderSection from '../components/Header';
import CardProducts from '../components/CardMainPage';

import { useState, useEffect } from 'react';

export default function MainPage(){
    let slides = [header1, header2, header3];

    const [ data, setProducts ] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/get-products')
          .then(response => response.json())
          .then(body => {
            setProducts(body)
          })
      }, [])

    const product1 = data.filter(product =>
        (product.name === 'Radish') || (product.name === 'Onion') || (product.name === 'Papaya') || (product.name === 'Turnip')
        || (product.name === 'Eggplant') || (product.name === 'Milk') || (product.name === 'Corn') || (product.name === 'Mango')
    );

    const product2 = data.filter(product =>
        (product.name === 'Eggs') || (product.name === 'Apple') || (product.name === 'Grapes') || (product.name === 'Cabbage')
        || (product.name === 'Cucumber') || (product.name === 'Tomato') || (product.name === 'Spinach') || (product.name === 'Watermelon')
    );

    return(
        <div className="min-h-screen bg-light-gray m-0 pt-0">
            <HeaderSection slides = {slides}/>
            <p class="text-3xl uppercase font-semibold pt-36 text-center"> Recommended For You </p>
            <CardProducts products = {product1}/>
            <p class="text-3xl uppercase font-semibold pt-36 text-center"> Featured Products </p>
            <CardProducts products = {product2}/>
        </div>
    );
}