import React, { useState, useEffect } from 'react';
import HeaderProducts from '../components/HeaderProducts';
import CardProducts from '../components/CardProducts';
// import data from '../data'

export default function ProductPoultryPage(){

    const [ data, setProducts ] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/get-products')
          .then(response => response.json())
          .then(body => {
            setProducts(body)
          })
      }, [])


    let productType = "Poultry";
    const poultry = data.filter(product =>
        product.type === 'poultry'
    );
    
    return(
        <div className="min-h-screen bg-light-gray m-0 pt-0">
            <HeaderProducts productType ={productType} />
            <CardProducts products ={poultry} />
        </div>
    )
}