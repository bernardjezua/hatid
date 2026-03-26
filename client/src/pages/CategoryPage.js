import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeaderProducts from '../components/HeaderProducts';
import CardProducts from '../components/CardProducts';
import Breadcrumbs from '../components/Breadcrumbs';

const CATEGORY_MAP = {
  'crops': 'Seeds & Crops',
  'fertilizers': 'Organic Fertilizers',
  'machinery': 'Heavy Machinery',
  'poultry': 'Livestock Feed',
  'produce': 'Fresh Produce'
};

const ALL_CATEGORIES = [
  { name: 'Seeds & Crops', slug: 'crops' },
  { name: 'Organic Fertilizers', slug: 'fertilizers' },
  { name: 'Heavy Machinery', slug: 'machinery' },
  { name: 'Livestock Feed', slug: 'poultry' },
  { name: 'Fresh Produce', slug: 'produce' }
];

export default function CategoryPage() {
  const { category: categorySlug } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("Name");
  const [priceRange, setPriceRange] = useState("All");

  const categoryName = CATEGORY_MAP[categorySlug?.toLowerCase()] || categorySlug;

  const performFilter = useCallback((products, term, sort, price) => {
    let result = [...products];

    // Search Filter
    if (term) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) || 
        p.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Price Filter
    if (price !== "All") {
       const [min, max] = price.split('-').map(Number);
       if (max) {
         result = result.filter(p => p.price >= min && p.price <= max);
       } else {
         result = result.filter(p => p.price >= min);
       }
    }

    // Sort Logic
    switch (sort) {
      case 'Lowest Price':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Highest Price':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Availability':
        result.sort((a, b) => b.stockQuantity - a.stockQuantity);
        break;
      case 'Name':
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    setFilteredProducts(result);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:3001/api/products')
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          const catFiltered = body.products.filter(p => p.category === categoryName);
          setAllProducts(catFiltered);
          performFilter(catFiltered, searchTerm, sortType, priceRange);
        }
      })
      .catch(error => console.error('Error fetching products:', error))
      .finally(() => setLoading(false));
  }, [categoryName, searchTerm, sortType, priceRange, performFilter]);

  // Synchronize filtering when inputs change
  useEffect(() => {
    performFilter(allProducts, searchTerm, sortType, priceRange);
  }, [searchTerm, sortType, allProducts, priceRange, performFilter]);

  return (
    <div className="min-h-screen bg-neutral-light pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Breadcrumbs category={categoryName} />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 mb-8">
        <h1 className="text-4xl font-black text-primary-900 tracking-tight">{categoryName}</h1>
        <p className="text-neutral-500 font-medium mt-2">Browse our high-quality {categoryName.toLowerCase()} collection.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Consistent Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 sticky top-24 space-y-8">
                    
                    {/* Live Search in Sidebar */}
                    <div>
                        <h2 className="text-xs font-black text-primary-900 uppercase tracking-widest mb-4">Live Search</h2>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-neutral-light border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-sage transition-all"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Other Categories Navigation */}
                    <div className="pt-6 border-t border-neutral-100">
                        <h2 className="text-xs font-black text-primary-900 uppercase tracking-widest mb-6">Browse Categories</h2>
                        <div className="space-y-3">
                            {ALL_CATEGORIES.map(cat => (
                                <Link 
                                    key={cat.slug} 
                                    to={`/category/${cat.slug}`}
                                    className={`block text-sm font-bold transition-all px-3 py-2 rounded-lg ${
                                        cat.slug === categorySlug 
                                            ? 'bg-primary-sage/20 text-primary-forest' 
                                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-primary-forest'
                                    }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="pt-6 border-t border-neutral-100">
                        <h2 className="text-xs font-black text-primary-900 uppercase tracking-widest mb-6">Price Range</h2>
                        <div className="space-y-2">
                            {['All', '0-500', '501-2000', '2001-5000', '5001'].map(range => (
                                <button 
                                    key={range}
                                    onClick={() => setPriceRange(range)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                                        priceRange === range 
                                            ? 'bg-primary-forest text-white' 
                                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-primary-forest'
                                    }`}
                                >
                                    {range === 'All' ? 'All Prices' : range === '5001' ? '₱5,000+' : `₱${range.replace('-', ' - ₱')}`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-100 text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                        Filtering {filteredProducts.length} Items
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4 bg-white/50 rounded-3xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600"></div>
                        <p className="text-primary-forest font-bold animate-pulse text-xs tracking-widest uppercase">Fetching {categoryName}...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <CardProducts products={filteredProducts} cols={3} />
                ) : (
                    <div className="p-32 text-center bg-white rounded-3xl border border-neutral-100">
                        <span className="text-6xl mb-6 block">🌾</span>
                        <h3 className="text-xl font-bold text-primary-900 mb-2">No items found</h3>
                        <p className="text-neutral-500 max-w-xs mx-auto text-sm">Try adjusting your search term or price filters for {categoryName}.</p>
                        <button 
                            onClick={() => { setSearchTerm(""); setPriceRange("All"); }}
                            className="mt-8 text-primary-forest font-black text-xs uppercase tracking-widest hover:underline"
                        >
                            Reset Category Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
}
