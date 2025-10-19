"use client";

import React, { useState } from "react";
import AdminSidebar from '@/components/AdminSidebar';

const complaintsData = [
  {
    id: 1,
    title: "Suspected misuse of funds",
    project: "MedScan AI",
    from: "Anonymous",
    content: "Suspected misuse of funds — MedScan AI (from Anonymous)",
  },
  {
    id: 2,
    title: "No update after funding",
    project: "SkyScout",
    from: "Donor",
    content: "No update after funding — SkyScout (from Donor)",
  },
  {
    id: 3,
    title: "Suspected misuse of funds",
    project: "MedScan AI",
    from: "Anonymous",
    content: "Suspected misuse of funds — MedScan AI (from Anonymous)",
  },
  {
    id: 4,
    title: "No update after funding",
    project: "SkyScout",
    from: "Donor",
    content: "No update after funding — SkyScout (from Donor)",
  },
];

const years = [2025, 2024, 2023];

export default function ComplaintsPage() {
  const [selectedId, setSelectedId] = useState(complaintsData[0].id);
  const [response, setResponse] = useState("");
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const selectedComplaint = complaintsData.find((c) => c.id === selectedId);

  return (
    <div className="bg-[#ffffff] min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 lg:ml-64 transition-all duration-300">
        <div className="w-full bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 border border-[#f3f7f6] mt-4 sm:mt-6 lg:mt-8 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Complaints List */}
          <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-bold">Complaints</h2>
              <div className="w-full sm:w-auto">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full sm:w-auto border rounded-lg px-3 py-2 bg-white text-gray-700 text-sm focus:ring-2 focus:ring-[#00c399] focus:border-transparent"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2 max-h-[300px] sm:max-h-[400px] lg:max-h-[calc(100vh-250px)] overflow-y-auto pr-2 -mx-2 sm:mx-0">
              {complaintsData.map((complaint) => (
                <div
                  key={complaint.id}
                  onClick={() => setSelectedId(complaint.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedId === complaint.id
                      ? 'bg-[#00c399] text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm sm:text-base">{complaint.title}</div>
                      <div className="text-xs opacity-75 mt-1">
                        <span className="block sm:inline">{complaint.project}</span>
                        <span className="hidden sm:inline"> • </span>
                        <span className="block sm:inline">{complaint.from}</span>
                      </div>
                    </div>
                    <button 
                      className="ml-2 px-3 py-1 text-xs font-medium text-[#B45309] bg-white border border-[#B45309] rounded hover:bg-gray-50 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(complaint.id);
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complaint Details */}
          <div className="flex-1 mt-6 lg:mt-0">
            {selectedComplaint && (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  {selectedComplaint.title}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700">
                    {selectedComplaint.content}
                  </p>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="response"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Response
                  </label>
                  <textarea
                    id="response"
                    rows={4}
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#00c399] focus:border-transparent sm:text-sm transition-colors"
                    placeholder="Type your response here..."
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  
                  <button 
                    className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#00c399] hover:bg-[#00a386] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00c399]"
                    disabled={!response.trim()}
                  >
                    Reply
                  </button>

                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Inspect
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
