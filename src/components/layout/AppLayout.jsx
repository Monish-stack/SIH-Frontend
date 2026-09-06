import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Eye } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Toast } from '../common/Toast';

export const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f8f7ff] text-slate-800 font-sans selection:bg-[#0284c7] selection:text-white antialiased">
      {/* Mobile Top Header (Visible only on < lg) */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[#06073b] text-white shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0284c7] flex items-center justify-center text-white shadow-xs">
              <Eye className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
              RetinaScan AI
            </span>
          </div>
        </div>

        {/* Mobile User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-b from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/20 shadow-xs">
          NR
        </div>
      </header>

      {/* Mobile Navigation Drawer Backdrop & Sheet (Visible only on < lg when open) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer Container */}
          <div className="relative w-[270px] max-w-[80vw] h-full bg-[#06073b] shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            <Sidebar onClose={() => setMobileMenuOpen(false)} isMobile={true} />
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar (Visible only on >= lg) */}
      <aside className="hidden lg:flex w-[230px] h-[calc(100vh-28px)] sticky top-3.5 my-3.5 ml-4 flex-shrink-0 bg-[#06073b] rounded-[32px] shadow-2xl z-30 overflow-hidden">
        <Sidebar isMobile={false} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full p-3.5 sm:p-5 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-[1440px] mx-auto min-w-0 w-full">
          <Outlet />
        </div>
      </main>

      {/* Toast Notification Container */}
      <Toast />
    </div>
  );
};
