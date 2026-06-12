// frontend/src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Menu from './components/Menu';
import Admin from './components/Admin';
import QRPage from './components/QRPage';
import Cart from './components/Cart'; // Now handles floating bubbles and drawers internally

function NavigationLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md shadow-orange-500/20'
            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* mesh-bg handles global canvas background */}
        <div className="min-h-screen mesh-bg text-stone-800 flex flex-col font-sans relative">
          
          {/* Top Glass Header */}
          <header className="glass-warm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
              
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-3xl anim-float inline-block">🍔</span>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 leading-none">
                    Bistro<span className="text-orange-600 font-black">QR</span>
                  </span>
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">
                    Instant Ordering
                  </span>
                </div>
              </div>
              
              <nav className="flex items-center gap-1.5 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200/50">
                <NavigationLink to="/">🍽️ Menu</NavigationLink>
                <NavigationLink to="/admin">📊 Admin</NavigationLink>
                <NavigationLink to="/qr">📱 QR Code</NavigationLink>
              </nav>
            </div>
          </header>

          {/* Main Workspace - Spanned full width on all views for cleaner layout symmetry */}
          <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/qr" element={<QRPage />} />
            </Routes>
          </main>

          {/* Mount the Global Cart at root so it floats correctly over all routes */}
          <Cart />

          <footer className="border-t border-stone-200/60 py-8 text-center text-xs text-stone-400 font-medium">
            <div className="max-w-7xl mx-auto px-4">
              <p>© {new Date().getFullYear()} BistroQR. All mock transactions run in a safe sandbox environment.</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;