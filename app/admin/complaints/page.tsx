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
    <div className="bg-white min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-0 ml-48">
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 border border-[#f3f7f6] mt-8 mr-8 flex gap-8">
        {/* Complaints List */}
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold mb-2">Complaints</h2>
              <select
                className="border rounded px-2 py-1 bg-white text-gray-700 text-xs"
                value={selectedYear}
                onChange={e => setSelectedYear(Number(e.target.value))}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          <div className="space-y-3">
            {complaintsData.map((complaint) => (
              <div
                key={complaint.id}
                className={`border rounded-lg px-4 py-2 flex items-center justify-between bg-[#fafbfb] ${selectedId === complaint.id ? 'border-[#818cf8]' : 'border-gray-200'}`}
              >
                <div>
                  <div className="font-semibold text-xs">{complaint.title}</div>
                  <div className="text-[11px] text-gray-500">
                    Project: {complaint.project} · From: {complaint.from}
                  </div>
                </div>
                <button
                  className="text-[11px] border border-[#fbbf24] text-[#fbbf24] px-2 py-0.5 rounded hover:bg-[#fbbf24] hover:text-white transition"
                  onClick={() => setSelectedId(complaint.id)}
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Selected Complaint */}
        <div className="w-1/2">
            <div className="bg-[#fafbfb] rounded-lg p-6 h-full">
            <div className="font-semibold text-sm mb-3">Selected Complaint</div>
            <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4">
              <div className="text-xs text-gray-700 mb-2">{selectedComplaint?.content}</div>
              <div className="text-[11px] text-gray-500">Project: {selectedComplaint?.project} · From: {selectedComplaint?.from}</div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Your Response</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 text-xs min-h-[100px] focus:ring-1 focus:ring-[#00c399] focus:border-transparent"
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button className="bg-[#00c399] text-white px-3 py-1 rounded text-xs font-medium hover:bg-[#00a386] transition">
                Send Response
              </button>
              <button className="text-gray-500 text-xs hover:text-gray-700">
                Mark as Resolved
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span>Inspect Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}
