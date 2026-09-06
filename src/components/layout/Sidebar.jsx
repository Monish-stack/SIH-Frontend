import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  TrendingUp, 
  Settings, 
  HelpCircle,
  X
} from 'lucide-react';

export const Sidebar = ({ onClose, isMobile = false }) => {
  const location = useLocation();

  const mainNavItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      alternatePaths: ['/'],
      icon: LayoutDashboard,
    },
    {
      name: 'New Screening',
      path: '/new-screening',
      alternatePaths: [
        '/new-screening/left-eye', 
        '/new-screening/left-eye/analyzing', 
        '/new-screening/right-eye', 
        '/new-screening/results'
      ],
      icon: PlusCircle,
    },
    {
      name: 'Patients',
      path: '/patients',
      alternatePaths: ['/patients/'],
      icon: Users,
    },
    {
      name: 'Analytics',
      path: '/analytics',
      alternatePaths: [],
      icon: TrendingUp,
    },
  ];

  const bottomNavItems = [
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
    },
    {
      name: 'Help',
      path: '/help',
      icon: HelpCircle,
    },
  ];

  const isItemActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.alternatePaths && item.alternatePaths.some(p => location.pathname === p || (p !== '/' && location.pathname.startsWith(p)))) {
      return true;
    }
    return false;
  };

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className={`flex flex-col justify-between h-full text-white select-none ${
      isMobile ? 'p-6' : 'p-5'
    }`}>
      <div className="flex flex-col space-y-2">
        {/* Mobile Drawer Header with Close Button */}
        {isMobile && (
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0284c7] flex items-center justify-center font-bold text-white shadow-xs">
                RS
              </div>
              <span className="font-bold text-base tracking-tight text-white">
                RetinaScan AI
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Main Navigation links */}
        <nav className="space-y-2 pt-1">
          {mainNavItems.map((item) => {
            const active = isItemActive(item);
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  active
                    ? 'bg-[#0284c7] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Divider line */}
        <div className="pt-4 px-1">
          <div className="h-[1px] bg-white/15 w-full" />
        </div>
      </div>

      {/* Bottom Nav Items */}
      <div className="space-y-1.5 pb-2">
        {bottomNavItems.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                active
                  ? 'bg-[#0284c7] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
