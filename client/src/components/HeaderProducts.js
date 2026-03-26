import React, { useState } from 'react';

export default function HeaderProducts({ productType, onSearch, resultsCount, hideSearch = false }) {
  const [localTerm, setLocalTerm] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalTerm(val);
    if (onSearch) onSearch(val);
  };

  return (
    <div className="w-full py-4 mb-2">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
        
        {/* Simple & Intuitive Search Bar */}
        {!hideSearch && (
          <div className="w-full relative group shadow-premium rounded-[28px] overflow-hidden">
             <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 text-neutral-400 group-focus-within:text-primary-forest transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
             </div>
             <input
               type="text"
               placeholder={`Search for products in ${productType || 'Catalog'}...`}
               value={localTerm}
               onChange={handleChange}
               className="w-full pl-16 pr-8 py-5 bg-white border-2 border-transparent text-lg font-bold text-primary-900 placeholder:text-neutral-300 focus:outline-none focus:border-primary-forest/20 transition-all rounded-[28px]"
             />
             {localTerm && (
               <button 
                 onClick={() => { setLocalTerm(""); if(onSearch) onSearch(""); }}
                 className="absolute inset-y-0 right-0 pr-6 flex items-center text-neutral-300 hover:text-neutral-500 transition-colors"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                 </svg>
               </button>
             )}
          </div>
        )}

        {/* Simplified Status Info */}
        <div className="flex items-center gap-2 px-6 py-2 bg-primary-sage/10 rounded-full border border-primary-sage/20">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-forest opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-forest"></span>
            </span>
            <span className="text-[11px] font-black text-primary-forest uppercase tracking-[0.2em]">
              {resultsCount || 0} Products Found
            </span>
        </div>

      </div>
    </div>
  );
}