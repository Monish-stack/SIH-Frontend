import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-clinical text-center max-w-md space-y-4">
        <div className="w-16 h-16 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-extrabold text-[#0c1236]">Page Not Found</h1>
        <p className="text-xs text-slate-500">
          The requested clinical screening module or patient record does not exist or has been relocated.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-xl shadow-sm"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
