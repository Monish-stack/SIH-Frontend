import React from 'react';
import { CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react';

export const StatusBadge = ({ type, text }) => {
  const norm = (type || text || '').toLowerCase();

  if (norm.includes('referable')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8b0000] text-white tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        {text || 'REFERABLE'}
      </span>
    );
  }

  if (norm.includes('review')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0284c7] text-white tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        {text || 'REVIEW REQUIRED'}
      </span>
    );
  }

  if (norm.includes('normal')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0284c7] text-white tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        {text || 'NORMAL'}
      </span>
    );
  }

  if (norm.includes('mild')) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#0284c7] text-white">
        {text || 'Mild DR'}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
      {text}
    </span>
  );
};

export const TableStatusIndicator = ({ status }) => {
  const norm = (status || '').toLowerCase();

  if (norm.includes('completed')) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
        <CheckCircle2 className="w-4 h-4 text-slate-600" />
        Completed
      </span>
    );
  }

  if (norm.includes('pending')) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
        <Clock className="w-4 h-4 text-[#0284c7]" />
        Pending Verification
      </span>
    );
  }

  if (norm.includes('processing')) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
        <Loader2 className="w-4 h-4 text-[#8b0000] animate-spin" />
        Processing
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
      <AlertCircle className="w-4 h-4 text-slate-400" />
      {status}
    </span>
  );
};
