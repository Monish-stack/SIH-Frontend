import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WorkflowStepper = ({ currentStep = 1 }) => {
  const navigate = useNavigate();

  const steps = [
    { number: 1, label: 'Patient', path: '/new-screening' },
    { number: 2, label: 'Left Eye (O.S.)', path: '/new-screening/left-eye' },
    { number: 3, label: 'Right Eye', path: '/new-screening/right-eye' },
    { number: 4, label: 'Results', path: '/new-screening/results' }
  ];

  return (
    <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
      <div className="inline-flex items-center bg-[#f4f3fd] p-1 rounded-2xl border border-slate-200/70 shadow-xs select-none min-w-max">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isPending = step.number > currentStep;

          return (
            <React.Fragment key={step.number}>
              {/* Step Element */}
              {isActive ? (
                <button
                  onClick={() => navigate(step.path)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-[#0284c7] text-white shadow-xs whitespace-nowrap"
                >
                  <span className="w-4 h-4 rounded-full bg-white text-[#0284c7] flex items-center justify-center text-[10px] font-bold">
                    {step.number}
                  </span>
                  <span>{step.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />
                </button>
              ) : isCompleted ? (
                <button
                  onClick={() => navigate(step.path)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-white text-slate-800 hover:bg-slate-50 shadow-2xs cursor-pointer transition-colors whitespace-nowrap"
                >
                  <span className="w-4 h-4 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center text-[11px] font-bold">
                    ✓
                  </span>
                  <span>{step.label}</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-slate-500 cursor-default whitespace-nowrap">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                    {step.number}
                  </span>
                  <span>{step.label}</span>
                </div>
              )}

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div
                  className={`w-3 sm:w-6 h-[1.5px] mx-0.5 sm:mx-1 transition-colors flex-shrink-0 ${
                    step.number < currentStep ? 'bg-[#0284c7]' : 'bg-slate-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
