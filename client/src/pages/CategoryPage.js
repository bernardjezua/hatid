import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

export default function CategoryPage() {
  const { category: categorySlug } = useParams();
  const { addToCart } = useAuth();
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
      result = result.filter(p => p.name.toLowerCase().includes(term.toLowerCase()));
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

  useEffect(() => {
    performFilter(allProducts, searchTerm, sortType, priceRange);
  }, [searchTerm, sortType, allProducts, priceRange, performFilter]);

  return (
    <div className="min-h-screen bg-neutral-light pb-20">
      <div className="max-w-7xl mx-auto px-6 py-6 font-bold">
        <Breadcrumbs category={categorySlug} />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Sidebar */}
        <aside className="lg:col-span-1 hidden lg:block">
           <div className="sticky top-24 space-y-8 bg-white p-8 rounded-[32px] border border-neutral-100 shadow-premium">
              <div>
                <h4 className="text-xs font-black text-primary-900 uppercase tracking-widest mb-4">Live Search</h4>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search items..."
                    className="w-full pl-10 pr-4 py-3 bg-neutral-light border-none rounded-2xl focus:ring-2 focus:ring-primary-sage transition-all text-sm font-bold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-primary-900 uppercase tracking-widest mb-4">Price Range</h4>
                <div className="space-y-2">
                   {['All', '0-500', '501-2000', '2001-5000', '5001'].map(range => (
                     <button 
                       key={range}
                       onClick={() => setPriceRange(range)}
                       className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                         priceRange === range 
                          ? 'bg-primary-forest text-white shadow-lg scale-[1.02]' 
                          : 'text-neutral-500 hover:bg-primary-sage/10 hover:text-primary-forest'
                       }`}
                     >
                       {range === 'All' ? 'All Prices' : range === '5001' ? '₱5,000+' : `₱${range.replace('-', ' - ₱')}`}
                     </button>
                   ))}
                </div>
              </div>
           </div>
        </aside>

        {/* Product Display Area */}
        <main className="lg:col-span-3">
          <HeaderProducts 
            productType={categoryName} 
            onSearch={setSearchTerm} 
            onSort={setSortType} 
            resultsCount={filteredProducts.length}
          />
          
          <div className="mt-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                <p className="text-primary-forest font-bold animate-pulse text-lg tracking-widest uppercase">Fetching {categoryName}...</p>
              </div>
            ) : (
              <CardProducts products={filteredProducts} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
