import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserPlus, 
  User, 
  Phone, 
  Calendar, 
  MapPin, 
  Activity, 
  Heart, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const AddNewPatientModal = ({ isOpen, onClose, onPatientAdded, initialName = '' }) => {
  const [formData, setFormData] = useState({
    name: initialName,
    age: '',
    gender: 'Male',
    phone: '',
    blood: 'O+',
    dob: '',
    address: '',
    systemicCondition: 'Type 2 Diabetes (3 yrs)',
    duration: '3 Yrs Duration',
    hypertension: 'Negative',
    bp: '120/80 mmHg',
    insulinDependent: 'No',
    medication: 'Metformin 500mg',
    hba1c: '7.2',
    triagePriority: 'Review Required'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Suggested ID preview
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setGeneratedId(`PAT-${Math.floor(10350 + Math.random() * 650)}`);
      setErrors({});
      if (initialName) {
        setFormData(prev => ({ ...prev, name: initialName }));
      }
    }
  }, [isOpen, initialName]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleQuickFill = () => {
    setFormData({
      name: 'Meena Ramanathan',
      age: '56',
      gender: 'Female',
      phone: '+91 98432 66718',
      blood: 'B+',
      dob: '1970-04-18',
      address: '28 Thillai Nagar, Coimbatore, Tamil Nadu - 641018',
      systemicCondition: 'Type 2 Diabetes (5 yrs)',
      duration: '5 Yrs Duration',
      hypertension: 'Stage 1 Controlled',
      bp: '134/86 mmHg',
      insulinDependent: 'No',
      medication: 'Metformin + Glimepiride',
      hba1c: '7.9',
      triagePriority: 'Review Required'
    });
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Patient name is required';
    if (!formData.age || isNaN(formData.age) || Number(formData.age) <= 0 || Number(formData.age) > 120) {
      errs.age = 'Valid age is required (1-120)';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Valid contact phone number is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e, immediateScreening = false) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const newPatient = {
      id: generatedId,
      name: formData.name.trim(),
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      blood: formData.blood,
      phone: formData.phone.trim(),
      altPhone: formData.phone.trim(),
      dob: formData.dob || `${formData.age} Years Old`,
      address: formData.address.trim() || 'Coimbatore, Tamil Nadu',
      status: 'Intake Registered',
      triagePriority: formData.triagePriority,
      systemicCondition: formData.systemicCondition,
      duration: formData.duration,
      hypertension: formData.hypertension,
      bp: formData.bp,
      insulinDependent: formData.insulinDependent,
      medication: formData.medication,
      hba1c: formData.hba1c ? `${formData.hba1c}%` : '6.5%',
      hba1cRisk: parseFloat(formData.hba1c || 6) >= 8.0 ? 'Elevated Risk' : parseFloat(formData.hba1c || 6) >= 7.0 ? 'Moderate Risk' : 'Normal Range',
      lastScreeningDate: 'Intake Registered Today',
      lastScreeningResult: 'Pending Baseline Fundus',
      captureStation: 'Nidek AFC-330',
      dicomStatus: 'DICOM Ready',
      recentFundusEye: 'Bilateral Intake',
      readyForCapture: true,
      tags: [formData.systemicCondition, formData.blood]
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onPatientAdded(newPatient, immediateScreening);
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shadow-sm">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Register New Patient</h3>
                <span className="px-2 py-0.5 rounded-md bg-sky-100 text-[#0284c7] text-[11px] font-bold font-mono">
                  {generatedId}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Enter patient demographics and clinical history for retinal screening
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickFill}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#0284c7] bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer"
              title="Populate with realistic clinical intake data"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Quick Fill</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Demographics */}
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
              <User className="w-4 h-4 text-[#0284c7]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Patient Demographics & Contact
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Meena Ramanathan"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-3.5 py-2 text-xs bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-sky-100 focus:border-[#0284c7]'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Age (Years) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 54"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className={`w-full px-3.5 py-2 text-xs bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.age ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-sky-100 focus:border-[#0284c7]'
                  }`}
                />
                {errors.age && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.age}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleChange('gender', g)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        formData.gender === g
                          ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+91 98450 12345"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-sky-100 focus:border-[#0284c7]'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Blood Group
                </label>
                <select
                  value={formData.blood}
                  onChange={(e) => handleChange('blood', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-[#0284c7] transition-all"
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Address / Locality
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. R.S. Puram, Coimbatore, Tamil Nadu"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-[#0284c7] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Baseline */}
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
              <Activity className="w-4 h-4 text-[#0284c7]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Clinical Baseline & Retinal Risk Factors
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Condition */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Condition
                </label>
                <select
                  value={formData.systemicCondition}
                  onChange={(e) => handleChange('systemicCondition', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-[#0284c7] transition-all"
                >
                  <option value="Type 2 Diabetes (7 yrs)">Type 2 Diabetes (Long-standing)</option>
                  <option value="Type 2 Diabetes (3 yrs)">Type 2 Diabetes (Recent)</option>
                  <option value="Type 1 Diabetes (Juvenile)">Type 1 Diabetes</option>
                  <option value="Pre-Diabetic Baseline">Pre-Diabetic Baseline</option>
                  <option value="Hypertension Primary">Hypertension Primary</option>
                  <option value="No systemic records linked">Routine Screening / Healthy</option>
                </select>
              </div>

              {/* Triage Priority */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clinical Triage Priority
                </label>
                <select
                  value={formData.triagePriority}
                  onChange={(e) => handleChange('triagePriority', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-[#0284c7] transition-all"
                >
                  <option value="High Clinical Priority">🚨 High Clinical Priority</option>
                  <option value="Review Required">⚠️ Review Required</option>
                  <option value="Normal Routine">✅ Normal Routine</option>
                </select>
              </div>

              {/* HbA1c Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Most Recent HbA1c (%)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7.4"
                  value={formData.hba1c}
                  onChange={(e) => handleChange('hba1c', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-[#0284c7] transition-all"
                />
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Blood Pressure (BP)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 128/84 mmHg"
                  value={formData.bp}
                  onChange={(e) => handleChange('bp', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-[#0284c7] transition-all"
                />
              </div>

              {/* Insulin Dependent */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Insulin Dependent
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['No', 'Yes'].map((ans) => (
                    <button
                      key={ans}
                      type="button"
                      onClick={() => handleChange('insulinDependent', ans)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        formData.insulinDependent === ans
                          ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Medication */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Medication
                </label>
                <input
                  type="text"
                  placeholder="e.g. Metformin 500mg BD"
                  value={formData.medication}
                  onChange={(e) => handleChange('medication', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-[#0284c7] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer / Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Registering...' : '+ Register Patient'}</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={(e) => handleSubmit(e, true)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#076694] to-[#0284c7] hover:brightness-105 rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Register & Start Screening</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
