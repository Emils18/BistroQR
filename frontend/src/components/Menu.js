// frontend/src/components/Menu.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    axios.get(`${API_BASE}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('The server is currently unreachable. Please verify if your database connection is active.');
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <div className="space-y-6 anim-fade-in">
        <div className="h-10 w-2/3 skeleton rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="h-48 glass-card rounded-[32px] p-6 space-y-4">
              <div className="h-6 w-1/2 skeleton rounded-full" />
              <div className="h-4 w-5/6 skeleton rounded-full" />
              <div className="h-10 w-1/3 skeleton pt-4 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-[32px] p-8 text-center max-w-lg mx-auto border-red-200/50">
        <span className="text-3xl">⚠️</span>
        <h3 className="text-stone-900 font-extrabold text-lg mt-3">Connection Problem</h3>
        <p className="text-stone-500 text-sm mt-1">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-ghost-fire py-2 px-5 text-xs font-bold mt-4"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Category Pills Navigation (Rounded-Full) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar anim-fade-in">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`pill px-4 py-2 border border-stone-200/80 bg-white rounded-full text-xs font-bold text-stone-600 hover:border-stone-400 ${
              activeCategory === category ? 'pill-active' : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of Food Cards with category remount key trigger */}
      <div 
        key={activeCategory} // Force React to trigger synchronized entrance animation on tab shifts
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="glass-card card-interactive rounded-[32px] p-6 flex flex-col justify-between h-56 anim-fade-in-up"
          >
            <div>
              <div className="flex justify-between items-start gap-2">
                <span className="bg-orange-50 text-orange-700 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full border border-orange-100">
                  {product.category}
                </span>
                <span className="text-sm font-black text-stone-800">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-stone-900 mt-2">
                {product.name}
              </h3>
              
              <p className="text-xs text-stone-500 mt-2 line-clamp-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-bold">Item #{product.id}</span>
              <button
                onClick={() => addToCart(product)}
                className="btn-fire py-1.5 px-4 text-xs"
              >
                Add Selection ＋
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;