"use client";

import React, { useState } from "react";
import AdminSidebar from '@/components/AdminSidebar';

const sponsorsData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: "Ntwali Tresor",
  organisation: "Aiko Group",
  amount: "$8,450"
}));

const years = [2025, 2024, 2023, 2022];

export default function SponsorsPage() {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <div className="bg-white min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-0 ml-48">
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 border border-[#f3f7f6] mt-8 mr-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold mb-2">Sponsors</h2>
            <select
              className="border rounded px-3 py-1 bg-white text-gray-700 text-xs"
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto mt-8 mb-10">
            <table className="w-full text-xs table-fixed">
              <thead>
                <tr className="border-b h-14">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-1/4 text-xs">Name</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-1/3 text-xs">Organisation</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-1/4 text-xs">Amount</th>
                  <th className="w-1/6 text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                {sponsorsData.map((s) => (
                  <tr key={s.id} className="border-b last:border-b-0 hover:bg-[#f6fcfa]">
                    <td className="py-3 px-3 font-medium truncate text-xs">{s.name}</td>
                    <td className="py-3 px-3 text-gray-600 truncate text-xs">{s.organisation}</td>
                    <td className="py-3 px-3 font-medium text-xs">{s.amount}</td>
                    <td className="py-3 pr-4 pl-3 text-right">
                      <button className="bg-[#00c399] hover:bg-[#00a386] text-white px-2 py-1 rounded text-xs font-semibold transition">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-1 mt-8">
            <button
              className="px-2 py-0.5 rounded bg-[#f3f4f6] text-gray-700 text-xs"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              {'< Prev'}
            </button>
            <div className="flex gap-1 mx-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  className={`w-7 h-7 rounded text-xs flex items-center justify-center ${currentPage === num ? 'bg-[#00c399] text-white' : 'bg-[#f3f4f6] text-gray-700'}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              <span className="px-2 py-1">...</span>
              <button
                className={`w-8 h-8 rounded text-sm ${currentPage === 10 ? 'bg-[#00c399] text-white' : 'bg-[#f3f4f6] text-gray-700'}`}
                onClick={() => setCurrentPage(10)}
              >
                10
              </button>
            </div>
            <button
              className="px-2 py-0.5 rounded bg-[#f3f4f6] text-gray-700 text-xs"
              disabled={currentPage === 10}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              {'Next >'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
