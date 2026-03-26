import React, { useState, useEffect } from 'react';
import AdminOrders from '../components/AdminOrders';
import AdminInventory from '../components/AdminInventory';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast, showConfirm } = useUI();
  const { user, checkLoginStatus } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const [analyticsRes, usersRes, productsRes] = await Promise.all([
          fetch('http://127.0.0.1:3001/api/admin/analytics', { headers }),
          fetch('http://127.0.0.1:3001/api/admin/users', { headers }),
          fetch('http://127.0.0.1:3001/api/products')
        ]);

        const analyticsData = await analyticsRes.json();
        const usersData = await usersRes.json();
        const productsData = await productsRes.json();

        if (analyticsData.success) setAnalytics(analyticsData.analytics);
        if (usersData.success) setUsers(usersData.users);
        if (productsData.success) setProducts(productsData.products);
      } catch (err) {
        showToast("Sync Failure: Database unreachable", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-primary-900 tracking-tighter">Control Center</h1>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-soft border border-neutral-100 flex-wrap">
            {['analytics', 'inventory', 'orders', 'community'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${
                  activeTab === tab 
                    ? 'bg-primary-forest text-white shadow-lg' 
                    : 'text-neutral-400 hover:text-primary-forest'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Global Summary Bar */}
        {!loading && analytics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm flex items-center gap-5">
                <div className="h-14 w-14 bg-primary-sage/10 rounded-2xl flex items-center justify-center text-2xl">📦</div>
                <div>
                   <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Total Catalog</p>
                   <p className="text-2xl font-black text-primary-900">{products.length} Items</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm flex items-center gap-5">
                <div className="h-14 w-14 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl">⏳</div>
                <div>
                   <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Pending Work</p>
                   <p className="text-2xl font-black text-orange-600">{analytics.pendingOrders} Approvals</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm flex items-center gap-5">
                <div className="h-14 w-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl">💰</div>
                <div>
                   <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Gross Revenue</p>
                   <p className="text-2xl font-black text-green-600">₱{analytics.totalIncome.toLocaleString()}</p>
                </div>
             </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20 animate-pulse text-primary-forest font-bold uppercase tracking-widest">Initializing Admin Services...</div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'analytics' && analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bento-card bg-primary-forest text-white p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-sage mb-2">Total Income</p>
                  <p className="text-4xl font-black">₱{analytics.totalIncome.toLocaleString()}</p>
                </div>
                <div className="bento-card p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Order Volume</p>
                  <p className="text-4xl font-black text-primary-900">{analytics.orderVolume}</p>
                </div>
                <div className="bento-card p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">Pending</p>
                  <p className="text-4xl font-black text-primary-900">{analytics.pendingOrders}</p>
                </div>
                <div className="bento-card border-accent-olive border-2 p-8">
                   <p className="text-xs font-bold uppercase tracking-widest text-accent-olive mb-2">Approved</p>
                   <p className="text-4xl font-black text-primary-900">{analytics.approvedOrders}</p>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-[32px] shadow-premium p-8 border border-neutral-100">
                <h2 className="text-2xl font-black text-primary-forest mb-8">Purchase Approvals</h2>
                <AdminOrders />
              </div>
            )}

            {activeTab === 'inventory' && (
               <div className="bg-white rounded-[32px] shadow-premium p-8 border border-neutral-100">
                 <AdminInventory />
               </div>
            )}

            {activeTab === 'community' && (
              <div className="bg-white rounded-[32px] shadow-premium p-8 border border-neutral-100 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-primary-forest">Registered Members</h2>
                    <span className="px-4 py-1.5 bg-neutral-50 rounded-full border border-neutral-100 text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
                        {users.length} Active Accounts
                    </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-neutral-100 pb-4">
                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Name</th>
                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Email</th>
                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Wallet Balance</th>
                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {users.map(u => (
                        <tr key={u._id} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="py-6 font-bold text-primary-900">{u.firstName} {u.lastName}</td>
                          <td className="py-6 text-neutral-500 text-sm font-medium">{u.email}</td>
                          <td className="py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${
                              u.role === 'admin' ? 'bg-primary-forest text-white' : 'bg-primary-sage/20 text-primary-forest'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-6">
                             <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-neutral-100 rounded-lg px-2 py-1">
                                   <span className="text-[10px] font-bold text-primary-forest">₱</span>
                                   <input 
                                      type="number" 
                                      id={`balance-${u._id}`}
                                      className="w-20 bg-transparent border-none p-0 text-xs font-bold text-primary-900 focus:ring-0"
                                      defaultValue={u.walletBalance}
                                   />
                                </div>
                                <button 
                                   onClick={async () => {
                                      const input = document.getElementById(`balance-${u._id}`);
                                      const newBalance = parseFloat(input.value);
                                      if (isNaN(newBalance) || newBalance < 0) {
                                         showToast("Please enter a valid amount", "error");
                                         return;
                                      }

                                      const token = localStorage.getItem('token');
                                      try {
                                         const res = await fetch(`http://127.0.0.1:3001/api/admin/users/${u._id}/wallet`, {
                                            method: 'PATCH',
                                            headers: { 
                                               'Content-Type': 'application/json',
                                               'Authorization': `Bearer ${token}`
                                            },
                                            body: JSON.stringify({ balance: newBalance })
                                         });
                                         const data = await res.json();
                                         if (data.success) {
                                            showToast(`${u.firstName}'s balance updated!`, "success");
                                            setUsers(prev => prev.map(usr => usr._id === u._id ? { ...usr, walletBalance: newBalance } : usr));
                                            
                                            // If updating self, refresh global auth state
                                            if (user && user._id === u._id) {
                                               checkLoginStatus();
                                            }
                                         }
                                      } catch (err) {
                                         showToast("Update failed", "error");
                                      }
                                   }}
                                   className="p-1.5 bg-primary-sage/20 text-primary-forest rounded-lg hover:bg-primary-forest hover:text-white transition-all shadow-sm group"
                                   title="Save Balance"
                                >
                                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                </button>
                             </div>
                          </td>
                          <td className="py-6 text-right">
                             <button 
                                onClick={async () => {
                                   const newRole = u.role === 'admin' ? 'customer' : 'admin';
                                   const confirmed = await showConfirm({
                                       title: `Promote to Admin?`,
                                       message: `Change ${u.firstName}'s role to ${newRole.toUpperCase()}?`
                                   });
                                   if (!confirmed) return;
                                   
                                   const token = localStorage.getItem('token');
                                   try {
                                       const res = await fetch(`http://127.0.0.1:3001/api/admin/users/${u._id}/role`, {
                                           method: 'PATCH',
                                           headers: { 
                                               'Content-Type': 'application/json',
                                               'Authorization': `Bearer ${token}`
                                           },
                                           body: JSON.stringify({ role: newRole })
                                       });
                                       const data = await res.json();
                                       if (data.success) {
                                           showToast(`Role updated to ${newRole}`, "success");
                                           setUsers(prev => prev.map(user => user._id === u._id ? { ...user, role: newRole } : user));
                                       }
                                   } catch (err) {
                                       showToast("Access Denied or Connection Error", "error");
                                   }
                                }}
                                className={`text-[10px] font-black uppercase tracking-widest p-2 rounded-lg transition-all ${
                                    u.role === 'admin' ? 'text-neutral-300 hover:text-red-500' : 'text-primary-forest hover:bg-primary-sage/10'
                                }`}
                                title="Change User Rights"
                             >
                                {u.role === 'admin' ? 'Revoke' : 'Promote'}
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
