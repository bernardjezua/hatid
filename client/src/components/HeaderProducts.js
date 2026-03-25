import React, { useState } from 'react';
import dropbutton from "../images/blackdropbutton.png";

export default function HeaderProducts({ productType, onSearch, onSort }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState("Name");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <header className="bg-white/70 backdrop-blur-xl border border-white/40 mb-10 mt-6 rounded-[32px] overflow-hidden mx-4 md:mx-0 shadow-premium transition-all">
            <div className="py-6 px-8 flex items-center justify-center max-w-5xl mx-auto">
                <div className="w-full flex items-center bg-neutral-50/80 rounded-2xl px-6 border border-neutral-200 focus-within:border-primary-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-600/10 transition-all duration-300 group shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-neutral-400 group-focus-within:text-primary-600 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder={`Search for products in ${productType}...`}
                        className="bg-transparent border-none focus:ring-0 w-full h-14 text-primary-950 font-bold placeholder:text-neutral-400 placeholder:font-medium tracking-tight px-4"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest hidden sm:block">Filter Results</span>
                    </div>
                </div>
            </div>
        </header>
    );
}