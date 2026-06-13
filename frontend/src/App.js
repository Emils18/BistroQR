// frontend/src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Menu from './components/Menu';
import Admin from './components/Admin';
import QRPage from './components/QRPage';
import Cart from './components/Cart';

function NavigationLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md shadow-orange-500/20 scale-105'
            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60 hover:scale-102'
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
        {/* Global body canvas */}
        <div className="min-h-screen mesh-bg text-stone-800 flex flex-col font-sans relative pb-24 sm:pb-0">
          
          {/* ═══════════════════════════════════════════════════════
             1. DESKTOP HEADER (Floating top capsule - hidden on mobile)
             ═══════════════════════════════════════════════════════ */}
          <div className="hidden sm:block sticky top-0 z-40 px-4 pt-6">
            <header className="glass-warm max-w-4xl mx-auto w-full rounded-full shadow-lg shadow-stone-900/5 px-6 py-4 flex items-center justify-between gap-4">
              
              {/* Interactive Shimmer Logo Wrapper */}
              <div className="group flex flex-col cursor-pointer">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 leading-none transition-all duration-300 group-hover:tracking-wider">
                  Bistro<span className="logo-shimmer font-black">QR</span>
                </span>
                <span className="text-[8px] text-stone-400 font-extrabold uppercase tracking-widest mt-1.5 transition-all duration-300 group-hover:text-stone-600">
                  Instant Ordering
                </span>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex items-center gap-1.5 bg-stone-100/80 p-1.5 rounded-full border border-stone-200/40">
                <NavigationLink to="/">Menu</NavigationLink>
                <NavigationLink to="/admin">Dashboard</NavigationLink>
                <NavigationLink to="/qr">QR Code</NavigationLink>
              </nav>
              
            </header>
          </div>

          {/* ═══════════════════════════════════════════════════════
             2. MOBILE HEADER (Compact layouts - hidden on desktop)
             ═══════════════════════════════════════════════════════ */}
          <div className="sm:hidden">
            
            {/* Top Compact Brand Badge */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-fit">
              <div className="glass-warm px-5 py-2.5 rounded-full shadow-md border border-stone-200/40 flex items-center justify-center">
                <span className="font-extrabold text-sm tracking-tight text-stone-900 leading-none">
                  Bistro<span className="logo-shimmer font-black">QR</span>
                </span>
              </div>
            </div>
            
            {/* Bottom Floating Navigation Tab Capsule */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xs">
              <nav className="glass rounded-full shadow-2xl px-2 py-1.5 flex items-center justify-around gap-1 border border-stone-200/50 h-14">
                <NavigationLink to="/">Menu</NavigationLink>
                <NavigationLink to="/admin">Dashboard</NavigationLink>
                <NavigationLink to="/qr">QR Code</NavigationLink>
              </nav>
            </div>

          </div>

          {/* Main Content Workspace (Added top padding on mobile for badge clearance) */}
          <main className="flex-grow max-w-4xl mx-auto w-full px-4 pt-20 sm:pt-8 py-8">
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/qr" element={<QRPage />} />
            </Routes>
          </main>

          {/* Floating Cart Trigger FAB */}
          <Cart />

          {/* Desktop Footer (Hidden on mobile for cleaner spacing) */}
          <footer className="hidden sm:block py-8 text-center text-xs text-stone-400 font-medium border-t border-stone-200/30 mt-12">
            <div className="max-w-4xl mx-auto px-4">
              <p>© {new Date().getFullYear()} BistroQR. All mock transactions run in a safe sandbox environment.</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;