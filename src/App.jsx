import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScreeningProvider } from './context/ScreeningContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { Dashboard } from './pages/Dashboard';
import { NewScreening } from './pages/NewScreening';
import { UploadLeftEye } from './pages/UploadLeftEye';
import { AnalyzeLeftEye } from './pages/AnalyzeLeftEye';
import { UploadRightEye } from './pages/UploadRightEye';
import { Results } from './pages/Results';
import { Patients } from './pages/Patients';
import { PatientDetails } from './pages/PatientDetails';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <ScreeningProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Dashboard routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Screening workflow routes */}
            <Route path="/new-screening" element={<NewScreening />} />
            <Route path="/new-screening/left-eye" element={<UploadLeftEye />} />
            <Route path="/new-screening/left-eye/analyzing" element={<AnalyzeLeftEye />} />
            <Route path="/new-screening/right-eye" element={<UploadRightEye />} />
            <Route path="/new-screening/results" element={<Results />} />

            {/* Patients routes */}
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetails />} />

            {/* Analytics route */}
            <Route path="/analytics" element={<Analytics />} />

            {/* Settings & Help */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ScreeningProvider>
  );
};

export default App;
