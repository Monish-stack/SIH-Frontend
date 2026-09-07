import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { hourlyIntakeData } from '../../data/analytics';

export const HourlyIntakeChart = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      if (label === '05 PM') {
        return (
          <div className="bg-[#06073b] text-white text-xs p-2 rounded-xl shadow-lg border border-white/10">
            <span className="font-bold text-sky-300">05 PM (Projected)</span>
          </div>
        );
      }
      return (
        <div className="bg-[#06073b] text-white text-xs p-2.5 rounded-xl shadow-lg border border-white/10 space-y-1">
          <p className="font-bold text-sky-300">{label}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-300">Normal:</span>
            <span className="font-bold text-white">{payload[0]?.value || 0}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sky-300">Review:</span>
            <span className="font-bold text-sky-200">{payload[1]?.value || 0}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-rose-300">Referable:</span>
            <span className="font-bold text-rose-200">{payload[2]?.value || 0}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical flex flex-col justify-between h-full min-w-0">
      {/* Header and Legend */}
      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-base font-bold text-[#0c1236]">Hourly Intake Progression</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Distribution of retinal scans across clinical operating hours
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-600 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-white border border-slate-300 shadow-2xs" />
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#80d4f6]" />
            <span>Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#fca5a5]" />
            <span>Referable</span>
          </div>
        </div>
      </div>

      {/* Chart Plot area with soft cyan background matching screenshot */}
      <div className="relative bg-[#dcf3f9] rounded-2xl p-3 sm:p-4 pt-5 sm:pt-6 min-w-0">
        <div className="h-40 sm:h-44 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={hourlyIntakeData}
              barCategoryGap="24%"
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#076694', fontSize: 11, fontWeight: 700 }}
                dy={6}
              />
              <YAxis
                hide
                domain={[0, 9]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.3)' }} />
              <Bar dataKey="normal" stackId="a" fill="#ffffff" radius={[0, 0, 0, 0]} />
              <Bar dataKey="review" stackId="a" fill="#80d4f6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="referable" stackId="a" fill="#fca5a5" radius={[2, 2, 0, 0]} />
              <Bar
                dataKey="projected"
                stackId="a"
                fill="rgba(56, 189, 248, 0.12)"
                stroke="#0284c7"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
