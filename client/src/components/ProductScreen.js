import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProductScreen({ product }) {
  const { addToCart } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    // UX improvement: briefly change button text or show feedback
  };

  return (
    <div className="space-y-12">
      <div className="bento-card !p-0 overflow-hidden bg-white shadow-premium">
        <div className="flex flex-col lg:flex-row">
          {/* Gallery - Large Image */}
          <div className="lg:w-1/2 relative bg-neutral-100 h-[500px] lg:h-auto overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
            {product.stockQuantity <= 5 && (
              <div className="absolute top-6 left-6 bg-orange-500 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-lg animate-pulse uppercase tracking-widest">
                Low Stock: {product.stockQuantity} Remaining
              </div>
            )}
            <div className="absolute bottom-6 right-6 flex gap-2">
               <span className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black text-primary-forest uppercase tracking-widest shadow-sm">
                  1/1 Images
               </span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                 <span className="bg-primary-sage/20 text-primary-forest text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">Official Store</span>
                 <span className="bg-red-50 text-red-500 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-red-100 italic">HATID Mall</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-primary-900 mb-6 leading-tight tracking-tighter">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                 <div className="flex text-orange-400">
                    {Array(5).fill(0).map((_, i) => (
                       <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                       </svg>
                    ))}
                 </div>
                 <span className="h-4 w-px bg-neutral-200"></span>
                 <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">5.0 Rating</p>
                 <span className="h-4 w-px bg-neutral-200"></span>
                 <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">100+ Sold</p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8 mb-8">
               <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-black text-primary-forest">₱</span>
                  <span className="text-5xl font-black text-primary-forest">{product.price?.toLocaleString()}</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-sm uppercase italic border border-orange-200">Lowest Price Guaranteed</span>
               </div>
            </div>

            <div className="space-y-6 mb-10">
               <div className="flex gap-8">
                  <span className="w-24 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Shipping</span>
                  <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">🚚</span>
                        <p className="text-sm font-bold text-primary-900 italic">Free Shipping Over ₱1,000</p>
                     </div>
                     <p className="text-xs text-neutral-500 font-medium ml-7">Standard Delivery: Arrives in 2-3 Days</p>
                  </div>
               </div>

               <div className="flex gap-8">
                  <span className="w-24 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-4">Quantity</span>
                  <div className="flex-1 flex items-center gap-6">
                    <div className="flex items-center bg-white rounded-2xl p-1 shadow-sm border border-neutral-200">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 flex items-center justify-center text-2xl font-black text-primary-forest hover:bg-neutral-50 rounded-xl transition-all"
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <span className="w-12 text-center text-xl font-black text-primary-forest">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                        className="w-12 h-12 flex items-center justify-center text-2xl font-black text-primary-forest hover:bg-neutral-50 rounded-xl transition-all"
                        disabled={quantity >= product.stockQuantity}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{product.stockQuantity} Units available</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="w-full py-4 bg-primary-forest text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-primary-sage/40 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {product.stockQuantity === 0 ? 'Sold Out' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[32px] p-10 shadow-premium border border-neutral-100">
               <h2 className="text-xl font-black text-primary-900 uppercase tracking-widest mb-8 border-b border-neutral-100 pb-4">Product Specifications</h2>
               <div className="grid grid-cols-2 gap-y-6">
                  <div>
                     <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Category</p>
                     <p className="text-sm font-black text-primary-forest">{product.category}</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Vendor</p>
                     <p className="text-sm font-black text-primary-forest">{product.vendor || 'HATID Verified'}</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Origin</p>
                     <p className="text-sm font-black text-primary-forest">Local Farmers, Philippines</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Stock</p>
                     <p className="text-sm font-black text-primary-forest">{product.stockQuantity} Units</p>
                  </div>
               </div>
               
               <h2 className="text-xl font-black text-primary-900 uppercase tracking-widest mt-12 mb-8 border-b border-neutral-100 pb-4">Product Description</h2>
               <p className="text-neutral-600 leading-relaxed font-medium italic">
                  {product.description || 'Premium quality agricultural product, verified for organic standards and high yield. Sourced directly from local farmers to your doorstep.'}
               </p>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-primary-forest rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
               <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-primary-sage">Our Guarantee</h3>
               <p className="text-lg font-bold mb-8 leading-tight italic">"Full refund if the quality doesn't meet our community standards."</p>
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <span className="text-xl">✅</span>
                     <span className="text-xs font-bold uppercase tracking-widest">7-Day Free Returns</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-xl">🛡️</span>
                     <span className="text-xs font-bold uppercase tracking-widest">Safe Payment Escrow</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-xl">🌾</span>
                     <span className="text-xs font-bold uppercase tracking-widest">100% Authentic Origin</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}