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
    <div className="bento-card !p-0 overflow-hidden bg-white shadow-premium">
      <div className="flex flex-col lg:flex-row">
        {/* Gallery */}
        <div className="lg:w-1/2 relative bg-neutral-100 h-[400px] lg:h-auto overflow-hidden">
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
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
          <div className="mb-6">
            <span className="text-xs font-black text-accent-olive uppercase tracking-[0.2em] mb-2 block">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-black text-primary-forest mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-primary-sage/50 flex items-center justify-center text-primary-forest font-bold">DA</div>
               <p className="text-sm font-semibold text-neutral-500 italic">Sourced by <span className="text-primary-forest">{product.vendor || 'Dept. of Agriculture'}</span></p>
            </div>
          </div>

          <p className="text-lg text-neutral-600 leading-relaxed mb-8 italic">
            {product.description || 'Premium quality agricultural product, verified for organic standards and high yield. Sourced directly from local farmers to your doorstep.'}
          </p>

          <div className="mt-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest mb-1">Price per unit</p>
                <span className="text-4xl font-black text-primary-forest">₱{product.price?.toLocaleString() || '0.00'}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest mb-1">In Stock</p>
                <span className="text-xl font-bold text-neutral-700">{product.stockQuantity} Units</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center bg-primary-sage/20 rounded-2xl p-1 border border-primary-sage/40 w-full sm:w-auto">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-2xl font-black text-primary-forest hover:bg-white rounded-xl transition-all active:scale-95"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="w-12 text-center text-xl font-black text-primary-forest">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="w-12 h-12 flex items-center justify-center text-2xl font-black text-primary-forest hover:bg-white rounded-xl transition-all active:scale-95"
                  disabled={quantity >= product.stockQuantity}
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="btn-forest w-full !py-4 text-lg hover:shadow-2xl flex items-center justify-center gap-3 disabled:bg-neutral-200 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.11 4.63ac4.5 4.5 0 0 1-4.39 5.572H7.024a4.5 4.5 0 0 1-4.39-5.572l1.11-4.63m14.356 0a1.5 1.5 0 0 0-3.042-1.258m-9.064 0a1.5 1.5 0 0 0-3.042 1.258m9.064 0h-9.064" />
                </svg>
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-xs text-neutral-400 font-bold uppercase tracking-widest border-t border-neutral-100">
                <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Verified Origin
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 7-Day Guarantee
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}