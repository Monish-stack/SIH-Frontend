import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Printer, 
  Download, 
  ArrowLeft, 
  RotateCcw, 
  Share2, 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  X,
  Clock,
  Send,
  Eye
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { useScreening } from '../context/ScreeningContext';

export const Results = () => {
  const navigate = useNavigate();
  const { 
    selectedPatient, 
    leftEyeImage, 
    rightEyeImage, 
    leftEyeAnalysis, 
    rightEyeAnalysis,
    overallResult,
    showToast 
  } = useScreening();

  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Header & Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-teal-600 uppercase tracking-widest block">
            NEW SCREENING PROTOCOL
          </span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0c1236] tracking-tight">
            Analyzing Both Eye
          </h1>
        </div>

        <WorkflowStepper currentStep={4} />
      </div>

      {/* Patient banner */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#0c1236] flex items-center justify-center font-bold text-xs">
            PAT
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900">
              {selectedPatient?.name || 'Arun Kumar'} ({selectedPatient?.id || 'PAT-10284'})
            </span>
            <span className="text-xs text-slate-500 ml-2">
              Age {selectedPatient?.age || 54} • {selectedPatient?.gender || 'Male'} • {selectedPatient?.systemicCondition || 'Type 2 Diabetes'} • HbA1c: {selectedPatient?.hba1c || '8.4%'}
            </span>
          </div>
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Capture Station: <span className="text-slate-800 font-bold">Nidek AFC-330 / Canon CR-2</span>
        </div>
      </div>

      {/* Two Large Eye Result Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Eye Card (O.S.) */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                MACULAR FIELD 45°
              </span>
              <h2 className="text-lg font-bold text-[#0c1236] mt-0.5">
                LEFT EYE (O.S.)
              </h2>
              <span className="text-xs text-slate-500">Oculus Sinister • Posterior Pole</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white tracking-wider flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              NORMAL
            </span>
          </div>

          {/* Dual Thumbnails: Raw + AI Grad-CAM */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="relative aspect-square bg-black rounded-xl overflow-hidden border border-slate-800">
                <img src={leftEyeImage} alt="Left Raw" className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">
                  Raw Fundus
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative aspect-square bg-black rounded-xl overflow-hidden border border-slate-800">
                <img src={leftEyeImage} alt="Left Grad-CAM" className="w-full h-full object-cover filter brightness-90" />
                <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-color-dodge bg-radial from-emerald-400 via-sky-500 to-transparent" />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-sky-300">
                  AI Grad-CAM
                </span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">AI DETECTION CONFIDENCE</span>
              <span className="text-lg font-extrabold text-[#0c1236]">97.8%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">IMAGE GRADABILITY</span>
              <span className="text-lg font-extrabold text-[#0c1236]">98.4%</span>
            </div>
          </div>

          {/* Findings */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
            <span className="font-bold text-emerald-900 block">Diagnostic Findings:</span>
            <p className="text-emerald-800">
              No Diabetic Retinopathy Detected. Routine 12-month annual re-screening recommended.
            </p>
          </div>
        </div>

        {/* Right Eye Card (O.D.) */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TEMPORAL ARCADE 45°
              </span>
              <h2 className="text-lg font-bold text-[#0c1236] mt-0.5">
                RIGHT EYE (O.D.)
              </h2>
              <span className="text-xs text-slate-500">Oculus Dexter • Posterior Pole</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#8b0000] text-white tracking-wider flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              REFERABLE
            </span>
          </div>

          {/* Dual Thumbnails: Raw + AI Grad-CAM */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="relative aspect-square bg-black rounded-xl overflow-hidden border border-slate-800">
                <img src={rightEyeImage} alt="Right Raw" className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">
                  Raw Fundus
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative aspect-square bg-black rounded-xl overflow-hidden border border-slate-800">
                <img src={rightEyeImage} alt="Right Grad-CAM" className="w-full h-full object-cover filter contrast-125" />
                <div className="absolute inset-0 pointer-events-none opacity-70 mix-blend-color-dodge bg-radial from-rose-500 via-amber-500 to-transparent" />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-rose-300">
                  AI Grad-CAM
                </span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">AI DETECTION CONFIDENCE</span>
              <span className="text-lg font-extrabold text-[#0c1236]">91.2%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">IMAGE GRADABILITY</span>
              <span className="text-lg font-extrabold text-[#0c1236]">97.8%</span>
            </div>
          </div>

          {/* Findings */}
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-900">Moderate Diabetic Retinopathy (NPDR)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200 text-[#8b0000]">
                Priority 2
              </span>
            </div>
            <p className="text-rose-800">
              8+ Microaneurysms, Scattered Dot-blots, Early Exudate Clusters. Specialist referral indicated within 2–4 weeks.
            </p>
          </div>
        </div>
      </div>

      {/* OVERALL SCREENING RESULT (UNIFIED ALGORITHMIC SYNTHESIS) */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-100 shadow-clinical space-y-6">
        {/* Banner Section */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#8b0000] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-rose-950/20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-rose-200 block">
              UNIFIED ALGORITHMIC SYNTHESIS
            </span>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                OVERALL SCREENING RESULT: REFERABLE
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#8b0000]">
                Ophthalmic Consultation Needed
              </span>
            </div>
            <p className="text-xs text-rose-100 mt-2 max-w-2xl leading-relaxed">
              Right eye shows Moderate Diabetic Retinopathy (NPDR). Clinical referral to ophthalmology recommended for full stereoscopic biomicroscopy and optical coherence tomography.
            </p>
          </div>

          <button
            onClick={() => setShowReferralModal(true)}
            className="px-5 py-2.5 sm:py-2.5 bg-white hover:bg-rose-50 text-[#8b0000] font-bold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap active:scale-[0.98] min-h-[44px] md:min-h-0 flex items-center justify-center w-full md:w-auto"
          >
            View Referral Form
          </button>
        </div>

        {/* 4 Summary Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">LEFT EYE</span>
            <span className="text-xl font-extrabold text-emerald-600 block mt-0.5">Normal</span>
            <span className="text-xs text-slate-500 font-medium">Confidence: 97.8%</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">RIGHT EYE</span>
            <span className="text-xl font-extrabold text-[#8b0000] block mt-0.5">Mod. NPDR</span>
            <span className="text-xs text-slate-500 font-medium">Confidence: 91.2%</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">REFERRAL URGENCY</span>
            <span className="text-base font-bold text-[#0c1236] block mt-0.5">Tier 2 Routine</span>
            <span className="text-xs text-slate-500 font-medium">Target: Within 2–4 Weeks</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">SUGGESTED WORKUP</span>
            <span className="text-xs font-bold text-[#0c1236] block mt-1">OCT & Biomicroscopy</span>
            <span className="text-xs text-slate-500 font-medium">Glycemic optimization</span>
          </div>
        </div>

        {/* Recommended Clinical Action Plan */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#f8f7ff] border border-slate-200/80 space-y-3">
          <h3 className="text-sm font-bold text-[#0c1236]">
            Recommended Clinical Action Plan:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0284c7] font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                1
              </span>
              <span>Comprehensive Slit-lamp Biomicroscopy</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0284c7] font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                2
              </span>
              <span>Macular Optical Coherence Tomography (OCT)</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0284c7] font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                3
              </span>
              <span>Primary Care HbA1c correlation</span>
            </div>
          </div>
        </div>

        {/* Clinical Audit Metadata & Disclaimer */}
        <div className="pt-2 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span>Screened by: <strong className="text-slate-700">Nurse Anitha R.</strong></span>
            <span>Station: <strong className="text-slate-700">Community Eye Care Unit 3</strong></span>
            <span>Algorithm Hash: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] text-slate-700 font-mono">#RET-42-8809B</code></span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ISO 13485 Compliant
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic">
          Clinical Disclaimer: AI-assisted screening supports clinical triage and decision-making and does not replace professional clinical diagnosis by a registered ophthalmologist.
        </p>

        {/* Bottom Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/new-screening/right-eye')}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors min-h-[44px] sm:min-h-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Right Eye</span>
            </button>
            <button
              onClick={() => navigate('/new-screening')}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors min-h-[44px] sm:min-h-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Retake / Re-analyze</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => showToast('Printing Patient Handout (Tamil / English)', 'info')}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors min-h-[44px] sm:min-h-0"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Patient Handout</span>
            </button>

            <button
              onClick={() => setShowReportModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] min-h-[44px] sm:min-h-0"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Screening Report →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl space-y-4 border border-slate-100 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#8b0000]" />
                <h3 className="text-base font-bold text-[#0c1236]">
                  Clinical Tele-Triage Referral Order
                </h3>
              </div>
              <button
                onClick={() => setShowReferralModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-rose-50 p-3.5 sm:p-4 rounded-2xl border border-rose-200 text-xs space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-rose-950 gap-1">
                <span>Priority: Tier 2 Routine (2–4 Weeks)</span>
                <span>Referral ID: #REF-TN-2024-8819</span>
              </div>
              <p className="text-rose-800">
                Designated Facility: Aravind Eye Hospital / Coimbatore Government Medical College
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block uppercase text-[10px] font-bold">Patient</span>
                  <span className="font-bold text-slate-900">{selectedPatient?.name} ({selectedPatient?.id})</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px] font-bold">Age / Gender</span>
                  <span className="font-bold text-slate-900">{selectedPatient?.age} Yrs / {selectedPatient?.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px] font-bold">Primary Diagnosis</span>
                  <span className="font-bold text-[#8b0000]">Moderate NPDR (O.D.)</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px] font-bold">Current HbA1c</span>
                  <span className="font-bold text-slate-900">{selectedPatient?.hba1c} (Elevated)</span>
                </div>
              </div>

              <div>
                <span className="font-bold block text-slate-800">Reason for Referral:</span>
                <p className="text-slate-600 mt-0.5">
                  Automated fundus examination detected &gt;8 microaneurysms and hard exudate clusters along the temporal retinal arcade. Stereoscopic slit-lamp biomicroscopy and optical coherence tomography (OCT) requested to evaluate clinically significant macular edema.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowReferralModal(false)}
                className="px-4 py-2.5 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl min-h-[44px] sm:min-h-0 text-center"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowReferralModal(false);
                  showToast('Referral Order dispatched to PACS / Hospital EHR', 'success');
                }}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 sm:py-2 bg-[#8b0000] hover:bg-rose-900 text-white font-bold text-xs rounded-xl shadow-sm min-h-[44px] sm:min-h-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit to Specialist</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Screening Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 border border-slate-100 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0284c7]" />
                <h3 className="text-base font-bold text-[#0c1236]">
                  Official Tele-Triage Screening Dossier
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-2 gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">COMMUNITY EYE CARE UNIT 3</h4>
                  <span className="text-slate-500">Government Tele-Ophthalmology Network</span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-mono text-slate-700 font-bold block">REPORT #TR-9921-TN</span>
                  <span className="text-slate-500">24 Oct 2024</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                <div><strong>Patient:</strong> {selectedPatient?.name}</div>
                <div><strong>MRN:</strong> {selectedPatient?.id}</div>
                <div><strong>Age/Gender:</strong> {selectedPatient?.age} / {selectedPatient?.gender}</div>
                <div><strong>Condition:</strong> {selectedPatient?.systemicCondition}</div>
                <div><strong>Left Eye:</strong> Normal (Grade 0, Conf: 97.8%)</div>
                <div><strong>Right Eye:</strong> Moderate NPDR (Grade 2, Conf: 91.2%)</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">Algorithmic Conclusion:</strong>
                <p className="text-slate-700">
                  Patient requires ophthalmic evaluation within 2–4 weeks due to moderate diabetic retinopathy lesions in the right eye. The left eye exhibits no diabetic retinopathy.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-3 border-t border-slate-100 gap-3">
              <span className="text-xs text-slate-400">Verified by Nurse Anitha R. • ISO 13485</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl min-h-[44px] sm:min-h-0 text-center"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    showToast('Screening Dossier downloaded (PDF)', 'success');
                  }}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 sm:py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-sm min-h-[44px] sm:min-h-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
