import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FolderUp, 
  CheckCircle, 
  Eye, 
  Edit3, 
  FileText, 
  RefreshCw, 
  Camera, 
  ArrowRight,
  ShieldCheck,
  ImageIcon
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { useScreening } from '../context/ScreeningContext';

export const UploadLeftEye = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const { 
    selectedPatient, 
    leftEyeImage, 
    leftEyeFileMeta, 
    handleUploadLeftEye,
    leftEyeQuality,
    showToast 
  } = useScreening();

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
      handleUploadLeftEye(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadLeftEye(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Stepper matching Screenshot 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest leading-none">
              NEW SCREENING
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest leading-none">
                PROTOCOL
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
            </div>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0c1236] tracking-tight mt-1">
            Upload Left Eye
          </h1>
        </div>

        <WorkflowStepper currentStep={2} />
      </div>

      {/* Patient Selected Information Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* Cyan checkmark square */}
          <div className="w-10 h-10 rounded-xl bg-[#48c9e8] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <CheckCircle className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-[#0284c7] border border-sky-200 uppercase tracking-wider">
                PATIENT SELECTED
              </span>
              <span className="text-xs font-semibold text-slate-500">
                MRN: {selectedPatient?.id || 'PAT-10284'}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm font-bold text-[#0c1236] flex-wrap">
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

        {/* Right Actions: View Patient History & Change */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <Link
            to={`/patients/${selectedPatient?.id || 'PAT-10284'}`}
            className="flex items-center gap-1.5 text-slate-600 hover:text-[#0284c7] transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>View Patient History</span>
          </Link>
          <button
            onClick={() => navigate('/new-screening')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-[#0284c7] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            <span>Change</span>
          </button>
        </div>
      </div>

      {/* Main Upload Dropzone Container matching Screenshot 3 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-5">
        {/* Large dashed-border dropzone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative border-2 border-dashed rounded-3xl p-10 lg:p-14 text-center transition-all ${
            isDragging
              ? 'border-[#0284c7] bg-sky-50/50 scale-[1.005]'
              : 'border-[#0284c7] bg-[#ffffff] hover:bg-slate-50/30'
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
            {/* Center Folder/Image icon circle */}
            <div className="w-16 h-16 rounded-full bg-[#dcf3f9] text-slate-500 flex items-center justify-center shadow-xs">
              <FolderUp className="w-8 h-8 text-slate-500" />
            </div>

            <h3 className="text-lg font-bold text-[#0c1236]">
              Drop fundus images here
            </h3>

            <p className="text-xs text-slate-500">
              Drag & drop JPG or PNG fundus photographs, or browse to upload
            </p>

            {/* Browse Files Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-xs transition-all duration-150 active:scale-[0.98]"
              >
                Browse Files
              </button>
            </div>

            <p className="text-[11px] text-slate-400 pt-1">
              Supported: JPG, PNG, TIFF • Max 20MB per Image • Multiple images supported
            </p>
          </div>
        </div>

        {/* Uploaded Image Card matching Screenshot 3 exactly */}
        <div className="bg-[#f4f2fe] rounded-2xl p-4 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#48c9e8] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <ImageIcon className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0c1236]">
                  {leftEyeFileMeta.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#38bdf8] text-white uppercase tracking-wider">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {leftEyeFileMeta.size} • {leftEyeFileMeta.type} ({leftEyeFileMeta.dimensions}) • Color Depth {leftEyeFileMeta.depth}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Replace Image</span>
            </button>

            <button
              onClick={() => showToast('Re-fetching latest live frame from Canon/Nidek camera...', 'info')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-slate-500" />
              <span>Re-fetch Camera</span>
            </button>
          </div>
        </div>

        {/* Action to proceed to Validation & Analysis */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0c1236]">
                Automated Quality Gate: {leftEyeQuality.status}
              </h4>
              <p className="text-[11px] text-slate-500">
                100% field coverage • 3840px resolution • Macula Centration 45°
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/new-screening/left-eye/analyzing')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-[0.98]"
          >
            <span>Analyze Left Eye →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
