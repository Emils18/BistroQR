// frontend/src/components/Admin.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, targetStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/payment`, {
        payment_status: targetStatus
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const parseItems = (items) => {
    if (Array.isArray(items)) return items;
    if (typeof items === 'string') {
      try {
        return JSON.parse(items);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  // ═══════════════════════════════════════════════════════
  // ANALYTICS COMPUTATIONS (STATS CARDS DATA ENHANCEMENT)
  // ═══════════════════════════════════════════════════════
  const paidOrders = orders.filter(o => o.payment_status === 'paid');
  const pendingOrders = orders.filter(o => o.payment_status === 'pending');
  const grossRevenue = paidOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 anim-fade-in">
      
      {/* Header Titles */}
      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">Active Invoices</h1>
        <p className="text-stone-500 text-xs mt-0.5">Control live order queue and update transaction states.</p>
      </div>

      {/* Analytics Stats Dashboard Panel (Upgraded View) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Metric Card 1: Revenue */}
        <div className="glass-card rounded-2xl p-5 border border-stone-200/80 hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Gross Income</span>
            <span className="p-2 bg-emerald-50 rounded-xl text-emerald-600 text-xs">💰</span>
          </div>
          <p className="text-2xl font-black text-stone-900 mt-2">
            ${grossRevenue.toFixed(2)}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">From {paidOrders.length} settled receipts</span>
        </div>

        {/* Metric Card 2: Processes */}
        <div className="glass-card rounded-2xl p-5 border border-stone-200/80 hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Processed Orders</span>
            <span className="p-2 bg-orange-50 rounded-xl text-orange-600 text-xs">📋</span>
          </div>
          <p className="text-2xl font-black text-stone-900 mt-2">
            {orders.length}
          </p>
          <span className="text-[10px] text-stone-400 font-bold mt-1 block">Accumulated database records</span>
        </div>

        {/* Metric Card 3: Pending */}
        <div className="glass-card rounded-2xl p-5 border border-stone-200/80 hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Pending Action</span>
            <span className="p-2 bg-amber-50 rounded-xl text-amber-600 text-xs">⏳</span>
          </div>
          <p className="text-2xl font-black text-stone-900 mt-2">
            {pendingOrders.length}
          </p>
          <span className="text-[10px] text-amber-600 font-bold mt-1 block">Requires manual execution review</span>
        </div>

      </div>

      {/* Main Order logs Table */}
      <div className="glass-card rounded-2xl shadow-sm overflow-hidden border border-stone-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200 text-xs text-left">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider">Selections</th>
                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider">Invoice Total</th>
                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider">Payment State</th>
                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider">Update Status</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-stone-100 bg-white">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-stone-400 font-medium">
                    No active transaction logs on record.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const itemsList = parseItems(order.items);
                  return (
                    <tr key={order.id} className="admin-row transition-colors duration-150">
                      <td className="px-6 py-4 font-mono text-stone-400 font-bold">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-stone-800">
                        {order.customer_name}
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {itemsList.map((item, idx) => (
                            <span key={idx} className="bg-stone-50 border border-stone-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-stone-600">
                              {item.name} <strong className="text-orange-600">×{item.quantity}</strong>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-black text-stone-900">
                        ${parseFloat(order.total).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge ${
                          order.payment_status === 'paid' ? 'badge-ready' :
                          order.payment_status === 'failed' ? 'badge-cancelled' : 'badge-pending'
                        }`}>
                          <span className={`badge-dot ${
                            order.payment_status === 'paid' ? 'dot-ready' :
                            order.payment_status === 'failed' ? 'dot-cancelled' : 'dot-pending'
                          }`} />
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.payment_status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="select-custom text-[10px] font-bold text-stone-600 bg-white border border-stone-200 rounded-lg py-1 px-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="failed">Failed</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;