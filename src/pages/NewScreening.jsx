import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  X, 
  Database, 
  Calendar, 
  CheckCircle2, 
  User, 
  Droplet, 
  Phone, 
  UserPlus, 
  RefreshCw,
  Clock,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { useScreening } from '../context/ScreeningContext';
import { patientsData } from '../data/patients';

export const NewScreening = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || 'Kumar';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [filterType, setFilterType] = useState('all');
  const { setSelectedPatient, showToast } = useScreening();

  const filteredPatients = patientsData.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch && searchTerm) return false;

    if (filterType === 'today') {
      return p.status.toLowerCase().includes('today') || p.status.toLowerCase().includes('scheduled');
    }
    if (filterType === 'urgent') {
      return p.triagePriority.toLowerCase().includes('high') || p.status.toLowerCase().includes('urgent');
    }
    return true;
  });

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    showToast(`Selected Patient: ${patient.name} (${patient.id})`, 'success');
    navigate('/new-screening/left-eye');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Workflow Stepper matching Screenshot 2 */}
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
            New Screening
          </h1>
        </div>

        <WorkflowStepper currentStep={1} />
      </div>

      {/* Main Content Area */}
      <div className="space-y-5">
        {/* Find Patient Header & PACS badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#0c1236]">Find Patient</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Search for an existing patient or register a new patient.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#dcf3f9] text-[#0284c7] text-xs font-bold">
            <Database className="w-3.5 h-3.5" />
            <span>Local DB & PACS Linked</span>
          </div>
        </div>

        {/* Search Input Box with soft lavender background */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient name, ID, or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3 text-xs bg-[#f6f5fe] border border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7] transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills and Matching Count */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilterType('all')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All Patients</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                filterType === 'all' ? 'bg-[#0369a1] text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                142
              </span>
            </button>

            <button
              onClick={() => setFilterType('today')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === 'today'
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Scheduled Today (14)</span>
            </button>

            <button
              onClick={() => setFilterType('urgent')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === 'urgent'
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Urgent Follow-up 3</span>
            </button>
          </div>

          <span className="text-xs font-medium text-slate-500">
            {filteredPatients.length} matching records
          </span>
        </div>

        {/* Patient Cards List matching Screenshot 2 */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => {
            const isArun = patient.id === 'PAT-10284' || patient.id === 'PAT-10342';
            return (
              <div
                key={patient.id}
                className={`bg-white rounded-2xl p-5 border transition-all duration-150 shadow-xs ${
                  isArun ? 'border-l-4 border-l-[#0284c7] border-slate-200' : 'border-slate-200/90'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Patient Info Left */}
                  <div className="space-y-2">
                    {/* ID + Name + Status Pill */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-sky-100 text-[#0284c7]">
                        {patient.id}
                      </span>
                      <h3 className="text-base font-bold text-[#0c1236] flex items-center gap-1.5">
                        {patient.name}
                        {isArun && (
                          <span className="w-4 h-4 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-[#0284c7] border border-sky-200">
                        {patient.status}
                      </span>
                    </div>

                    {/* Metadata: Age, Gender, Blood, Phone */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Age {patient.age} • {patient.gender}
                      </span>
                      {patient.blood && (
                        <span className="flex items-center gap-1">
                          <Droplet className="w-3.5 h-3.5 text-rose-400" />
                          Blood: {patient.blood}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {patient.phone}
                      </span>
                    </div>

                    {/* Condition Tags */}
                    {patient.tags && (
                      <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                        {patient.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-[#f2f0ff] text-[#4f46e5] border border-[#e2e0f5]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Previous Screening Note */}
                    <div className="text-xs text-slate-500 pt-0.5">
                      <span>Last screening: </span>
                      <strong className="text-slate-800 font-bold">{patient.lastScreeningDate}</strong>
                      <span className="ml-2 font-bold text-sky-700">
                        {patient.lastScreeningResult}
                      </span>
                    </div>
                  </div>

                  {/* Action Right */}
                  <div className="flex flex-col items-end justify-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleSelectPatient(patient)}
                      className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-150 active:scale-[0.98] ${
                        isArun
                          ? 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-xs'
                          : 'bg-[#f2f0ff] hover:bg-[#e6e2ff] text-[#0284c7]'
                      }`}
                    >
                      <span>Select Patient</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {isArun && (
                      <span className="text-[11px] font-semibold text-teal-600">
                        Ready for capture
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Can't find the patient in the system? */}
        <div className="bg-[#f3f1fe] rounded-2xl p-5 border border-[#e2e0f5] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0c1236]">
                Can't find the patient in the system?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                We couldn't find a patient matching your search or registering a walk-in patient. Quick intake takes under 45 seconds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => showToast('Walk-in intake opened: Registering temporary ID', 'info')}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#076694] hover:bg-[#06557c] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <span>+ Add New Patient</span>
            </button>
            <button
              onClick={() => showToast('Hospital EHR / PACS synchronization complete (0 new records)', 'success')}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#e8e6fd] hover:bg-[#dedaff] text-[#076694] text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Hospital EHR / PACS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
