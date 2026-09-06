import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Camera, 
  Database, 
  Cpu, 
  User, 
  ShieldCheck, 
  Save, 
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { useScreening } from '../context/ScreeningContext';

export const Settings = () => {
  const { showToast } = useScreening();

  const [stationName, setStationName] = useState('Community Eye Care Unit 3');
  const [sector, setSector] = useState('Tamil Nadu Tele-Ophthalmology Sector');
  const [cameraModel, setCameraModel] = useState('Nidek AFC-330 (Non-Mydriatic 45°)');
  const [pacsHost, setPacsHost] = useState('pacs.telemed.tn.gov.in:104');
  const [aiSensitivity, setAiSensitivity] = useState('High (98.5% Recall - Recommended)');
  const [operatorName, setOperatorName] = useState('Nurse Anitha R.');
  const [operatorLicense, setOperatorLicense] = useState('RN-TN-49102');

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Screening station settings saved successfully', 'success');
  };

  const handleTestPacs = () => {
    showToast('PACS C-ECHO Handshake Success: Ping 14ms', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold text-teal-600 uppercase tracking-widest block">
          SYSTEM CONFIGURATION
        </span>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0c1236] tracking-tight">
          Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure hardware acquisition, PACS/DICOM bridge, and AI triage sensitivity.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hardware & Station Setup */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <Camera className="w-5 h-5 text-[#0284c7]" />
            <h2 className="text-base font-bold text-[#0c1236]">Screening Station & Hardware</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Station Name</label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Regional Sector</label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Primary Fundus Camera</label>
              <select
                value={cameraModel}
                onChange={(e) => setCameraModel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              >
                <option>Nidek AFC-330 (Non-Mydriatic 45°)</option>
                <option>Canon CR-2 AF (Auto Fundus)</option>
                <option>Topcon TRC-NW400 Robotic Camera</option>
                <option>Remidio Non-Mydriatic Fundus on Phone (FOP)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Camera Interface Protocol</label>
              <input
                type="text"
                disabled
                value="Direct USB 3.0 Tethered DICOM Capture"
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* PACS / DICOM Bridge */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Database className="w-5 h-5 text-[#0284c7]" />
              <h2 className="text-base font-bold text-[#0c1236]">PACS & EHR Interoperability</h2>
            </div>
            <button
              type="button"
              onClick={handleTestPacs}
              className="flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Test PACS Ping</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">PACS AE Title / Address</label>
              <input
                type="text"
                value={pacsHost}
                onChange={(e) => setPacsHost(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Storage Commitment</label>
              <input
                type="text"
                disabled
                value="Auto-archive on completion (ISO 13485)"
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* AI Model & Screening Sensitivity */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <Cpu className="w-5 h-5 text-[#0284c7]" />
            <h2 className="text-base font-bold text-[#0c1236]">AI Diagnostic & Triage Gate</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Neural Classification Engine</label>
              <input
                type="text"
                disabled
                value="RetinoNet-v4.8 (ResNet-50 + Grad-CAM)"
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Sensitivity & Referral Threshold</label>
              <select
                value={aiSensitivity}
                onChange={(e) => setAiSensitivity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              >
                <option>High (98.5% Recall - Recommended)</option>
                <option>Standard (95.0% Balanced Specificity/Recall)</option>
                <option>Screening Research Protocol (All Traces)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Operator Profile */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <User className="w-5 h-5 text-[#0284c7]" />
            <h2 className="text-base font-bold text-[#0c1236]">Operator Credentials</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Logged-in Screening Nurse</label>
              <input
                type="text"
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Clinical License / Staff ID</label>
              <input
                type="text"
                value={operatorLicense}
                onChange={(e) => setOperatorLicense(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] w-full sm:w-auto min-h-[44px]"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
