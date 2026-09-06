import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Toast } from '../common/Toast';

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f7ff] text-slate-800 font-sans selection:bg-[#0284c7] selection:text-white antialiased">
      {/* Fixed dark navy sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-[1440px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Toast Notification Container */}
      <Toast />
    </div>
  );
};
