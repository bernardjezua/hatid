import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CardProducts from '../components/CardMainPage';

// Categories data
const CATEGORIES = [
  { name: 'Seeds & Crops', icon: '🌱', slug: 'crops', count: '120+ Items' },
  { name: 'Organic Fertilizers', icon: '🪱', slug: 'fertilizers', count: '45+ Items' },
  { name: 'Heavy Machinery', icon: '🚜', slug: 'machinery', count: '12+ Items' },
  { name: 'Livestock Feed', icon: '🐔', slug: 'poultry', count: '80+ Items' },
  { name: 'Fresh Produce', icon: '🍎', slug: 'produce', count: '200+ Items' },
];

export default function MainPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/products')
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          setProducts(body.products);
        }
      })
      .catch(err => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  // Logical splits for layout - MEMOIZED to prevent "disappearing" bug on re-renders
  const featuredProducts = useMemo(() => products.slice(0, 3), [products]);
  const recommendedProducts = useMemo(() => 
    [...products].sort(() => 0.5 - Math.random()).slice(0, 6)
  , [products]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-neutral-light"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600"></div></div>;

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Dynamic Hero Section */}
      <section className="relative overflow-hidden bg-primary-forest text-white py-20 px-4 md:px-12 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 transform -rotate-12 translate-y-12">
             {Array(24).fill(0).map((_, i) => <div key={i} className="w-full h-32 bg-white rounded-3xl"></div>)}
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {user ? (
            <>
              <span className="inline-block px-4 py-1 rounded-full bg-accent-olive/30 text-primary-sage border border-accent-olive/50 text-sm font-bold mb-4 animate-bounce">
                Active Session
              </span>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Welcome back, <span className="text-primary-sage">{user.name.split(' ')[0]}</span>.
              </h1>
              <p className="text-xl text-primary-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Your local agriculture community missed you! Ready to grow your farm or stock up on fresh supplies?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/profile" className="btn-sage">View My Orders</Link>
                <Link to="/products" className="btn-forest border-2 border-white/20">Explore Catalog</Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Empowering the <br /> <span className="text-primary-sage italic underline decoration-accent-olive decoration-8 underline-offset-8">Modern Farmer</span>.
              </h1>
              <p className="text-xl text-primary-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Connect directly with premium vendors. From seeds to heavy machinery, HATID is your digital tool for agricultural success.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/signup" className="btn-forest !bg-white !text-primary-forest hover:!bg-primary-sage">Join the Community</Link>
                <Link to="/login" className="px-8 py-3 font-bold hover:text-primary-sage transition-colors underline-offset-4 hover:underline">Already member? Sign In</Link>
              </div>
            </>
          )}
        </div>
      </section>
 
      {/* Featured Products (Top 3) */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl text-primary-forest">Featured This Week</h2>
            <p className="text-neutral-500 mt-2 text-lg italic">Handpicked premium products for your harvest.</p>
          </div>
          <Link to="/category/crops" className="hidden md:block text-primary-600 font-bold hover:underline">View All &rarr;</Link>
        </div>
        <CardProducts products={featuredProducts} cols={3} />
      </section>
 
      {/* Categories Section */}
      <section className="bg-primary-sage/30 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-primary-forest text-center mb-16">Browse Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link key={i} to={`/category/${cat.slug}`} className="bento-card text-center flex flex-col items-center justify-center hover:bg-white active:scale-95">
                <span className="text-5xl mb-4 group-hover:scale-125 transition-transform">{cat.icon}</span>
                <h3 className="text-lg font-bold text-primary-900">{cat.name}</h3>
                <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended For You (Random 6) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-primary-forest">Recommended For You</h2>
          <div className="h-1.5 w-24 bg-primary-forest mx-auto mt-4 rounded-full"></div>
        </div>
        <CardProducts products={recommendedProducts} cols={3} />
      </section>
    </div>
  );
}