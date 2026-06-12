// frontend/src/components/Cart.js

import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const Cart = () => {
  const { 
    cart, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    totalAmount, 
    totalItemsCount,
    isCartOpen,
    setIsCartOpen 
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    if (totalItemsCount === 0) return;
    setIsBumping(true);
    const timer = setTimeout(() => {
      setIsBumping(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [totalItemsCount]);

  const simulatePayment = async (status) => {
    if (status === 'failed') {
      alert('❌ Sandbox Transaction Denied. Try again.');
      setShowPaymentModal(false);
      return;
    }

    setIsSubmitting(true);
    setShowPaymentModal(false);

    const payload = {
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: parseFloat(totalAmount.toFixed(2)),
      payment_status: 'paid',
      customer_name: customerName.trim() || 'Guest'
    };

    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      // CORRECTED: Uses API_BASE instead of hardcoded localhost
      await axios.post(`${API_BASE}/api/orders`, payload);
      alert(`🎉 Receipt Generated for ${payload.customer_name}!`);
      clearCart();
      setCustomerName('');
      setIsCartOpen(false);
    } catch (err) {
      console.error(err);
      alert('❌ Error synchronizing order with API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // RENDER PORTION 1: Closed FAB
  if (!isCartOpen) {
    return (
      <button
        onClick={() => setIsCartOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-2xl active:scale-95 transition-all duration-200 group border border-white/20 ${
          isBumping ? 'anim-pop-pulse shadow-orange-500/40 ring-4 ring-orange-500/20' : 'hover:scale-110'
        }`}
        title="Open Basket"
      >
        <span className="absolute inset-0 rounded-full bg-orange-500/10 animate-ping" />
        <span className="text-2xl relative z-10">🛍️</span>
        {totalItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-orange-600 font-black text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-orange-100">
            {totalItemsCount}
          </span>
        )}
      </button>
    );
  }

  // RENDER PORTION 2: Drawer Open
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white/95 backdrop-blur-md shadow-2xl flex flex-col border-l border-stone-200/50 anim-slide-drawer">
          <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <h2 className="text-base font-extrabold text-stone-900">Your Selection</h2>
              <span className="bg-stone-100 text-stone-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-stone-200">
                {totalItemsCount} items
              </span>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="qty-btn" title="Close Panel">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                <span className="text-4xl anim-float inline-block">🍽️</span>
                <h4 className="font-bold text-stone-700 text-sm">Empty plate</h4>
                <p className="text-xs text-stone-400 max-w-xs">Select food items on the menu catalog to fill up your cart drawer.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-3 flex justify-between items-center gap-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-stone-800 leading-tight">{item.name}</h4>
                    <span className="text-[10px] text-stone-400 font-bold mt-0.5 block">
                      ${parseFloat(item.price).toFixed(2)} each
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg p-0.5">
                      <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">−</button>
                      <span className="w-6 text-center text-xs font-bold text-stone-800">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">＋</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="qty-btn qty-btn-del" title="Remove">✕</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-stone-100 px-6 py-6 space-y-4 bg-stone-50/50">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-stone-500 uppercase tracking-wider block">Customer Name</label>
                <input
                  type="text"
                  placeholder="Guest User"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs p-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 font-medium"
                />
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-stone-500 font-bold">Total Bill:</span>
                <span className="text-xl font-black text-stone-900">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={clearCart} className="btn-ghost-fire py-3 text-xs font-bold">Clear All</button>
                <button onClick={() => setShowPaymentModal(true)} disabled={isSubmitting} className="btn-fire py-3 text-xs">
                  {isSubmitting ? 'Sending...' : 'Check Out 💳'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center z-[60] p-4 anim-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-stone-100 text-center anim-scale-bounce">
            <span className="text-3xl">🛡️</span>
            <h3 className="text-base font-extrabold mt-2 text-stone-900">Sandbox Terminal</h3>
            <p className="text-stone-400 text-[11px] mt-1 mb-5">This triggers a sandbox transaction for development testing.</p>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => simulatePayment('success')} className="btn-fire py-2 px-4 text-xs">Approve</button>
              <button onClick={() => simulatePayment('failed')} className="btn-ghost-fire py-2 px-4 text-xs font-bold">Deny</button>
            </div>
            <button onClick={() => setShowPaymentModal(false)} className="text-stone-400 hover:text-stone-600 text-[10px] font-bold mt-4 block mx-auto underline">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;