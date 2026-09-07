import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ClipboardClock, CirclePower, CheckCircle2, TrendingUp } from 'lucide-react';
import { TopHeader } from '../components/layout/TopHeader';
import { HourlyIntakeChart } from '../components/dashboard/HourlyIntakeChart';
import { LiveScanCard } from '../components/dashboard/LiveScanCard';
import { RecentScreeningsTable } from '../components/dashboard/RecentScreeningsTable';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [searchPatient, setSearchPatient] = useState('');

  const handleSearchSubmit = (val) => {
    navigate(`/new-screening?q=${encodeURIComponent(val)}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section matching Screenshot 1 */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0c1236] tracking-tight">
            Good morning, Nurse
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Ready to begin today's retinal screenings?
          </p>
        </div>

        <TopHeader
          searchQuery={searchPatient}
          setSearchQuery={setSearchPatient}
          onSearchSubmit={handleSearchSubmit}
        />
      </div>

      {/* 4 KPI Cards Matching Reference Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Today's Screenings */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between min-h-[36px]">
              <span className="text-[12px] font-bold text-slate-700 uppercase tracking-wider leading-5">
                TODAY'S SCREENINGS
              </span>
              <div className="w-9 h-9 rounded-md bg-[#0078bd] text-white flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-4xl font-extrabold text-[#0078bd] tracking-tight leading-none">24</span>
            </div>
            <div className="w-full h-[1.5px] bg-[#67beec] mt-3.5" />
          </div>
          <div className="h-7 mt-3 flex items-center gap-1.5 text-xs font-bold text-[#0078bd]">
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+4 from yesterday</span>
          </div>
        </div>

        {/* KPI 2: Pending Reviews */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between min-h-[36px]">
              <span className="text-[12px] font-bold text-slate-700 uppercase tracking-wider leading-5">
                PENDING REVIEWS
              </span>
              <div className="w-9 h-9 rounded-md bg-[#0078bd] text-white flex items-center justify-center shrink-0">
                <ClipboardClock className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-4xl font-extrabold text-[#0078bd] tracking-tight leading-none">3</span>
            </div>
            <div className="w-full h-[1.5px] bg-[#67beec] mt-3.5" />
          </div>
          <div className="h-7 mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#0078bd] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              Needs Attention
            </span>
            <span className="text-xs font-bold text-[#0078bd]">3 awaiting</span>
          </div>
        </div>

        {/* KPI 3: Referable Cases */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between min-h-[36px]">
              <span className="text-[12px] font-bold text-slate-700 uppercase tracking-wider leading-5">
                REFERABLE CASES
              </span>
              <div className="w-9 h-9 rounded-md bg-[#0078bd] text-white flex items-center justify-center shrink-0">
                <CirclePower className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-4xl font-extrabold text-[#8b0000] tracking-tight leading-none">5</span>
            </div>
            <div className="w-full h-[1.5px] bg-[#67beec] mt-3.5" />
          </div>
          <div className="h-7 mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#8b0000] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              High Priority
            </span>
            <span className="text-xs font-bold text-[#8b0000]">
              RequireSpecialist
            </span>
          </div>
        </div>

        {/* KPI 4: Completed Reports */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between min-h-[36px]">
              <span className="text-[12px] font-bold text-slate-700 uppercase tracking-wider leading-5">
                COMPLETED REPORTS
              </span>
              <div className="w-9 h-9 rounded-md bg-[#0078bd] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-4xl font-extrabold text-[#0078bd] tracking-tight leading-none">21</span>
            </div>
            <div className="w-full h-[1.5px] bg-[#67beec] mt-3.5" />
          </div>
          <div className="h-7 mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#212e38] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              Verified
            </span>
            <span className="text-xs font-bold text-[#0078bd]">87.5%complete</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Hourly Intake Progression + Live Scan Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <HourlyIntakeChart />
        </div>
        <div className="lg:col-span-4">
          <LiveScanCard />
        </div>
      </div>

      {/* Bottom Table: Recent Screenings */}
      <RecentScreeningsTable />
    </div>
  );
};
