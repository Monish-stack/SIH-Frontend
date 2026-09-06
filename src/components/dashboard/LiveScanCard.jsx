import React from 'react';
import { liveScanDefault } from '../../data/screenings';

export const LiveScanCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical flex flex-col justify-between h-full">
      {/* Card Header with solid navy dot */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0c1236]">Live Scan Status</h2>
        <span className="w-2.5 h-2.5 rounded-full bg-[#06073b]" />
      </div>

      {/* Main Status Block with Thumbnail */}
      <div className="flex items-center gap-4 my-3">
        {/* Retinal Thumbnail */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black border border-slate-200 shadow-xs flex-shrink-0">
          <img
            src="/assets/fundus/live_scan_thumb.jpg"
            alt="Fundus Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        {/* AI Quality Score */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            AI QUALITY SCORE
          </span>
          <span className="text-xl font-extrabold text-[#0c1236] leading-tight block">
            {liveScanDefault.qualityScore}
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            Pupil Dilation: <span className="font-semibold text-slate-700">{liveScanDefault.pupilDilation}</span>
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-slate-100 my-2" />

      {/* Station & Operator Metadata */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-slate-500">
          <span>Capture Station</span>
          <span className="font-bold text-slate-900">{liveScanDefault.captureStation}</span>
        </div>
        <div className="flex items-center justify-between text-slate-500">
          <span>Current Operator</span>
          <span className="font-bold text-slate-900">{liveScanDefault.currentOperator}</span>
        </div>
      </div>
    </div>
  );
};
