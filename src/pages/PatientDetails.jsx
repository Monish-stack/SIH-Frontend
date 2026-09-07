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
      {/* Back button & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/patients')}
            className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[11px] font-bold text-teal-600 uppercase tracking-widest block">
              PATIENT DOSSIER & RETINAL RECORD
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0c1236]">
              {patient.name} ({patient.id})
            </h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => showToast('Dossier exported to hospital DICOM/EHR repository', 'success')}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs min-h-[44px] sm:min-h-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Record</span>
          </button>
          <button
            onClick={handleStartScreening}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 sm:py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shadow-sm min-h-[44px] sm:min-h-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Start Screening Protocol</span>
          </button>
        </div>
      </div>

      {/* Patient Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Demographics */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Demographic Information
          </h2>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Date of Birth:</span>
              <span className="font-semibold text-slate-900">{patient.dob}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Age & Gender:</span>
              <span className="font-semibold text-slate-900">{patient.age} Yrs / {patient.gender}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Blood Group:</span>
              <span className="font-semibold text-rose-600">{patient.blood}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Primary Phone:</span>
              <span className="font-semibold text-slate-900">{patient.phone}</span>
            </div>
            <div className="py-1">
              <span className="text-slate-400 block mb-0.5">Address:</span>
              <span className="font-medium text-slate-800">{patient.address}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Systemic History */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Systemic & Metabolic Profile
          </h2>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Diabetes Status:</span>
              <span className="font-bold text-indigo-700">{patient.systemicCondition}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Duration:</span>
              <span className="font-semibold text-slate-900">{patient.duration}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Hypertension:</span>
              <span className="font-semibold text-slate-900">{patient.hypertension}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Blood Pressure:</span>
              <span className="font-semibold text-slate-900">{patient.bp}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">HbA1c:</span>
              <span className="font-bold text-[#8b0000]">{patient.hba1c} ({patient.hba1cRisk})</span>
            </div>
          </div>
        </div>

        {/* Card 3: Screening Status */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Triage & Referral Urgency
          </h2>
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1.5">
            <span className="font-bold text-rose-950 block">High Clinical Priority</span>
            <p className="text-rose-800">
              Referral indicated to ophthalmology for bilateral examination and macular evaluation.
            </p>
          </div>
          <div className="text-xs space-y-1 pt-1 text-slate-600">
            <div>Last Intake: <strong className="text-slate-800">{patient.lastScreeningDate}</strong></div>
            <div>Capture Hardware: <strong className="text-slate-800">{patient.captureStation}</strong></div>
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

      {/* Longitudinal History */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-4">
        <h2 className="text-lg font-bold text-[#0c1236]">
          Screening Longitudinal History
        </h2>

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
                  <td className="py-3 px-3 font-medium text-slate-800">{item.rightEye}</td>
                  <td className="py-3 px-3 text-center">
                    <StatusBadge text={item.overall} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => showToast(`Opening ${item.reportId}`, 'info')}
                      className="inline-flex items-center gap-1 text-[#0284c7] font-semibold hover:underline"
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
                  <span className="font-semibold text-slate-800">{item.rightEye}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => showToast(`Opening ${item.reportId}`, 'info')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[#0284c7] font-semibold text-xs min-h-[36px]"
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
  );
};
