import React from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useScreening } from '../../context/ScreeningContext';

export const Toast = () => {
  const { toast } = useScreening();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#06073b] text-white rounded-2xl shadow-xl border border-white/10 animate-fade-in transition-all">
      {isSuccess && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
      {isError && <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
      {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />}
      <span className="text-sm font-medium pr-2">{toast.message}</span>
    </div>
  );
};
