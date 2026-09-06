import React from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  ShieldAlert, 
  Camera, 
  ExternalLink, 
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export const Help = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="text-[11px] font-bold text-teal-600 uppercase tracking-widest block">
          CLINICAL REFERENCE & PROTOCOL MANUAL
        </span>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0c1236] tracking-tight">
          Help & Clinical Guidelines
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Standard operating procedures for diabetic retinopathy screening and triage.
        </p>
      </div>

      {/* ICDR Scale Reference */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-[#0284c7]" />
          <h2 className="text-base font-bold text-[#0c1236]">
            International Clinical Diabetic Retinopathy (ICDR) Disease Severity Scale
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="font-bold text-emerald-950 block">Grade 0: No Apparent Retinopathy (Normal)</span>
            <p className="text-emerald-800 mt-0.5">
              No microaneurysms, hemorrhages, or retinal lesions detectable. Recommended action: Routine 12-month annual screening.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
            <span className="font-bold text-sky-950 block">Grade 1: Mild Non-Proliferative Diabetic Retinopathy (Mild NPDR)</span>
            <p className="text-sky-800 mt-0.5">
              Microaneurysms only. No exudates or cotton wool spots. Recommended action: 6–12 month rescreening and primary care HbA1c review.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="font-bold text-amber-950 block">Grade 2: Moderate Non-Proliferative Diabetic Retinopathy (Mod. NPDR)</span>
            <p className="text-amber-800 mt-0.5">
              More than microaneurysms but less than severe NPDR (scattered dot-blots, early hard exudate clusters). Recommended action: <strong>Referral within 2–4 weeks (Tier 2 Priority)</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="font-bold text-rose-950 block">Grade 3: Severe Non-Proliferative Diabetic Retinopathy (Severe NPDR)</span>
            <p className="text-rose-800 mt-0.5">
              Any of: &gt;20 intraretinal hemorrhages in each of 4 quadrants; definite venous beading in 2+ quadrants; prominent IRMA in 1+ quadrant. <strong>Urgent referral &lt; 1 week (Tier 1 Priority)</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#8b0000] text-white">
            <span className="font-bold block">Grade 4: Proliferative Diabetic Retinopathy (PDR)</span>
            <p className="text-rose-100 mt-0.5">
              Neovascularization (NVD/NVE), vitreous hemorrhage, or preretinal hemorrhage. <strong>Critical emergency referral within 24–48 hours</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Image Quality Standard */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Camera className="w-5 h-5 text-[#0284c7]" />
          <h2 className="text-base font-bold text-[#0c1236]">
            Ophthalmic Fundus Capture Quality Standards
          </h2>
        </div>

        <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
          <li><strong>Pupil Dilation:</strong> Minimum 3.5mm pupil aperture required for non-mydriatic camera. Dim the room illumination prior to capture.</li>
          <li><strong>Macular Centration:</strong> The fovea must be positioned within 1 optic disc diameter of the center (Field 2).</li>
          <li><strong>Temporal Arcade:</strong> Capture must visualize both superior and inferior temporal vascular arcades.</li>
          <li><strong>Focus & Clarity:</strong> Retinal blood vessels at the optic disc border must be sharp and distinguishable without motion blur.</li>
        </ul>
      </div>
    </div>
  );
};
