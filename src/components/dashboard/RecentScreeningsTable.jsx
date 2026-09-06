import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { recentScreeningsData } from '../../data/screenings';
import { StatusBadge, TableStatusIndicator } from '../common/StatusBadge';
import { useScreening } from '../../context/ScreeningContext';
import { patientsData } from '../../data/patients';

export const RecentScreeningsTable = () => {
  const navigate = useNavigate();
  const { setSelectedPatient } = useScreening();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const tabs = [
    { label: 'All', count: 24 },
    { label: 'Referable', count: 5 },
    { label: 'Review', count: 3 },
    { label: 'Normal', count: 16 }
  ];

  const filteredData = recentScreeningsData.filter((item) => {
    if (activeTab !== 'All' && item.category !== activeTab) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        item.patientId.toLowerCase().includes(q) ||
        item.patientName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleRowAction = (item) => {
    const patient = patientsData.find(p => p.name === item.patientName) || patientsData[0];
    setSelectedPatient(patient);
    navigate('/new-screening/results');
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-clinical">
      {/* Table Top Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0c1236]">Recent Screenings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time triage ledger and preliminary AI analysis log
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative w-60">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patient ID, name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0284c7] focus:border-[#0284c7]"
            />
          </div>

          {/* Filter Tabs matching Screenshot 1 */}
          <div className="flex items-center gap-1.5 border border-slate-200/90 p-1 rounded-xl">
            {tabs.map((tab) => {
              const active = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => {
                    setActiveTab(tab.label);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#0284c7] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              <th className="py-3 px-4 text-center">PATIENT ID</th>
              <th className="py-3 px-4">PATIENT NAME</th>
              <th className="py-3 px-4 text-center">AGE</th>
              <th className="py-3 px-4 text-center">SCREENING DATE</th>
              <th className="py-3 px-4 text-center">LEFT EYE</th>
              <th className="py-3 px-4 text-center">RIGHT EYE</th>
              <th className="py-3 px-4 text-center">OVERALL RESULT</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {paginatedData.map((row, idx) => {
              // Format Patient ID stacked as PAT- / 10342 matching Screenshot 1
              const idParts = row.patientId.split('-');
              // Format screening date if contains AM/PM
              const dateParts = row.date.includes(' AM') ? row.date.split(' AM') : row.date.includes(' PM') ? row.date.split(' PM') : null;

              return (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  {/* PATIENT ID stacked */}
                  <td className="py-3.5 px-4 font-semibold text-slate-700 text-center whitespace-nowrap">
                    <div className="inline-block text-left font-medium leading-tight">
                      <div>{idParts[0]}-</div>
                      <div>{idParts[1]}</div>
                    </div>
                  </td>

                  {/* PATIENT NAME */}
                  <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    {row.patientName}
                  </td>

                  {/* AGE */}
                  <td className="py-3.5 px-4 text-center text-slate-600">
                    {row.age}
                  </td>

                  {/* SCREENING DATE */}
                  <td className="py-3.5 px-4 text-center text-slate-600 whitespace-nowrap">
                    {dateParts ? (
                      <div className="leading-tight">
                        <div>{dateParts[0]}</div>
                        <div>{row.date.includes(' AM') ? 'AM' : 'PM'}</div>
                      </div>
                    ) : (
                      row.date
                    )}
                  </td>

                  {/* LEFT EYE */}
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${
                      row.leftEye.toLowerCase().includes('referable')
                        ? 'bg-[#f87171] text-white'
                        : 'bg-[#0284c7] text-white'
                    }`}>
                      {row.leftEye}
                    </span>
                  </td>

                  {/* RIGHT EYE */}
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${
                      row.rightEye.toLowerCase().includes('referable')
                        ? 'bg-[#f87171] text-white'
                        : 'bg-[#0284c7] text-white'
                    }`}>
                      {row.rightEye}
                    </span>
                  </td>

                  {/* OVERALL RESULT */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <StatusBadge text={row.overallResult} />
                  </td>

                  {/* STATUS */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <TableStatusIndicator status={row.status} />
                  </td>

                  {/* ACTION */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleRowAction(row)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors"
                    >
                      <span>View Results</span>
                      <span>→</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching Screenshot 1 */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
        <div>
          Showing 5 of 24 screened patients
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-6 h-6 rounded-md bg-slate-300 hover:bg-slate-400 disabled:opacity-50 flex items-center justify-center text-slate-700"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-6 h-6 rounded-md text-xs font-bold transition-colors ${
                currentPage === page
                  ? 'bg-[#0284c7] text-white'
                  : 'bg-[#0284c7] text-white hover:bg-[#0369a1]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-6 h-6 rounded-md bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-50 flex items-center justify-center text-white"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
