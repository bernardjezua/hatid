import React, { useState, useEffect } from 'react';
import AdminOrders from '../components/AdminOrders';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const [analyticsRes, usersRes] = await Promise.all([
          fetch('http://127.0.0.1:3001/api/admin/analytics', { headers }),
          fetch('http://127.0.0.1:3001/api/admin/users', { headers })
        ]);

        const analyticsData = await analyticsRes.json();
        const usersData = await usersRes.json();

        if (analyticsData.success) setAnalytics(analyticsData.analytics);
        if (usersData.success) setUsers(usersData.users);
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-primary-900 tracking-tighter">Control Center</h1>
            <p className="text-neutral-500 mt-2 font-medium italic">Production Admin: Root Access Verified</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-soft border border-neutral-100">
            {['analytics', 'orders', 'community'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all uppercase tracking-widest ${
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

            {activeTab === 'community' && (
              <div className="bg-white rounded-[32px] shadow-premium p-8 border border-neutral-100 overflow-hidden">
                <h2 className="text-2xl font-black text-primary-forest mb-8">Registered Members</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-neutral-100 pb-4">
                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Name</th>
                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Email</th>
                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Role</th>
                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {users.map(u => (
                        <tr key={u._id} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="py-6 font-bold text-primary-900">{u.firstName} {u.lastName}</td>
                          <td className="py-6 text-neutral-500">{u.email}</td>
                          <td className="py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                              u.role === 'admin' ? 'bg-accent-olive/20 text-accent-olive' : 'bg-primary-sage/20 text-primary-forest'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-6">
                            <span className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                              Verified
                            </span>
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
