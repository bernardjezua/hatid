import React, { useState, useEffect, useMemo } from 'react';
import CardProducts from '../components/CardProducts';
import HeaderProducts from '../components/HeaderProducts';

const CATEGORIES = ['Seeds & Crops', 'Organic Fertilizers', 'Heavy Machinery', 'Livestock Feed', 'Fresh Produce'];

export default function AllProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortType, setSortType] = useState("Name");

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/products')
            .then(res => res.json())
            .then(data => {
                if (data.success) setProducts(data.products);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 p.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
            return matchesSearch && matchesCategory;
        }).sort((a, b) => {
            if (sortType === "Lowest Price") return a.price - b.price;
            if (sortType === "Highest Price") return b.price - a.price;
            // Default: Group by Category then Name
            if (a.category !== b.category) return a.category.localeCompare(b.category);
            return a.name.localeCompare(b.name);
        });
    }, [products, searchTerm, selectedCategories, sortType]);

    const toggleCategory = (cat) => {
        setSelectedCategories(prev => 
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-neutral-light"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600"></div></div>;

    return (
        <div className="min-h-screen bg-neutral-light pb-20">
            <HeaderProducts 
                productType="All Products" 
                onSearch={setSearchTerm} 
                onSort={setSortType} 
                resultsCount={filteredProducts.length}
            />

            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 sticky top-24">
                        <h2 className="text-lg font-bold text-primary-900 mb-6">Filter by Category</h2>
                        <div className="space-y-4">
                            {CATEGORIES.map(cat => (
                                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input 
                                            type="checkbox" 
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-neutral-300 checked:bg-primary-600 checked:border-primary-600 transition-all"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => toggleCategory(cat)}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <span className="text-sm font-medium text-neutral-600 group-hover:text-primary-600 transition-colors">
                                        {cat}
                                    </span>
                                </label>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-neutral-100 text-xs text-neutral-400 font-bold uppercase tracking-widest">
                            Showing {filteredProducts.length} Results
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {filteredProducts.length > 0 ? (
                        <CardProducts products={filteredProducts} cols={3} />
                    ) : (
                        <div className="p-20 text-center">
                            <span className="text-6xl mb-4 block">🚜</span>
                            <h3 className="text-xl font-bold text-primary-900 mb-2">No items match your filters</h3>
                            <p className="text-neutral-500">Try adjusting your search or category selection.</p>
                            <button 
                                onClick={() => { setSelectedCategories([]); setSearchTerm(""); }}
                                className="mt-6 text-primary-600 font-bold hover:underline"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
