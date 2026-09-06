import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle, 
  Activity, 
  FileText, 
  ArrowRight, 
  Sparkles,
  Download,
  AlertCircle,
  Eye,
  RefreshCw,
  Camera
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { useScreening } from '../context/ScreeningContext';

export const AnalyzeLeftEye = () => {
  const navigate = useNavigate();
  const { 
    selectedPatient, 
    leftEyeImage, 
    leftEyeFileMeta, 
    leftEyeQuality,
    leftEyeAnalysis,
    setLeftEyeAnalysis,
    showToast 
  } = useScreening();

  const [zoomLevel, setZoomLevel] = useState(1);
  const [showOverlays, setShowOverlays] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [hasAnalyzed, setHasAnalyzed] = useState(leftEyeAnalysis.isCompleted);

  const stepsList = [
    'Image preprocessing & normalization',
    'Retinal vascular segmentation',
    'Macular & foveal boundary detection',
    'Deep feature extraction (ResNet-50)',
    'Generating Grad-CAM attention activation',
    'Synthesizing clinical ICD-10 classification'
  ];

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
            setLeftEyeAnalysis(prev => ({ ...prev, isCompleted: true }));
            showToast('Left Eye Analysis Completed: Normal Retinopathy (97.8% Confidence)', 'success');
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
            {hasAnalyzed ? 'Left Eye Diagnostic Evaluation' : 'Left Eye Quality Validation'}
          </h1>
        </div>

        <WorkflowStepper currentStep={2} />
      </div>

      {/* Patient Selected Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold text-xs">
            OS
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800">
              {selectedPatient?.name || 'Arun Kumar'} ({selectedPatient?.id || 'PAT-10284'})
            </span>
            <span className="text-xs text-slate-500 ml-2">
              Left Eye (O.S. - Oculus Sinister) • 45° Non-Mydriatic
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="inline-flex items-center gap-1 text-emerald-600">
            <CheckCircle className="w-3.5 h-3.5" />
            AI Quality Gate: PASSED
          </span>
          <Link
            to={`/patients/${selectedPatient?.id || 'PAT-10284'}`}
            className="text-[#0284c7] hover:underline"
          >
            View Dossier
          </Link>
        </div>
      </div>

      {/* Main Clinical Viewer / Analysis Section */}
      {!hasAnalyzed && !isAnalyzing ? (
        <div className="space-y-6">
          {/* Clinical Image Viewer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-4">
            {/* Viewer Top Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0c1236] tracking-wide">
                  LEFT EYE (O.S. - OCULUS SINISTER)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-[#0284c7]">
                  Macular Centration 45°
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    showOverlays 
                      ? 'bg-sky-50 text-[#0284c7] border-sky-200' 
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  HUD Overlays: {showOverlays ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setZoomLevel(z => Math.max(0.8, z - 0.2))}
                  className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(z => Math.min(2.2, z + 0.2))}
                  className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs"
                  title="Reset Fit"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Viewer Display Window */}
            <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[460px] bg-[#070a1a] rounded-2xl overflow-hidden flex items-center justify-center shadow-inner select-none border border-slate-900">
              {/* Fundus Image with transform zoom */}
              <motion.div
                style={{ scale: zoomLevel }}
                className="relative max-h-full aspect-square flex items-center justify-center p-2"
              >
                <img
                  src={leftEyeImage}
                  alt="Left Eye Fundus"
                  className="max-h-[280px] sm:max-h-[360px] lg:max-h-[440px] max-w-full object-contain rounded-full border border-orange-500/20 shadow-2xl"
                />

                {/* Clinical Overlays & Reticles */}
                {showOverlays && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {/* Outer 45 degree boundary circle */}
                    <div className="w-[230px] h-[230px] sm:w-[300px] sm:h-[300px] lg:w-[360px] lg:h-[360px] rounded-full border border-sky-400/40 border-dashed animate-pulse-subtle" />

                    {/* Fovea central reticle */}
                    <div className="absolute top-[48%] left-[54%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-emerald-400/70 border-dashed flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="mt-0.5 sm:mt-1 px-1 sm:px-1.5 py-0.5 rounded bg-black/70 text-[8px] sm:text-[9px] font-bold text-emerald-300 tracking-wider">
                        FOVEA
                      </span>
                    </div>

                    {/* Optic Disc reticle */}
                    <div className="absolute top-[44%] left-[22%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-sky-400/80 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-sky-400" />
                      </div>
                      <span className="mt-0.5 sm:mt-1 px-1 sm:px-1.5 py-0.5 rounded bg-black/70 text-[8px] sm:text-[9px] font-bold text-sky-300 tracking-wider">
                        DISC (OD)
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Viewer HUD Info Cards (Top Left & Top Right) */}
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-black/70 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-left border border-white/10 text-white space-y-0.5 max-w-[45%]">
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block uppercase truncate">
                  ACQUISITION
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-sky-200 block truncate">
                  Fundus 45° Non-Myd
                </span>
              </div>

              <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-right border border-white/10 text-white space-y-0.5 max-w-[45%]">
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block uppercase truncate">
                  CALIBRATION
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-emerald-300 block truncate">
                  Sharpness 98.4%
                </span>
              </div>
            </div>

            {/* Bottom verified image pill bar */}
            <div className="bg-[#f6f5fe] rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="font-bold text-[#0c1236]">{leftEyeFileMeta.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0284c7] text-white">
                  VERIFIED
                </span>
                <span className="text-slate-500">
                  {leftEyeFileMeta.size} • {leftEyeFileMeta.dimensions}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/new-screening/left-eye')}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 min-h-[40px] sm:min-h-0"
                >
                  <RefreshCw className="w-3 h-3 text-slate-500" />
                  <span>Replace Image</span>
                </button>
                <button
                  onClick={() => showToast('Frame re-synchronized with camera', 'info')}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 min-h-[40px] sm:min-h-0"
                >
                  <Camera className="w-3 h-3 text-slate-500" />
                  <span>Re-fetch Camera</span>
                </button>
              </div>
            </div>
          </div>

          {/* Automated Quality Gate 4 Cards */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0c1236]">Automated Quality Gate</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pre-inference geometric and optic validation metrics
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                READY FOR SCREENING
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Retina Detected */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  RETINA DETECTED
                </span>
                <span className="text-2xl font-extrabold text-[#0c1236]">
                  {leftEyeQuality.retinaDetected}
                </span>
                <span className="text-xs text-emerald-600 font-medium block">
                  {leftEyeQuality.retinaNote}
                </span>
              </div>

              {/* Card 2: Resolution */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  RESOLUTION
                </span>
                <span className="text-2xl font-extrabold text-[#0c1236]">
                  {leftEyeQuality.resolution}
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  {leftEyeQuality.resNote}
                </span>
              </div>

              {/* Card 3: Centration */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  CENTRATION
                </span>
                <span className="text-2xl font-extrabold text-[#0c1236]">
                  {leftEyeQuality.centration}
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  {leftEyeQuality.centrationNote}
                </span>
              </div>

              {/* Card 4: Artifact Analysis */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  ARTIFACT ANALYSIS
                </span>
                <span className="text-2xl font-extrabold text-[#0c1236]">
                  {leftEyeQuality.artifact}
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  {leftEyeQuality.artifactNote}
                </span>
              </div>
            </div>

            {/* Bottom Action strip */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Image ready for neural classification. Optical parameters verified against clinical benchmarks.
              </div>

              <button
                onClick={handleStartAnalysis}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] w-full sm:w-auto min-h-[44px] sm:min-h-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze Left Eye →</span>
              </button>
            </div>
          </div>
        </div>
      ) : isAnalyzing ? (
        /* Progress Simulation State */
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-100 shadow-clinical text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center mx-auto shadow-inner animate-spin">
            <Activity className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#0c1236]">
              Analyzing Retinal Image...
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Executing multi-stage neural screening protocol (Field 2 Macular scan)
            </p>
          </div>

          {/* Progress step checklist */}
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
        /* Completed AI Analysis View (Section 12) */
        <div className="space-y-6">
          {/* Side-by-side Retinal Image & AI Attention Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Original Fundus Photograph */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-[#0c1236]">Retinal Image</h3>
                  <p className="text-xs text-slate-500">Original Fundus Photograph (Field 2 - Macula-centered)</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                  RAW 45°
                </span>
              </div>

              <div className="relative aspect-square max-h-[280px] sm:max-h-[340px] lg:max-h-[360px] w-full mx-auto bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-slate-900 shadow-inner">
                <img
                  src={leftEyeImage}
                  alt="Original Fundus"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-4 text-center text-xs text-slate-500">
                Left Eye (O.S.) • Sharpness 98.4%
              </div>
            </div>

            {/* Right: AI Attention Map (Grad-CAM) */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-[#0c1236]">AI Attention Map</h3>
                  <p className="text-xs text-slate-500">Deep Learning Attention Activation Map</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-[#0284c7] border border-sky-200">
                  ResNet-50 + Grad-CAM
                </span>
              </div>

              {/* Heatmap overlay image container */}
              <div className="relative aspect-square max-h-[280px] sm:max-h-[340px] lg:max-h-[360px] w-full mx-auto bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-slate-900 shadow-inner">
                <img
                  src={leftEyeImage}
                  alt="Fundus Heatmap base"
                  className="w-full h-full object-contain filter brightness-90 contrast-125"
                />

                {/* Synthetic Grad-CAM heat aura */}
                <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-color-dodge bg-radial from-emerald-400 via-sky-500 to-transparent" />
                <div className="absolute w-36 h-36 rounded-full top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-blue-500/40 filter blur-xl pointer-events-none" />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-2">
                <span>Activation Focus: Foveal & Vascular arcade</span>
                <span className="font-semibold text-[#0284c7]">Peak Attention: 0.89</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Evaluation Card */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  DIAGNOSTIC EVALUATION
                </span>
                <h3 className="text-xl font-bold text-[#0c1236] mt-0.5">
                  {leftEyeAnalysis.title}
                </h3>
              </div>

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white tracking-wider self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                {leftEyeAnalysis.result}
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              {leftEyeAnalysis.findings}
            </p>

            {/* 4 Metric Pill Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  AI MODEL CONFIDENCE
                </span>
                <span className="text-2xl font-extrabold text-[#0c1236]">
                  {leftEyeAnalysis.confidence}
                </span>
                <span className="text-xs text-emerald-600 font-semibold block mt-0.5">
                  High Certainty
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  IMAGE GRADABILITY
                </span>
                <span className="text-2xl font-extrabold text-[#0c1236]">
                  {leftEyeAnalysis.gradability}
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
                  {leftEyeAnalysis.icdCode}
                </span>
                <span className="text-xs text-slate-500 font-medium block mt-0.5">
                  Type 2 DM w/o DR
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  RECOMMENDED ACTION
                </span>
                <span className="text-sm font-bold text-[#0c1236] block mt-1">
                  {leftEyeAnalysis.recommendedAction}
                </span>
                <span className="text-xs text-slate-500 font-medium block mt-0.5">
                  12-Month Recall
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <Link
                  to={`/patients/${selectedPatient?.id || 'PAT-10284'}`}
                  className="px-4 py-2.5 sm:py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center min-h-[44px] sm:min-h-0 flex items-center justify-center"
                >
                  View Patient History
                </Link>
                <button
                  onClick={() => showToast('Generated mock Left Eye Tele-Report (PDF)', 'success')}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors min-h-[44px] sm:min-h-0"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Left Eye Tele-Report</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setHasAnalyzed(false);
                    setLeftEyeAnalysis(prev => ({ ...prev, isCompleted: false }));
                  }}
                  className="px-4 py-2.5 sm:py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center min-h-[44px] sm:min-h-0"
                >
                  Retake Left Eye
                </button>
                <button
                  onClick={() => navigate('/new-screening/right-eye')}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-sm transition-all active:scale-[0.98] min-h-[44px] sm:min-h-0"
                >
                  <span>Continue to Right Eye</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
