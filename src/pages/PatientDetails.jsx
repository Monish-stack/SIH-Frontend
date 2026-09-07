import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  Activity, 
  FileText, 
  Download, 
  Plus, 
  Edit3,
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Eye 
} from 'lucide-react';
import { patientsData, patientLongitudinalHistory } from '../data/patients';
import { StatusBadge } from '../components/common/StatusBadge';
import { useScreening } from '../context/ScreeningContext';

export const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, setSelectedPatient, showToast } = useScreening();

  const patient = (patients || []).find(p => p.id === id) || patientsData.find(p => p.id === id) || patientsData[0];

  const handleStartScreening = () => {
    setSelectedPatient(patient);
    navigate('/new-screening/left-eye');
  };

  return (
    <div className="space-y-6">
      {/* Top Header of Detail Card matching Screenshot */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-slate-200 shadow-clinical space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-3">
            <button
              onClick={() => navigate('/patients')}
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-2xs transition-colors flex-shrink-0 cursor-pointer mt-0.5 sm:mt-0"
              title="Back to Patients Registry"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0c1236]">
                  {patient.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-sky-100 text-[#0284c7]">
                  {patient.id}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#8b0000] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  {patient.triagePriority || 'High Clinical Priority'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {patient.age} Yrs • {patient.gender} • Contact: {patient.altPhone || patient.phone} • Last Visited: {patient.lastScreeningDate || 'Today, 10:42 AM'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => showToast('Editing patient profile details...', 'info')}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors min-h-[44px] sm:min-h-0 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Details</span>
            </button>
            <button
              onClick={() => showToast('Downloading complete patient clinical dossier (PDF)', 'success')}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors min-h-[44px] sm:min-h-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download Dossier</span>
            </button>
            <button
              onClick={handleStartScreening}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shadow-sm transition-colors min-h-[44px] sm:min-h-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Start New Screening</span>
            </button>
          </div>
        </div>

        {/* 3-Column Dossier Information matching Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Demographic File */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Demographic File
            </h3>
            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Full Name</span>
                <span className="font-bold text-slate-900">{patient.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Patient ID</span>
                <span className="font-bold text-slate-900">{patient.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Date of Birth</span>
                <span className="font-semibold text-slate-800">{patient.dob}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Gender</span>
                <span className="font-semibold text-slate-800">{patient.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Phone</span>
                <span className="font-semibold text-slate-800">{patient.altPhone || patient.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Residential Address</span>
                <span className="font-semibold text-slate-800">{patient.address}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Medical History */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Medical History
            </h3>
            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Diabetes Status</span>
                <span className="font-bold text-indigo-700">Type 2 DM ({patient.duration || '8 Yrs Duration'})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Hypertension</span>
                <span className="font-semibold text-slate-800">{patient.hypertension}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">BP</span>
                <span className="font-semibold text-slate-800">{patient.bp}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Insulin Dependent</span>
                <span className="font-semibold text-slate-800">{patient.insulinDependent || 'No'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Medication</span>
                <span className="font-semibold text-slate-800">{patient.medication || 'Oral Metformin (500mg BD)'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Current HbA1c</span>
                <span className="font-bold text-[#8b0000]">{patient.hba1c} ({patient.hba1cRisk || 'Elevated Risk'})</span>
              </div>
            </div>
          </div>

          {/* Column 3: Recent Fundus AI Scan */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Recent Fundus AI Scan
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-[#0284c7]">
                  {patient.recentFundusEye || 'Right OD'}
                </span>
              </div>

              <div className="relative aspect-video max-h-[140px] w-full bg-black rounded-xl overflow-hidden border border-slate-300">
                <img
                  src={patient.recentFundusEye?.includes('Left') ? '/assets/fundus/left_eye_normal.jpg' : '/assets/fundus/right_eye_npdr.jpg'}
                  alt="Recent Fundus Scan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Camera:</span>
                <span className="font-bold text-slate-900">{patient.captureStation || 'Canon CR-2 AF'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Verification:</span>
                <span className="font-bold text-emerald-700">{patient.dicomStatus || 'DICOM Verified'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screening Longitudinal History matching Screenshot */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-[#0c1236]">
            SCREENING LONGITUDINAL HISTORY
          </h3>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Date / Session</th>
                  <th className="py-2.5 px-3">Left Eye</th>
                  <th className="py-2.5 px-3">Right Eye</th>
                  <th className="py-2.5 px-3 text-center">Overall AI Classification</th>
                  <th className="py-2.5 px-3 text-right">Diagnostic Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {patientLongitudinalHistory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-semibold text-slate-800">{item.session}</td>
                    <td className="py-3 px-3 text-emerald-700 font-medium">{item.leftEye}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      <span className={item.rightEye.includes('NPDR') ? 'text-[#8b0000] font-bold' : 'text-slate-700'}>
                        {item.rightEye}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <StatusBadge text={item.overall} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => showToast(`Opening ${item.reportId}`, 'info')}
                        className="inline-flex items-center gap-1 text-[#0284c7] font-semibold hover:underline cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{item.reportId}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-3">
            {patientLongitudinalHistory.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{item.session}</span>
                  <StatusBadge text={item.overall} />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Left Eye</span>
                    <span className="font-semibold text-emerald-700">{item.leftEye}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Right Eye</span>
                    <span className={`font-semibold ${item.rightEye.includes('NPDR') ? 'text-[#8b0000]' : 'text-slate-700'}`}>
                      {item.rightEye}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => showToast(`Opening ${item.reportId}`, 'info')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[#0284c7] font-semibold text-xs min-h-[36px] cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{item.reportId}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bilateral Comparison Viewer */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-4">
        <h2 className="text-lg font-bold text-[#0c1236]">
          Recent Bilateral Fundus Scans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Left Eye (O.S.) - Macula Centered</span>
              <span className="text-emerald-600 font-semibold">NORMAL (97.8%)</span>
            </div>
            <div className="relative aspect-video max-h-[220px] bg-black rounded-2xl overflow-hidden border border-slate-800">
              <img src="/assets/fundus/left_eye_normal.jpg" alt="Left Eye" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Right Eye (O.D.) - Temporal Arcade</span>
              <span className="text-[#8b0000] font-bold">MODERATE NPDR (91.2%)</span>
            </div>
            <div className="relative aspect-video max-h-[220px] bg-black rounded-2xl overflow-hidden border border-slate-800">
              <img src="/assets/fundus/right_eye_npdr.jpg" alt="Right Eye" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
