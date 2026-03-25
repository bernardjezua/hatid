import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

export default function CardMainPage({ products, cols = 4 }) {
  const { cart, addToCart, updateQuantity } = useAuth();
  const { showConfirm } = useUI();
  const [addingId, setAddingId] = useState(null);

  if (!products || products.length === 0) return null;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[cols] || 'md:grid-cols-4';


  const handleAdd = (product) => {
    setAddingId(product._id);
    addToCart(product);
    setTimeout(() => setAddingId(null), 1000);
  };

  return (
    <div className={`grid grid-cols-1 ${gridColsClass} gap-8 px-4`}>
      {products.map((product) => {
        const cartItem = cart.find(item => item._id === product._id);
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
          <div key={product._id} className="bg-white rounded-2xl border border-neutral-100 group flex flex-col h-full relative overflow-hidden transition-all hover:shadow-premium duration-300">
            {/* Minimal Image Container */}
            <Link to={`/products/${product.name.replace(/ /g, '-')}`} className="block relative aspect-[4/3] overflow-hidden">
               <img 
                 src={product.imageUrl} 
                 alt={product.name} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
               />
               <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full shadow-sm ${product.stockQuantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} title={product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}></span>
               </div>
            </Link>

            <div className="p-4 flex-1 flex flex-col">
               {/* Metadata Summary */}
               <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">{product.category}</span>
                  <span className="text-[10px] text-neutral-300">•</span>
                  <span className="text-[10px] font-medium text-neutral-400 capitalize">{product.vendor || 'HATID'}</span>
               </div>
               
               <Link to={`/products/${product.name.replace(/ /g, '-')}`}>
                  <h3 className="text-base font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {product.name}
                  </h3>
               </Link>
               
               <p className="text-xs text-neutral-500 line-clamp-2 mb-4 flex-1">
                 {product.description}
               </p>

               <div className="flex items-center justify-between pt-3 border-t border-neutral-50 mt-auto">
                 <span className="text-lg font-black text-primary-900">
                     ₱{product.price?.toLocaleString()}
                 </span>
                 
                 {quantity > 0 ? (
                    <div className="flex items-center bg-neutral-50 rounded-full border border-neutral-200 p-0.5">
                        <button 
                            onClick={async (e) => { 
                                e.preventDefault(); 
                                if (quantity === 1) {
                                    const confirmed = await showConfirm({
                                        title: "Remove from Cart?",
                                        message: `Are you sure you want to remove ${product.name} from your cart?`
                                    });
                                    if (confirmed) {
                                        updateQuantity(product._id, -1);
                                    }
                                } else {
                                    updateQuantity(product._id, -1);
                                }
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-neutral-500 transition-all active:scale-90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>
                        </button>
                        <span className="w-6 text-center font-bold text-neutral-700 text-xs">{quantity}</span>
                        <button 
                            onClick={(e) => { e.preventDefault(); updateQuantity(product._id, 1); }}
                            disabled={quantity >= product.stockQuantity}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-neutral-500 transition-all active:scale-90 disabled:opacity-30"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        </button>
                    </div>
                 ) : (
                    <button 
                        disabled={product.stockQuantity === 0} 
                        onClick={(e) => { e.preventDefault(); handleAdd(product); }}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs transition-all transform active:scale-95 disabled:opacity-30 ${
                            addingId === product._id 
                                ? 'bg-green-600 text-white' 
                                : 'bg-primary-900 text-white hover:bg-primary-forest shadow-sm'
                        }`}
                    >
                        {addingId === product._id ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        )}
                        {addingId === product._id ? 'Added' : 'Add'}
                    </button>
                 )}
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}