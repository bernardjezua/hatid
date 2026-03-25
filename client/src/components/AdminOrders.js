import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const response = await fetch(`http://127.0.0.1:3001/api/orders/${orderId}/status`, {
        method: "PATCH", // Production standard: PATCH for status updates
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const body = await response.json();
      
      if (body.success) {
        fetchOrders(); // Refresh table
      } else {
        alert(body.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("An unexpected error occurred.");
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    switch(s) {
        case 'approved': return 'bg-green-100 text-green-800 border-green-200';
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
                  <td className="p-4 text-right h-full align-middle">
                    {order.status?.toLowerCase() === 'pending' ? (
                        <div className="flex items-center justify-end gap-2 text-white">
                            <button 
                                onClick={() => handleUpdateStatus(order._id, 'approved')}
                                className="text-[10px] font-black uppercase bg-primary-forest hover:bg-green-700 px-4 py-2 rounded-xl transition-all shadow-sm"
                            >
                                Approve
                            </button>
                            <button 
                                onClick={() => handleUpdateStatus(order._id, 'declined')}
                                className="text-[10px] font-black uppercase bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition-all"
                            >
                                Decline
                            </button>
                        </div>
                    ) : (
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest italic">Archived</span>
                    )}
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
