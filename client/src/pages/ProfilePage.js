import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Profile from '../components/Profile';

export default function ProfilePage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('processing');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:3001/api/orders/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const body = await response.json();
        if (body.success) {
          setOrders(body.orders);
        }
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter(order => {
    const status = order.status?.toLowerCase();
    if (activeTab === 'processing') return status === 'pending';
    if (activeTab === 'bought') return status === 'approved';
    if (activeTab === 'declined') return status === 'declined';
    return false;
  });

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left: Profile Side */}
        <div className="lg:col-span-1">
          <Profile user={user} />
          
          <div className="mt-8 bento-card bg-primary-sage/20 p-6 border-none">
             <h3 className="text-xs font-black text-primary-forest uppercase tracking-widest mb-4">Quick Tip</h3>
             <p className="text-xs text-primary-900/70 leading-relaxed italic">
                "Keep your orders updated to maintain a high trust rating in the HATID marketplace."
             </p>
          </div>
        </div>

        {/* Right: Order History Tabs */}
        <div className="lg:col-span-3">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-primary-900 tracking-tighter">My Activity</h1>
              <p className="text-neutral-500 mt-2 font-medium italic">Track your harvests and purchases.</p>
            </div>
            
            <div className="flex bg-white p-1 rounded-2xl shadow-soft border border-neutral-100">
              {['processing', 'bought', 'declined'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${
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

          {loading ? (
            <div className="flex justify-center py-20 animate-pulse text-primary-forest font-bold uppercase tracking-widest">Retrieving History...</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-[32px] border-2 border-dashed border-neutral-200 p-20 text-center">
                  <span className="text-5xl mb-4 block">📦</span>
                  <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs">No entries found for {activeTab}</p>
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div key={order._id} className="bg-white rounded-[32px] shadow-premium p-8 border border-neutral-100 hover:border-primary-sage/50 transition-all group">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                       <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-primary-sage/20 flex items-center justify-center text-xl">
                             🛍️
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Order ID</p>
                             <p className="text-sm font-black text-primary-900">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Total Value</p>
                          <p className="text-xl font-black text-primary-forest">₱{order.totalAmount?.toLocaleString()}</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                       {order.products?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-3 border-t border-neutral-50 group-hover:border-neutral-100 transition-colors">
                             <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-accent-olive"></span>
                                <span className="text-sm font-bold text-primary-900">{item.product?.name || 'Deleted Product'}</span>
                                <span className="text-xs text-neutral-400">x{item.quantity}</span>
                             </div>
                             <span className="text-xs font-bold text-neutral-500 italic">₱{item.product?.price?.toLocaleString()} ea</span>
                          </div>
                       ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                       <span>Placed on {new Date(order.orderDate).toLocaleDateString()}</span>
                       <span className={`px-4 py-1.5 rounded-full border ${
                          activeTab === 'processing' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                          activeTab === 'bought' ? 'bg-green-50 text-green-600 border-green-100' :
                          'bg-red-50 text-red-600 border-red-100'
                       }`}>
                          {activeTab}
                       </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
