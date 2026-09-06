import React, { createContext, useContext, useState, useEffect } from 'react';
import { patientsData } from '../data/patients';

const ScreeningContext = createContext(null);

export const ScreeningProvider = ({ children }) => {
  // Default demo patient Arun Kumar
  const defaultPatient = patientsData.find(p => p.id === "PAT-10284") || patientsData[0];
  const [selectedPatient, setSelectedPatient] = useState(defaultPatient);

  // Left Eye State
  const [leftEyeImage, setLeftEyeImage] = useState('/assets/fundus/left_eye_normal.jpg');
  const [leftEyeFileMeta, setLeftEyeFileMeta] = useState({
    name: 'left_eye_retina.jpg',
    size: '4.8 MB',
    dimensions: '3840 × 3840 px',
    depth: '24-bit sRGB',
    type: 'High-Res JPEG',
    verified: true
  });
  const [leftEyeQuality, setLeftEyeQuality] = useState({
    retinaDetected: '100%',
    retinaNote: 'Optimal field coverage',
    resolution: '3840 px',
    resNote: 'Passes 1024px baseline',
    centration: 'FOV 45°',
    centrationNote: 'Fovea in prime quadrant',
    artifact: '< 1.2%',
    artifactNote: 'No lash/dust occlusion',
    status: 'READY FOR SCREENING'
  });
  const [leftEyeAnalysis, setLeftEyeAnalysis] = useState({
    isCompleted: false,
    result: 'NORMAL',
    title: 'No Diabetic Retinopathy Detected',
    findings: 'Automated evaluation of Field 2 fundus image showed no detectable microaneurysms, hemorrhages, or exudates.',
    confidence: '97.8%',
    gradability: 'Good (98.4%)',
    icdCode: 'E11.9',
    recommendedAction: 'Annual Routine Screening',
    model: 'ResNet-50 + Grad-CAM'
  });

  // Right Eye State
  const [rightEyeImage, setRightEyeImage] = useState('/assets/fundus/right_eye_npdr.jpg');
  const [rightEyeFileMeta, setRightEyeFileMeta] = useState({
    name: 'right_eye_retina.jpg',
    size: '5.1 MB',
    dimensions: '3840 × 3840 px',
    depth: '24-bit sRGB',
    type: 'High-Res JPEG',
    verified: true
  });
  const [rightEyeQuality, setRightEyeQuality] = useState({
    retinaDetected: '100%',
    retinaNote: 'Optimal field coverage',
    resolution: '3840 px',
    resNote: 'Passes 1024px baseline',
    centration: 'FOV 45°',
    centrationNote: 'Temporal arcade & macula',
    artifact: '< 0.8%',
    artifactNote: 'Minimal reflection artifact',
    status: 'READY FOR SCREENING'
  });
  const [rightEyeAnalysis, setRightEyeAnalysis] = useState({
    isCompleted: false,
    result: 'REFERABLE',
    title: 'Moderate Diabetic Retinopathy (NPDR)',
    findings: '8+ Microaneurysms, Scattered Dot-blots, Early Exudate Clusters along temporal arcade.',
    confidence: '91.2%',
    gradability: 'Good (97.8%)',
    icdCode: 'E11.339',
    recommendedAction: 'Specialist ophthalmologist referral indicated within 2–4 weeks (Priority 2)',
    model: 'ResNet-50 + Grad-CAM'
  });

  // Overall synthesis
  const [overallResult, setOverallResult] = useState({
    result: 'REFERABLE',
    statusText: 'Ophthalmic Consultation Needed',
    summary: 'Right eye shows Moderate Diabetic Retinopathy (NPDR). Clinical referral to ophthalmology recommended.',
    urgency: 'Tier 2 Routine',
    urgencyTarget: 'Within 2–4 Weeks',
    suggestedWorkup: 'OCT & Biomicroscopy (Glycemic optimization)',
    clinicalPlan: [
      'Comprehensive Slit-lamp Biomicroscopy',
      'Macular Optical Coherence Tomography (OCT)',
      'Primary Care HbA1c correlation'
    ],
    screenedBy: 'Nurse Anitha R.',
    station: 'Community Eye Care Unit 3',
    algorithmHash: '#RET-42-8809B',
    compliance: 'ISO 13485 Compliant'
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const handleUploadLeftEye = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLeftEyeImage(url);
    setLeftEyeFileMeta({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      dimensions: '3840 × 3840 px',
      depth: '24-bit sRGB',
      type: file.type.includes('png') ? 'High-Res PNG' : 'High-Res JPEG',
      verified: true
    });
    showToast(`Uploaded: ${file.name} (Verified)`, 'success');
  };

  const handleUploadRightEye = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setRightEyeImage(url);
    setRightEyeFileMeta({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      dimensions: '3840 × 3840 px',
      depth: '24-bit sRGB',
      type: file.type.includes('png') ? 'High-Res PNG' : 'High-Res JPEG',
      verified: true
    });
    showToast(`Uploaded: ${file.name} (Verified)`, 'success');
  };

  const resetScreening = () => {
    setLeftEyeAnalysis(prev => ({ ...prev, isCompleted: false }));
    setRightEyeAnalysis(prev => ({ ...prev, isCompleted: false }));
  };

  return (
    <ScreeningContext.Provider
      value={{
        selectedPatient,
        setSelectedPatient,
        leftEyeImage,
        setLeftEyeImage,
        leftEyeFileMeta,
        leftEyeQuality,
        leftEyeAnalysis,
        setLeftEyeAnalysis,
        handleUploadLeftEye,
        rightEyeImage,
        setRightEyeImage,
        rightEyeFileMeta,
        rightEyeQuality,
        rightEyeAnalysis,
        setRightEyeAnalysis,
        handleUploadRightEye,
        overallResult,
        resetScreening,
        toast,
        showToast
      }}
    >
      {children}
    </ScreeningContext.Provider>
  );
};

export const useScreening = () => {
  const context = useContext(ScreeningContext);
  if (!context) {
    throw new Error('useScreening must be used within a ScreeningProvider');
  }
  return context;
};
