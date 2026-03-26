import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductScreen from '../components/ProductScreen';
import Breadcrumbs from '../components/Breadcrumbs';
import CardProducts from '../components/CardProducts';

export default function ProductDisplay() {
    const { name } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Correctly handle URL hyphens and encoding
        const searchName = decodeURIComponent(name).replace(/-/g, ' ');
        
        fetch(`http://127.0.0.1:3001/api/products/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: searchName })
        })
        .then(res => res.json())
        .then(body => {
            if (body.success) {
                setProduct(body.product);
                // Fetch similar products
                fetch(`http://127.0.0.1:3001/api/products`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            const filtered = data.products
                                .filter(p => p.category === body.product.category && p._id !== body.product._id)
                                .slice(0, 4);
                            setSimilarProducts(filtered);
                        }
                    });
            }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, [name]);

    return (
        <div className="min-h-screen bg-neutral-light pb-20 mt-4">
            <div className="max-w-7xl mx-auto px-6 py-6">
                {product && <Breadcrumbs category={product.category} product={name.replace(/-/g, ' ')} />}
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {loading ? (
                    <div className="flex justify-center py-20 animate-pulse text-primary-forest font-bold">Loading {name}...</div>
                ) : product ? (
                    <div className="space-y-24">
                        <ProductScreen product={product} />
                        
                        {similarProducts.length > 0 && (
                            <section className="mt-20">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-primary-900 uppercase tracking-widest">You May Also Like</h2>
                                    <div className="h-px flex-1 bg-neutral-100 mx-8"></div>
                                </div>
                                <CardProducts products={similarProducts} cols={4} />
                            </section>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20 text-neutral-500">Product Not Found.</div>
                )}
            </div>
        </div>
    );
}