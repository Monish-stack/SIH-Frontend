import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  Download, 
  Filter, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  AlertTriangle,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { 
  analyticsKpis, 
  screeningActivityData, 
  resultDistributionData, 
  eyeWiseComparisonData, 
  icdrFindingsData, 
  weeklyReferralTrends, 
  qualityMetrics, 
  throughputData, 
  aiTelemetry, 
  recentReferableScreenings 
} from '../data/analytics';
import { useScreening } from '../context/ScreeningContext';

export const Analytics = () => {
  const { showToast } = useScreening();
  const [activityTimeframe, setActivityTimeframe] = useState('7 Days');
  const [selectedResultFilter, setSelectedResultFilter] = useState('All');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState('All');

  const activityData = screeningActivityData[activityTimeframe] || screeningActivityData['7 Days'];

  const CustomActivityTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#06073b] text-white text-xs p-3 rounded-xl shadow-lg border border-white/10 space-y-1">
          <p className="font-bold text-sky-300">{label}</p>
          <div className="flex justify-between gap-4">
            <span className="text-slate-300">Screenings:</span>
            <span className="font-bold text-white">{payload[0]?.value}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-amber-300">Benchmark:</span>
            <span className="font-bold text-amber-200">{payload[1]?.value || 28.4}/day</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-teal-600 uppercase tracking-widest block">
            TELE-TRIAGE COHORT
          </span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0c1236] tracking-tight">
            Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor screening activity, results, and referral trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Quarter</option>
            <option>Year to Date</option>
          </select>

          <button
            onClick={() => showToast('Cohort Report generated and downloaded (Excel / PDF)', 'success')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Cohort Filter Row */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-clinical flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[10px] uppercase">Result:</span>
            <select
              value={selectedResultFilter}
              onChange={(e) => setSelectedResultFilter(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none"
            >
              <option value="All">All Results (248)</option>
              <option value="Normal">Normal (186)</option>
              <option value="Review">Review Required (32)</option>
              <option value="Referable">Referable (30)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[10px] uppercase">Age:</span>
            <select
              value={selectedAgeFilter}
              onChange={(e) => setSelectedAgeFilter(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none"
            >
              <option value="All">All Ages</option>
              <option value="18-40">18 - 40 Yrs</option>
              <option value="41-60">41 - 60 Yrs</option>
              <option value="61+">61+ Yrs</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[10px] uppercase">Gender:</span>
            <select className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none">
              <option>All Genders</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[10px] uppercase">Quality:</span>
            <select className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none">
              <option>All Quality Tiers</option>
              <option>Tier 1 (High Gradability)</option>
              <option>Tier 2 (Review)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => {
              setSelectedResultFilter('All');
              setSelectedAgeFilter('All');
              showToast('Filters reset', 'info');
            }}
            className="px-3 py-1.5 text-slate-500 hover:text-slate-800"
          >
            Clear Filters
          </button>
          <button
            onClick={() => showToast('Cohort filters applied (248 records matching)', 'success')}
            className="px-4 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg shadow-2xs"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Screenings
          </span>
          <span className="text-3xl font-extrabold text-[#0c1236] block mt-2">
            {analyticsKpis.totalScreenings}
          </span>
          <span className="text-xs text-sky-600 font-semibold block mt-1">100% Cohort</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Normal
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-emerald-600">{analyticsKpis.normalCount}</span>
            <span className="text-sm font-bold text-emerald-700">({analyticsKpis.normalPct})</span>
          </div>
          <span className="text-xs text-slate-500 block mt-1">Annual routine recall</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Review Required
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-[#0284c7]">{analyticsKpis.reviewCount}</span>
            <span className="text-sm font-bold text-sky-700">({analyticsKpis.reviewPct})</span>
          </div>
          <span className="text-xs text-slate-500 block mt-1">Borderline / image quality</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Referable
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-[#8b0000]">{analyticsKpis.referableCount}</span>
            <span className="text-sm font-bold text-rose-700">({analyticsKpis.referablePct})</span>
          </div>
          <span className="text-xs text-rose-600 font-semibold block mt-1">Urgent & routine referrals</span>
        </div>
      </div>

      {/* Row 2: Screening Activity Chart & Screening Result Distribution (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Screening Activity Area Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-[#0c1236]">Screening Activity</h2>
              <p className="text-xs text-slate-500">Screening throughput compared to regional benchmark</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              {['7 Days', '30 Days', '3 Months'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActivityTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    activityTimeframe === tf
                      ? 'bg-[#0284c7] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="screeningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <Tooltip content={<CustomActivityTooltip />} />
                <ReferenceLine y={28.4} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Target 28.4/day', fill: '#d97706', fontSize: 10, position: 'insideTopRight' }} />
                <Area
                  type="monotone"
                  dataKey="screenings"
                  stroke="#0284c7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#screeningsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Screening Result Distribution Donut (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0c1236]">Result Distribution</h2>
            <p className="text-xs text-slate-500">Bilateral triage outcome proportions</p>
          </div>

          {/* Donut Chart Container */}
          <div className="relative h-48 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resultDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {resultDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-extrabold text-[#0c1236]">248</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Total Scans
              </span>
            </div>
          </div>

          {/* Legend Strip */}
          <div className="space-y-1.5 text-xs">
            {resultDistributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold">{item.value} ({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Eye-wise Results & Retinal Screening Findings (ICDR Scale) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eye-Wise Screening Results */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#0c1236]">Eye-Wise Screening Results</h2>
            <p className="text-xs text-slate-500">Left Eye (O.S.) vs Right Eye (O.D.) distribution</p>
          </div>

          {/* Left Eye Bar */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Left Eye (O.S.) • 248 En-face scans</span>
              <span className="text-emerald-700">82% Normal</span>
            </div>
            {/* Progress bar */}
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500" style={{ width: '82%' }} title="Normal: 82%" />
              <div className="h-full bg-[#0284c7]" style={{ width: '10%' }} title="Review: 10%" />
              <div className="h-full bg-[#8b0000]" style={{ width: '8%' }} title="Referable: 8%" />
            </div>
            <div className="flex justify-between text-[10px] font-semibold text-slate-500 pt-0.5">
              <span>Normal: 82%</span>
              <span>Review: 10%</span>
              <span>Referable: 8%</span>
            </div>
          </div>

          {/* Right Eye Bar */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Right Eye (O.D.) • 248 En-face scans</span>
              <span className="text-rose-700">12% Referable</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500" style={{ width: '76%' }} title="Normal: 76%" />
              <div className="h-full bg-[#0284c7]" style={{ width: '12%' }} title="Review: 12%" />
              <div className="h-full bg-[#8b0000]" style={{ width: '12%' }} title="Referable: 12%" />
            </div>
            <div className="flex justify-between text-[10px] font-semibold text-slate-500 pt-0.5">
              <span>Normal: 76%</span>
              <span>Review: 12%</span>
              <span>Referable: 12%</span>
            </div>
          </div>
        </div>

        {/* Retinal Screening Findings (ICDR Scale) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0c1236]">Retinal Findings</h2>
              <p className="text-xs text-slate-500">Stratified by International ICDR DR Grading Scale</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-[#0284c7]">
              ICDR Scale
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {icdrFindingsData.map((grade) => (
              <div key={grade.grade} className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">{grade.grade}</span>
                  <span className="font-bold">{grade.percentage}% ({grade.count} patients)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${grade.percentage}%`, backgroundColor: grade.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Referral Trends, Image Quality, Workflow & AI Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image Quality & Gradability */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0c1236]">Image Quality & Gradability</h2>
            <span className="text-xs font-semibold text-slate-500">{qualityMetrics.totalImages} Scans</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex justify-between font-bold text-emerald-950">
                <span>{qualityMetrics.goodQuality.label}</span>
                <span>{qualityMetrics.goodQuality.percentage}%</span>
              </div>
              <span className="text-[11px] text-emerald-800">{qualityMetrics.goodQuality.count} images validated</span>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex justify-between font-bold text-amber-950">
                <span>{qualityMetrics.poorQuality.label}</span>
                <span>{qualityMetrics.poorQuality.percentage}%</span>
              </div>
              <span className="text-[11px] text-amber-800">{qualityMetrics.poorQuality.count} images required retake</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{qualityMetrics.incompatible.label}</span>
                <span>{qualityMetrics.incompatible.percentage}%</span>
              </div>
              <span className="text-[11px] text-slate-500">{qualityMetrics.incompatible.count} camera handshake issues</span>
            </div>
          </div>
        </div>

        {/* Screening Workflow & Throughput */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-4">
          <h2 className="text-sm font-bold text-[#0c1236]">Screening Workflow & Throughput</h2>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">AVG SCREENING TIME</span>
              <span className="text-xl font-extrabold text-[#0c1236] block mt-1">{throughputData.avgScreeningTime}</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">Under 3m target</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">AI PROCESSING LATENCY</span>
              <span className="text-xl font-extrabold text-[#0c1236] block mt-1">{throughputData.aiLatency}</span>
              <span className="text-[10px] text-sky-600 font-semibold block">Local Edge Inference</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">IMAGES PROCESSED</span>
              <span className="text-xl font-extrabold text-[#0c1236] block mt-1">{throughputData.imagesProcessed}</span>
              <span className="text-[10px] text-slate-500 font-semibold block">Bilateral captures</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">PENDING PHYSICIAN REVIEWS</span>
              <span className="text-xl font-extrabold text-amber-600 block mt-1">{throughputData.pendingReviews}</span>
              <span className="text-[10px] text-amber-700 font-semibold block">Awaiting signoff</span>
            </div>
          </div>
        </div>

        {/* AI Screening Telemetry */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0c1236]">AI Screening Telemetry</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
              {aiTelemetry.engine}
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Screenings Analyzed:</span>
              <span className="font-bold text-slate-900">{aiTelemetry.screeningsAnalyzed}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Fundus Images:</span>
              <span className="font-bold text-slate-900">{aiTelemetry.fundusImages}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Average AI Confidence:</span>
              <span className="font-bold text-emerald-600">{aiTelemetry.avgConfidence}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Gradability Pass Rate:</span>
              <span className="font-bold text-[#0284c7]">{aiTelemetry.gradabilityPassRate}</span>
            </div>
            <div className="py-1">
              <span className="text-slate-500 block text-[10px]">Architecture:</span>
              <span className="font-semibold text-slate-800 text-[11px]">{aiTelemetry.inferenceArchitecture}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Referable Screenings Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#0c1236]">Recent Referable Screenings</h3>
            <p className="text-xs text-slate-500">High priority cohort requiring specialist ophthalmology review</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8b0000] text-white">
            30 Referrals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Patient ID</th>
                <th className="py-3 px-4 text-center">Screening Date</th>
                <th className="py-3 px-4 text-center">Affected Eye</th>
                <th className="py-3 px-4">AI Screening Classification</th>
                <th className="py-3 px-4 text-center">Confidence</th>
                <th className="py-3 px-4">Recommended Action</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {recentReferableScreenings.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.patientName}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">{item.patientId}</td>
                  <td className="py-3.5 px-4 text-center text-slate-600">{item.date}</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-[#8b0000]">{item.affectedEye}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-[#8b0000]">
                      {item.classification}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">{item.confidence}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{item.action}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => showToast(`Opening referral dispatch for ${item.patientName}`, 'info')}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#8b0000] hover:bg-rose-900 text-white rounded-lg text-xs font-semibold shadow-2xs"
                    >
                      <span>Refer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
