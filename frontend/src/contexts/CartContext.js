// frontend/src/contexts/CartContext.js

import React, { createContext, useState, useContext } from 'react';

// Create context store
const CartContext = createContext();

// Custom hook for consuming state variables
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
};

// Global Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Track drawer visibility state globally
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to basket and automatically slide open the drawer
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Smooth user experience: automatically pop open the cart drawer when an item is added
    setIsCartOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + change;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Sum total items in the basket
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Sum total invoice value
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        updateQuantity, 
        removeItem, 
        clearCart, 
        totalAmount,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};