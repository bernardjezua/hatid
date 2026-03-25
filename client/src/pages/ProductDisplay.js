import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductScreen from '../components/ProductScreen';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ProductDisplay() {
    const { name } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:3001/api/products/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        .then(res => res.json())
        .then(body => {
            if (body.success) {
                setProduct(body.product);
            }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, [name]);

    return (
        <div className="min-h-screen bg-neutral-light pb-20 mt-4">
            <div className="max-w-7xl mx-auto px-6 py-6">
                {product && <Breadcrumbs category={product.category} product={name} />}
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {loading ? (
                    <div className="flex justify-center py-20 animate-pulse text-primary-forest font-bold">Loading {name}...</div>
                ) : product ? (
                    <ProductScreen product={product} />
                ) : (
                    <div className="text-center py-20 text-neutral-500">Product Not Found.</div>
                )}
            </div>
        </div>
    );
}