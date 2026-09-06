import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  TrendingUp, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

export const Sidebar = () => {
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

  return (
    <aside className="w-[230px] h-[calc(100vh-28px)] sticky top-3.5 my-3.5 ml-4 flex-shrink-0 bg-[#06073b] text-white rounded-[32px] p-5 flex flex-col justify-between shadow-2xl z-30 select-none">
      <div className="flex flex-col space-y-2">
        {/* Main Navigation links */}
        <nav className="space-y-2 pt-2">
          {mainNavItems.map((item) => {
            const active = isItemActive(item);
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
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
    </aside>
  );
};
