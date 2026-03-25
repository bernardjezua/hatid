import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../context/UIContext';

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useUI();

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/orders", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const body = await response.json();
      
      if (body.success) {
        setOrders(body.orders);
      } else {
        console.error("Failed to fetch orders.");
        if(response.status === 401 || response.status === 403) {
            navigate('/login');
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const body = await response.json();
      
      if (body.success) {
        showToast(`Order ${newStatus}`, "success");
        fetchOrders(); // Refresh table
      } else {
        showToast(body.message || "Failed to update order status", "error");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      showToast("An unexpected error occurred.", "error");
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    switch(s) {
        case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'received': return 'bg-green-100 text-green-800 border-green-200';
        case 'declined': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) return <div className="p-8 text-center text-neutral-500">Loading orders...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
        <h2 className="text-xl font-bold text-primary-900">Recent Orders</h2>
        <span className="bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-full">
            {orders.length} Total
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Total Amount</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-center">Admin Reviewer</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-neutral-500">No orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-neutral-900 h-full align-middle">
                    <span className="font-mono text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-600 border border-neutral-200">
                        ...{order._id.substring(order._id.length - 6)}
                    </span>
                  </td>
                  <td className="p-4 h-full align-middle">
                    <div className="text-sm font-medium text-neutral-900">
                        {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest User'}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-primary-700 h-full align-middle">
                    ₱{order.totalAmount?.toLocaleString() || '0.00'}
                  </td>
                  <td className="p-4 h-full align-middle">
                    <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                  </td>
                  <td className="p-4 h-full align-middle text-center">
                    {order.approvedBy ? (
                        <span className="text-[10px] font-black text-primary-forest bg-primary-sage/20 px-2 py-1 rounded-md uppercase tracking-tighter shadow-sm border border-primary-sage/30">
                            {order.approvedBy.firstName}
                        </span>
                    ) : (
                        <span className="text-[10px] font-bold text-neutral-300 uppercase italic">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4 text-right h-full align-middle">
                    <div className="flex items-center justify-end gap-2 text-white">
                        {order.status?.toLowerCase() === 'pending' ? (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(order._id, 'approved')}
                              className="px-3 py-1.5 bg-accent-olive text-[10px] font-black uppercase rounded-lg shadow-sm hover:scale-105 transition-all"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(order._id, 'declined')}
                              className="px-3 py-1.5 bg-red-500 text-[10px] font-black uppercase rounded-lg shadow-sm hover:scale-105 transition-all"
                            >
                              Decline
                            </button>
                          </>
                        ) : order.status?.toLowerCase() !== 'received' ? (
                          <button 
                            onClick={() => {
                              const nextStatus = order.status?.toLowerCase() === 'approved' ? 'declined' : 'approved';
                              handleUpdateStatus(order._id, nextStatus);
                            }}
                            className="px-4 py-1.5 bg-primary-forest text-[10px] font-black uppercase rounded-lg shadow-sm hover:scale-105 transition-all flex items-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            Change Status
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-neutral-300 uppercase italic px-4">Locked</span>
                        )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
