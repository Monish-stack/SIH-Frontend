import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FolderUp, 
  CheckCircle, 
  Eye, 
  FileText, 
  RefreshCw, 
  Camera, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Activity,
  AlertTriangle,
  Download
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { useScreening } from '../context/ScreeningContext';

export const UploadRightEye = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showOverlays, setShowOverlays] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const { 
    selectedPatient, 
    rightEyeImage, 
    rightEyeFileMeta, 
    handleUploadRightEye, 
    rightEyeQuality, 
    rightEyeAnalysis,
    setRightEyeAnalysis,
    showToast 
  } = useScreening();

  const [hasAnalyzed, setHasAnalyzed] = useState(rightEyeAnalysis.isCompleted);

  const stepsList = [
    'Image preprocessing & normalization',
    'Retinal vascular segmentation (O.D.)',
    'Macular & temporal arcade detection',
    'Microaneurysm & dot-blot lesion isolation',
    'Generating Grad-CAM attention activation',
    'Synthesizing NPDR severity grade'
  ];

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadRightEye(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadRightEye(e.target.files[0]);
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const interval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev < stepsList.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setHasAnalyzed(true);
            setRightEyeAnalysis(prev => ({ ...prev, isCompleted: true }));
            showToast('Right Eye Analysis Completed: Moderate NPDR (Referable)', 'error');
          }, 400);
          return prev;
        }
      });
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Header & Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-teal-600 uppercase tracking-widest block">
            NEW SCREENING PROTOCOL
          </span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0c1236] tracking-tight">
            {hasAnalyzed ? 'Right Eye Diagnostic Evaluation' : 'Upload Right Eye'}
          </h1>
        </div>

        <WorkflowStepper currentStep={3} />
      </div>

      {/* Patient Selected Information Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center flex-shrink-0 font-bold text-sm">
            OD
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-[#0284c7] border border-sky-200 uppercase tracking-wider">
                Patient Selected
              </span>
              <span className="text-xs font-semibold text-slate-500">
                MRN: {selectedPatient?.id || 'PAT-10284'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 mt-1 text-sm font-bold text-[#0c1236] flex-wrap">
              <span>{selectedPatient?.name || 'Arun Kumar'}</span>
              <span className="text-slate-400 font-normal">•</span>
              <span className="text-xs font-medium text-slate-600">
                {selectedPatient?.age || 54} Yrs
              </span>
              <span className="text-slate-400 font-normal">•</span>
              <span className="text-xs font-medium text-slate-600">
                {selectedPatient?.gender || 'Male'}
              </span>
              <span className="text-slate-400 font-normal">•</span>
              <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-[#f2f0ff] text-[#4f46e5]">
                {selectedPatient?.systemicCondition || 'Type 2 Diabetes (7 yrs)'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-emerald-600 font-medium">
            Left Eye: Verified Normal (Grade 0)
          </span>
          <Link
            to={`/patients/${selectedPatient?.id || 'PAT-10284'}`}
            className="flex items-center gap-1.5 text-[#0284c7] hover:underline"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>History</span>
          </Link>
        </div>
      </div>

      {/* Main Right Eye Content */}
      {!hasAnalyzed && !isAnalyzing ? (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-6">
          {/* Dropzone */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
              isDragging
                ? 'border-[#0284c7] bg-sky-50/50'
                : 'border-[#0284c7] bg-[#fbfbfe] hover:bg-slate-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/tiff"
              className="hidden"
              onChange={onFileChange}
            />

            <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-[#0284c7] flex items-center justify-center shadow-xs">
                <FolderUp className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-bold text-[#0c1236]">
                Drop right eye fundus photograph here
              </h3>

              <p className="text-xs text-slate-500">
                Drag & drop JPG or PNG fundus photograph (O.D. - Oculus Dexter)
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98]"
                >
                  Browse Files
                </button>
              </div>
            </div>
          </div>

          {/* Clinical Viewer & Quality Verification for Right Eye */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0c1236] tracking-wide">
                  RIGHT EYE (O.D. - OCULUS DEXTER)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-[#0284c7]">
                  Temporal Arcade 45°
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    showOverlays ? 'bg-sky-50 text-[#0284c7] border-sky-200' : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  HUD Overlays: {showOverlays ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setZoomLevel(z => Math.max(0.8, z - 0.2))}
                  className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(z => Math.min(2.2, z + 0.2))}
                  className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Viewer Window */}
            <div className="relative w-full h-[440px] bg-[#070a1a] rounded-2xl overflow-hidden flex items-center justify-center border border-slate-900 shadow-inner">
              <div style={{ transform: `scale(${zoomLevel})` }} className="relative max-h-full aspect-square flex items-center justify-center transition-transform">
                <img
                  src={rightEyeImage}
                  alt="Right Eye Fundus"
                  className="max-h-[420px] max-w-full object-contain rounded-full border border-orange-500/20"
                />

                {showOverlays && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-[360px] h-[360px] rounded-full border border-sky-400/40 border-dashed animate-pulse-subtle" />

                    {/* Fovea overlay */}
                    <div className="absolute top-[50%] left-[46%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full border border-emerald-400/70 border-dashed flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="mt-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-emerald-300">
                        FOVEA
                      </span>
                    </div>

                    {/* Optic Disc overlay */}
                    <div className="absolute top-[48%] left-[78%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full border-2 border-sky-400/80 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-sky-400" />
                      </div>
                      <span className="mt-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-sky-300">
                        DISC (OD)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl text-left border border-white/10 text-white space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  ACQUISITION MODE
                </span>
                <span className="text-xs font-semibold text-sky-200">
                  Fundus 45° Temporal Arcade
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl text-right border border-white/10 text-white space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  AI QUALITY GATE
                </span>
                <span className="text-xs font-semibold text-emerald-300">
                  PASSED (97.8%)
                </span>
              </div>
            </div>

            {/* Quality gate 4-card strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">RETINA DETECTED</span>
                <span className="text-xl font-bold text-[#0c1236]">{rightEyeQuality.retinaDetected}</span>
                <span className="text-xs text-emerald-600 block">{rightEyeQuality.retinaNote}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">RESOLUTION</span>
                <span className="text-xl font-bold text-[#0c1236]">{rightEyeQuality.resolution}</span>
                <span className="text-xs text-slate-500 block">{rightEyeQuality.resNote}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">CENTRATION</span>
                <span className="text-xl font-bold text-[#0c1236]">{rightEyeQuality.centration}</span>
                <span className="text-xs text-slate-500 block">{rightEyeQuality.centrationNote}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">ARTIFACT ANALYSIS</span>
                <span className="text-xl font-bold text-[#0c1236]">{rightEyeQuality.artifact}</span>
                <span className="text-xs text-slate-500 block">{rightEyeQuality.artifactNote}</span>
              </div>
            </div>

            {/* Proceed to Analysis button */}
            <div className="pt-4 flex justify-end border-t border-slate-100">
              <button
                onClick={handleStartAnalysis}
                className="flex items-center gap-2 px-6 py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze Right Eye →</span>
              </button>
            </div>
          </div>
        </div>
      ) : isAnalyzing ? (
        /* Progress simulation */
        <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-clinical text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center mx-auto shadow-inner animate-spin">
            <Activity className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#0c1236]">
              Analyzing Right Retinal Image...
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Executing microaneurysm isolation & severity mapping (O.D.)
            </p>
          </div>

          <div className="space-y-2.5 text-left max-w-md mx-auto pt-4">
            {stepsList.map((step, idx) => {
              const isPast = idx < analysisStep;
              const isCurrent = idx === analysisStep;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-xs p-2 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-sky-50 text-[#0284c7] font-bold border border-sky-200'
                      : isPast
                      ? 'text-emerald-700 font-medium'
                      : 'text-slate-400'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full border-2 border-[#0284c7] border-t-transparent animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-slate-200 flex-shrink-0" />
                  )}
                  <span>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Completed Right Eye Analysis */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Raw */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-[#0c1236]">Retinal Image (O.D.)</h3>
                  <p className="text-xs text-slate-500">Temporal Arcade 45° Non-Mydriatic</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                  RAW 45°
                </span>
              </div>

              <div className="relative aspect-square max-h-[360px] mx-auto bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-slate-900">
                <img
                  src={rightEyeImage}
                  alt="Right Eye Raw"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-4 text-center text-xs text-slate-500">
                Visible Microaneurysms & Lipid Exudates
              </div>
            </div>

            {/* Grad-CAM Heatmap */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-[#0c1236]">AI Attention Map</h3>
                  <p className="text-xs text-slate-500">ResNet-50 + Grad-CAM Heat Activation</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-[#8b0000] border border-rose-200">
                  Lesion Cluster Detected
                </span>
              </div>

              <div className="relative aspect-square max-h-[360px] mx-auto bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-slate-900">
                <img
                  src={rightEyeImage}
                  alt="Right Eye Heatmap base"
                  className="w-full h-full object-contain filter contrast-125"
                />

                {/* Heatmap highlight on lesions */}
                <div className="absolute inset-0 pointer-events-none opacity-70 mix-blend-color-dodge bg-radial from-rose-500 via-amber-500 to-transparent" />
                <div className="absolute w-40 h-40 rounded-full top-[35%] right-[25%] bg-red-600/50 filter blur-xl pointer-events-none" />
                <div className="absolute w-28 h-28 rounded-full bottom-[30%] left-[30%] bg-amber-500/40 filter blur-lg pointer-events-none" />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-2">
                <span>Activation Focus: Temporal arcade exudates</span>
                <span className="font-semibold text-rose-600">Peak Attention: 0.94</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Evaluation Card: Moderate NPDR */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  DIAGNOSTIC EVALUATION
                </span>
                <h3 className="text-xl font-bold text-[#0c1236] mt-0.5">
                  {rightEyeAnalysis.title}
                </h3>
              </div>

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#8b0000] text-white tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {rightEyeAnalysis.result}
              </span>
            </div>

            <p className="text-xs text-slate-700 max-w-3xl leading-relaxed">
              {rightEyeAnalysis.findings}
            </p>

            {/* 4 Metric Pill Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  AI MODEL CONFIDENCE
                </span>
                <span className="text-2xl font-extrabold text-[#0c1236]">
                  {rightEyeAnalysis.confidence}
                </span>
                <span className="text-xs text-amber-600 font-semibold block mt-0.5">
                  High Certainty
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  IMAGE GRADABILITY
                </span>
                <span className="text-2xl font-extrabold text-[#0c1236]">
                  {rightEyeAnalysis.gradability}
                </span>
                <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                  Tier 1 Gradable
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  ICD-10 CODE
                </span>
                <span className="text-2xl font-extrabold text-[#0c1236]">
                  {rightEyeAnalysis.icdCode}
                </span>
                <span className="text-xs text-slate-500 font-medium block mt-0.5">
                  Mod. NPDR with Macular Risk
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  RECOMMENDED ACTION
                </span>
                <span className="text-xs font-bold text-[#8b0000] block mt-1">
                  {rightEyeAnalysis.recommendedAction}
                </span>
                <span className="text-xs text-rose-600 font-semibold block mt-0.5">
                  Priority 2 Referral
                </span>
              </div>
            </div>

            {/* Actions to proceed */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setHasAnalyzed(false);
                  setRightEyeAnalysis(prev => ({ ...prev, isCompleted: false }));
                }}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Retake Right Eye
              </button>

              <button
                onClick={() => navigate('/new-screening/results')}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                <span>Proceed to Both Eyes Results</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
