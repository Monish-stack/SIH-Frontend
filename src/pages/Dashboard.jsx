import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ClipboardList, Target, CheckCircle2, TrendingUp } from 'lucide-react';
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

      {/* 4 KPI Cards Matching Screenshot 1 Exactly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Today's Screenings */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              TODAY'S SCREENINGS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-[#0c1236]">24</span>
            {/* Horizontal Blue Accent Bar from Screenshot */}
            <div className="w-16 h-1 bg-[#0284c7] rounded-full my-2.5" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7]">
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+4 from yesterday</span>
          </div>
        </div>

        {/* KPI 2: Pending Reviews */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              PENDING REVIEWS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-[#0c1236]">3</span>
            <div className="h-1 my-2.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#0284c7] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Needs Attention
            </span>
            <span className="text-xs font-bold text-[#0284c7]">3 awaiting</span>
          </div>
        </div>

        {/* KPI 3: Referable Cases */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              REFERABLE CASES
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-[#0c1236]">5</span>
            <div className="h-1 my-2.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#8b0000] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              High Priority
            </span>
            <span className="text-xs font-extrabold text-[#8b0000] tracking-tight">
              Require Specialist
            </span>
          </div>
        </div>

        {/* KPI 4: Completed Reports */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              COMPLETED REPORTS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-[#0c1236]">21</span>
            <div className="h-1 my-2.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#1e293b] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Verified
            </span>
            <span className="text-xs font-bold text-[#0284c7]">87.5% complete</span>
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
