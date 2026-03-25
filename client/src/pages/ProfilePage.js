import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import Profile from '../components/Profile';

export default function ProfilePage() {
  const { user, checkLoginStatus } = useAuth();
  const { showConfirm, showToast } = useUI();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('processing');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    avatar: ''
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ')[1] || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

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

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://127.0.0.1:3001/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast("Profile updated successfully!", "success");
        setShowEditModal(false);
        checkLoginStatus();
      } else {
        showToast(data.message || "Failed to update profile", "error");
      }
    } catch (err) {
      showToast("Update failed: Network error", "error");
    }
  };

  const handleMarkReceived = async (orderId) => {
    const confirmed = await showConfirm({
      title: "Confirm Delivery",
      message: "Are you sure you have received this order? Note: Refunds will not be allowed once marked as received.",
      confirmText: "Yes, Received",
      cancelText: "Not yet"
    });

    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:3001/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: 'received' })
      });
      const body = await response.json();
      if (body.success) {
        showToast("Order marked as received! Thank you for supporting our farmers.", "success");
        fetchOrders();
        if (checkLoginStatus) checkLoginStatus();
      } else {
        showToast(body.message || "Failed to update status", "error");
      }
    } catch (err) {
      showToast("Sync Failure: Database unreachable", "error");
    }
  };

  const filteredOrders = orders.filter(order => {
    const status = order.status?.toLowerCase();
    if (activeTab === 'my admin history') return order.approvedBy?._id === user?._id;
    if (activeTab === 'processing') return status === 'pending';
    if (activeTab === 'approved') return status === 'approved';
    if (activeTab === 'received') return status === 'received';
    if (activeTab === 'declined') return status === 'declined';
    return false;
  });

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left: Profile Side */}
        <div className="lg:col-span-1">
          <Profile user={user} />
          
          <button 
            onClick={() => setShowEditModal(true)}
            className="w-full mt-4 py-3 bg-white border border-neutral-200 text-primary-forest text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-neutral-50 transition-all shadow-sm"
          >
            Edit Profile
          </button>

          <div className="mt-8 bento-card bg-primary-sage/20 p-6 border-none">
             <h3 className="text-xs font-black text-primary-forest uppercase tracking-widest mb-4">Quick Tip</h3>
             <p className="text-xs text-primary-900/70 leading-relaxed italic">
                "Confirming receipt of your items helps our community grow and ensures farmers get paid on time."
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
            
            <div className="flex bg-white p-1 rounded-2xl shadow-soft border border-neutral-100 flex-wrap overflow-x-auto">
              {(user?.role === 'admin' ? ['processing', 'approved', 'received', 'declined', 'my admin history'] : ['processing', 'approved', 'received', 'declined']).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 md:px-8 py-2.5 rounded-xl text-[10px] md:text-xs font-bold transition-all uppercase tracking-widest whitespace-nowrap ${
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
                       <div className="text-right flex items-center gap-6">
                           <div>
                              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Total Value</p>
                              <p className="text-xl font-black text-primary-forest">₱{order.totalAmount?.toLocaleString()}</p>
                           </div>
                           {order.status?.toLowerCase() === 'approved' && (
                              <button 
                                onClick={() => handleMarkReceived(order._id)}
                                className="px-4 py-2 bg-primary-forest text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
                              >
                                Confirm Receipt
                              </button>
                           )}
                       </div>
                    </div>

                    <div className="space-y-4">
                       {order.products?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-3 border-t border-neutral-50 group-hover:border-neutral-100 transition-colors">
                             <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-accent-olive"></span>
                                <span className="text-sm font-bold text-primary-900">{item.name || item.product?.name || 'Item Information'}</span>
                                <span className="text-xs text-neutral-400">x{item.quantity}</span>
                             </div>
                             <span className="text-xs font-bold text-neutral-500 italic">₱{(item.price || item.product?.price)?.toLocaleString() || 0} ea</span>
                          </div>
                       ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                       <span>Placed on {new Date(order.orderDate).toLocaleDateString()}</span>
                       <span className={`px-4 py-1.5 rounded-full border ${
                          activeTab === 'processing' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                          activeTab === 'approved' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          activeTab === 'received' ? 'bg-green-50 text-green-600 border-green-100' :
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

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-md" onClick={() => setShowEditModal(false)}></div>
          <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8">
               <h2 className="text-2xl font-black text-primary-900 tracking-tight mb-2">Edit My Profile</h2>
               <p className="text-neutral-500 text-sm font-medium mb-8">Update your identity and profile picture.</p>
               
               <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">First Name</label>
                       <input 
                         type="text" 
                         value={editForm.firstName}
                         onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                         className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm font-bold text-primary-900 focus:ring-2 focus:ring-primary-sage transition-all"
                         placeholder="First Name"
                         required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Last Name</label>
                       <input 
                         type="text" 
                         value={editForm.lastName}
                         onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                         className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm font-bold text-primary-900 focus:ring-2 focus:ring-primary-sage transition-all"
                         placeholder="Last Name"
                         required
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Avatar Image URL</label>
                     <input 
                       type="url" 
                       value={editForm.avatar}
                       onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                       className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm font-bold text-primary-900 focus:ring-2 focus:ring-primary-sage transition-all"
                       placeholder="https://images.unsplash.com/..."
                     />
                     <p className="text-[9px] text-neutral-400 ml-1">Paste an image URL to update your profile.</p>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                     <button 
                       type="button"
                       onClick={() => setShowEditModal(false)}
                       className="flex-1 py-4 bg-neutral-100 text-neutral-500 text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-neutral-200 transition-all"
                     >
                       Cancel
                     </button>
                     <button 
                       type="submit"
                       className="flex-1 py-4 bg-primary-forest text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-primary-sage/40 transition-all"
                     >
                       Save Changes
                     </button>
                  </div>
               </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
