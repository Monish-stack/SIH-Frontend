import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Download, 
  UserPlus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  FileText, 
  Eye, 
  Edit3, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  ArrowRight,
  X
} from 'lucide-react';
import { patientLongitudinalHistory } from '../data/patients';
import { StatusBadge } from '../components/common/StatusBadge';
import { useScreening } from '../context/ScreeningContext';
import { AddNewPatientModal } from '../components/common/AddNewPatientModal';

export const Patients = () => {
  const navigate = useNavigate();
  const { patients, addPatient, setSelectedPatient, showToast } = useScreening();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('PAT-10284');
  const [statusFilter, setStatusFilter] = useState('All Cases');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const pageSize = 5;

  // Selected patient for the featured active card
  const activePatient = (patients || []).find(p => p.id === selectedPatientId) || (patients && patients[0]);

  const filteredPatients = (patients || []).filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter === 'Referable') {
      return p.lastScreeningResult?.toLowerCase().includes('referable');
    }
    if (statusFilter === 'Review') {
      return p.lastScreeningResult?.toLowerCase().includes('review') || p.lastScreeningResult?.toLowerCase().includes('mild');
    }
    if (statusFilter === 'Normal') {
      return p.lastScreeningResult?.toLowerCase().includes('normal');
    }
    return true;
  });

  const totalPages = Math.ceil(filteredPatients.length / pageSize) || 1;
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleStartScreeningForPatient = (patient) => {
    setSelectedPatient(patient);
    navigate('/new-screening/left-eye');
  };

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-teal-600 uppercase tracking-widest block">
            TRIAGE REGISTRY
          </span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0c1236] tracking-tight">
            Patients
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Search and manage patient screening records • Community Eye Care Unit 3 (Tamil Nadu Sector)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => showToast('Exporting Patients Directory (CSV / DICOM Index)', 'success')}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs transition-colors min-h-[44px] sm:min-h-0"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Directory</span>
          </button>
          <button
            onClick={() => setIsAddPatientOpen(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shadow-sm transition-all hover:shadow cursor-pointer min-h-[44px] sm:min-h-0 active:scale-95"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Add New Patient</span>
          </button>
        </div>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Patients
          </span>
          <span className="text-3xl font-extrabold text-[#0c1236] block mt-2">
            {242 + (patients ? patients.length : 6)}
          </span>
          <span className="text-xs text-emerald-600 font-semibold block mt-1">+12 this month</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Screened Today
          </span>
          <span className="text-3xl font-extrabold text-[#0c1236] block mt-2">42</span>
          <span className="text-xs text-sky-600 font-semibold block mt-1">On schedule</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-clinical">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Pending Review
          </span>
          <span className="text-3xl font-extrabold text-[#0c1236] block mt-2">5</span>
          <span className="text-xs text-amber-600 font-semibold block mt-1">Requires physician signoff</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-clinical space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patient name, ID, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 sm:py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0284c7] focus:border-[#0284c7]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
            >
              <option value="All Cases">Status: All Cases</option>
              <option value="Referable">Status: Referable</option>
              <option value="Review">Status: Review Required</option>
              <option value="Normal">Status: Normal</option>
            </select>

            <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none">
              <option>Period: All Time</option>
              <option>Past 30 Days</option>
              <option>This Year</option>
            </select>

            <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none">
              <option>Sort: Recent First</option>
              <option>Sort: Priority</option>
              <option>Sort: Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Patient Detail Card (Arun Kumar) */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-100 shadow-clinical space-y-6">
        {/* Top Header of Detail Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0c1236]">
                {activePatient.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-sky-100 text-[#0284c7]">
                {activePatient.id}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#8b0000] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                {activePatient.triagePriority}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {activePatient.age} Yrs • {activePatient.gender} • Contact: {activePatient.altPhone || activePatient.phone} • Last Visited: Today, 10:42 AM
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => showToast('Editing patient profile details...', 'info')}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors min-h-[44px] sm:min-h-0"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Details</span>
            </button>
            <button
              onClick={() => showToast('Downloading complete patient clinical dossier (PDF)', 'success')}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors min-h-[44px] sm:min-h-0"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download Dossier</span>
            </button>
            <button
              onClick={() => handleStartScreeningForPatient(activePatient)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shadow-sm transition-colors min-h-[44px] sm:min-h-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Start New Screening</span>
            </button>
          </div>
        </div>

        {/* 3-Column Dossier Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Demographic File */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Demographic File
            </h3>
            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Full Name</span>
                <span className="font-bold text-slate-900">{activePatient.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Patient ID</span>
                <span className="font-bold text-slate-900">{activePatient.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Date of Birth</span>
                <span className="font-semibold text-slate-800">{activePatient.dob}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Gender</span>
                <span className="font-semibold text-slate-800">{activePatient.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Phone</span>
                <span className="font-semibold text-slate-800">{activePatient.altPhone || activePatient.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Residential Address</span>
                <span className="font-semibold text-slate-800">{activePatient.address}</span>
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
                <span className="font-bold text-indigo-700">Type 2 DM ({activePatient.duration})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Hypertension</span>
                <span className="font-semibold text-slate-800">{activePatient.hypertension}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">BP</span>
                <span className="font-semibold text-slate-800">{activePatient.bp}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Insulin Dependent</span>
                <span className="font-semibold text-slate-800">{activePatient.insulinDependent}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Medication</span>
                <span className="font-semibold text-slate-800">{activePatient.medication}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Current HbA1c</span>
                <span className="font-bold text-[#8b0000]">{activePatient.hba1c} ({activePatient.hba1cRisk})</span>
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
                  Right OD
                </span>
              </div>

              <div className="relative aspect-video max-h-[140px] w-full bg-black rounded-xl overflow-hidden border border-slate-300">
                <img
                  src="/assets/fundus/right_eye_npdr.jpg"
                  alt="Recent Fundus Scan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Camera:</span>
                <span className="font-bold text-slate-900">{activePatient.captureStation}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Verification:</span>
                <span className="font-bold text-emerald-700">{activePatient.dicomStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screening Longitudinal History */}
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
                    <span className={`font-semibold ${item.rightEye.includes('NPDR') ? 'text-[#8b0000]' : 'text-slate-700'}`}>
                      {item.rightEye}
                    </span>
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

      {/* ALL PATIENTS Table */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-clinical space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 className="text-lg font-bold text-[#0c1236]">ALL PATIENTS</h3>
            <p className="text-xs text-slate-500">Registry directory for Community Eye Care Unit 3</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Total {filteredPatients.length} records
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Patient ID</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4 text-center">Age / Gender</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Condition</th>
                <th className="py-3 px-4 text-center">Last Screening</th>
                <th className="py-3 px-4 text-center">Result</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {paginatedPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">{patient.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{patient.name}</td>
                  <td className="py-3.5 px-4 text-center text-slate-600">{patient.age} / {patient.gender}</td>
                  <td className="py-3.5 px-4 text-slate-600">{patient.phone}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                      {patient.systemicCondition}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-600">{patient.lastScreeningDate}</td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge text={patient.lastScreeningResult} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/patients/${patient.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-[#0284c7] hover:text-white rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                    >
                      <span>View Patient</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden space-y-3">
          {paginatedPatients.map((patient) => (
            <div key={patient.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-sky-100 text-[#0284c7]">
                    {patient.id}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
                </div>
                <StatusBadge text={patient.lastScreeningResult} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Age / Gender</span>
                  <span className="font-medium text-slate-800">{patient.age} Yrs • {patient.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone</span>
                  <span className="font-medium text-slate-800">{patient.phone}</span>
                </div>
              </div>

              <div className="text-[11px]">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Condition</span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium inline-block mt-0.5">
                  {patient.systemicCondition}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500">
                  Last: <strong className="text-slate-700">{patient.lastScreeningDate}</strong>
                </span>
                <Link
                  to={`/patients/${patient.id}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0284c7] text-white rounded-xl text-xs font-bold shadow-xs min-h-[44px]"
                >
                  <span>View Patient</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 gap-2">
          <div>Showing {paginatedPatients.length} of {filteredPatients.length} patients</div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center text-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-bold text-slate-800">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center text-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add New Patient Registration Modal */}
      <AddNewPatientModal
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        onPatientAdded={(newPatient, immediateScreening) => {
          addPatient(newPatient);
          setSelectedPatientId(newPatient.id);
          setSearchQuery(newPatient.name);
          if (immediateScreening) {
            setSelectedPatient(newPatient);
            navigate('/new-screening/left-eye');
          }
        }}
      />
    </div>
  );
};
