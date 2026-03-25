import React, { useState, useEffect } from 'react';
import HeaderProducts from '../components/HeaderProducts';
import CardProducts from '../components/CardProducts';
// import data from '../data'

export default function ProductPoultryPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/products')
          .then(response => response.json())
          .then(body => {
            if (body.success) {
                setProducts(body.products);
            }
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
            setLoading(false);
          });
    }, []);

    const poultry = products.filter(product => product.category === 'Poultry');
    
    return (
        <div className="min-h-screen bg-neutral-light pb-20">
            <HeaderProducts productType="Poultry" />
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-neutral-500">Loading poultry products...</p>
                </div>
            ) : (
                <CardProducts products={poultry} />
            )}
        </div>
    );
}