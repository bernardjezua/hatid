import React, { useState, useEffect, useCallback } from 'react';
import { useUI } from '../context/UIContext';

export default function AdminInventory() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { showToast, showConfirm } = useUI();

    const [formData, setFormData] = useState({
        name: '',
        category: 'Seeds & Crops',
        price: '',
        stockQuantity: '',
        description: '',
        imageUrl: ''
    });

    const CATEGORIES = ['Seeds & Crops', 'Organic Fertilizers', 'Heavy Machinery', 'Livestock Feed', 'Fresh Produce'];

    // Filter & Sort State
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [sortType, setSortType] = useState("Name");

    // Derived State: Filtered & Sorted Products
    const filteredProducts = React.useMemo(() => {
        let result = [...products];

        // Search Filter
        if (searchTerm) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category Filter
        if (filterCategory !== "All") {
            result = result.filter(p => p.category === filterCategory);
        }

        // Sort Logic
        result.sort((a, b) => {
            if (sortType === "Price: Low to High") return a.price - b.price;
            if (sortType === "Price: High to Low") return b.price - a.price;
            if (sortType === "Stock: Low") return a.stockQuantity - b.stockQuantity;
            return a.name.localeCompare(b.name);
        });

        return result;
    }, [products, searchTerm, filterCategory, sortType]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:3001/api/products');
            const data = await res.json();
            if (data.success) setProducts(data.products);
        } catch (err) {
            showToast("Failed to fetch inventory", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = editingProduct 
            ? `http://127.0.0.1:3001/api/products/${editingProduct._id}`
            : 'http://127.0.0.1:3001/api/products';
        const method = editingProduct ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                showToast(editingProduct ? "Product Updated" : "Product Added", "success");
                setModalOpen(false);
                setEditingProduct(null);
                setFormData({ name: '', category: 'Seeds & Crops', price: '', stockQuantity: '', description: '', imageUrl: '' });
                fetchProducts();
            } else {
                showToast(data.message || "Action failed", "error");
            }
        } catch (err) {
            showToast("Network error", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirmed = await showConfirm({
            title: "Delete Product?",
            message: "This action cannot be undone. Root access required."
        });
        if (!confirmed) return;

        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://127.0.0.1:3001/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                showToast("Product Removed", "success");
                fetchProducts();
            }
        } catch (err) {
            showToast("Failed to delete", "error");
        }
    };

    const openEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stockQuantity: product.stockQuantity,
            description: product.description,
            imageUrl: product.imageUrl
        });
        setModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-xl font-black text-primary-900">Active Inventory</h3>
                <button
                    onClick={() => { setEditingProduct(null); setModalOpen(true); }}
                    className="w-full md:w-auto px-6 py-2 bg-primary-forest text-white rounded-xl font-bold text-sm shadow-lg hover:bg-primary-900 transition-all"
                >
                    + Add Product
                </button>
            </div>

            {/* Advanced Admin Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search product name or vendor..."
                        className="w-full pl-9 pr-4 py-2 bg-neutral-light border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary-sage transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-light border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary-sage outline-none"
                >
                    <option value="All">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-light border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary-sage outline-none"
                >
                    <option value="Name">Sort by Name</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Stock: Low">Stock: Low First</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-12 text-neutral-400 font-bold uppercase tracking-widest text-xs">Syncing Stock...</div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-neutral-100 bg-white">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-100">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Product</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Category</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Price</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Stock</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                            {filteredProducts.map(p => (
                                <tr key={p._id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={p.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-neutral-100" />
                                            <span className="font-bold text-primary-900">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-primary-sage/10 text-primary-forest rounded text-[10px] font-bold uppercase">
                                            {p.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-neutral-600">₱{p.price?.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`font-black ${p.stockQuantity < 10 ? 'text-red-500' : 'text-primary-900'}`}>
                                            {p.stockQuantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => openEdit(p)} className="p-2 text-primary-600 hover:bg-primary-sage/10 rounded-lg transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleDelete(p._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* CRUD Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-primary-forest/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] shadow-2xl p-8 max-w-lg w-full border border-white/20 animate-in zoom-in-95 duration-200">
                        <h3 className="text-2xl font-black text-primary-900 mb-6">
                            {editingProduct ? 'Update Product' : 'Add New Inventory Item'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-[10px] font-black uppercase text-neutral-400 mb-1 block">Full Name</label>
                                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-100 focus:bg-white outline-none font-bold" />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-black uppercase text-neutral-400 mb-1 block">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-100 focus:bg-white outline-none font-bold">
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-black uppercase text-neutral-400 mb-1 block">Price (₱)</label>
                                    <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-100 focus:bg-white outline-none font-bold" />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-black uppercase text-neutral-400 mb-1 block">Stock Level</label>
                                    <input type="number" required value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-100 focus:bg-white outline-none font-bold" />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-black uppercase text-neutral-400 mb-1 block">Image URL</label>
                                    <input required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-100 focus:bg-white outline-none font-bold" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-neutral-400 mb-1 block">Description</label>
                                <textarea rows="3" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-100 focus:bg-white outline-none font-bold"></textarea>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-6 py-3 rounded-2xl font-bold text-neutral-400 hover:text-neutral-600 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 px-6 py-3 bg-primary-forest text-white rounded-2xl font-bold shadow-lg shadow-primary-forest/20 hover:scale-[1.02] active:scale-95 transition-all">
                                    {editingProduct ? 'Save Changes' : 'Confirm Entry'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
