import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Plus } from 'lucide-react';

export const TopHeader = ({ searchQuery, setSearchQuery, onSearchSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-end gap-3">
      {/* Row 1: Search Patient input + Avatar */}
      <div className="flex items-center gap-3">
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient"
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && onSearchSubmit) {
                onSearchSubmit(searchQuery);
              }
            }}
            className="w-full pl-11 pr-4 py-2 text-xs bg-white border border-slate-200/90 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7] transition-all shadow-xs"
          />
        </div>

        {/* User Avatar Circle */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-sky-400 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-sm ring-2 ring-white flex-shrink-0">
          <span className="text-xs font-bold">NR</span>
        </div>
      </div>

      {/* Row 2: Today's Date button + + Start New Screening button */}
      <div className="flex items-center gap-3">
        {/* Today's Date Button */}
        <div className="flex items-center gap-2.5 px-4 py-2 bg-[#076694] text-white rounded-xl shadow-xs cursor-default">
          <Calendar className="w-4 h-4 text-sky-200" />
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[9px] uppercase tracking-wider font-bold text-sky-200">
              Today's Date
            </span>
            <span className="text-xs font-bold">Thu, 24 Oct 2024</span>
          </div>
        </div>

        {/* Start New Screening Button */}
        <button
          onClick={() => navigate('/new-screening')}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 text-[#090d2e] border border-slate-200/90 rounded-xl font-bold text-xs tracking-wide shadow-xs hover:shadow transition-all duration-150 active:scale-[0.98]"
        >
          <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-slate-600 text-xs leading-none font-bold">
            +
          </span>
          <span>+ Start New Screening</span>
        </button>
      </div>
    </div>
  );
};
