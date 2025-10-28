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

const PAGE_SIZE = 10;
const totalPages = 10; 

export default function SponsorsPage() {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedSponsors = sponsorsData.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="bg-[#ffffff] min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 lg:ml-64 transition-all duration-300">
        <div className="w-full bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 border border-[#f3f7f6] mt-4 sm:mt-6 lg:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-bold">Sponsors</h2>
            <div className="w-full sm:w-auto">
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(Number(e.target.value))}
                className="w-full sm:w-auto border rounded-lg px-3 py-2 bg-white text-gray-700 text-sm focus:ring-2 focus:ring-[#00c399] focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto -mx-2 sm:-mx-4 lg:-mx-0">
            <div className="min-w-[600px] sm:min-w-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b h-12">
                    <th className="text-left py-3 px-2 sm:px-3 font-semibold text-gray-700 w-1/4 text-xs sm:text-sm">Name</th>
                    <th className="text-left py-3 px-2 sm:px-3 font-semibold text-gray-700 w-1/3 text-xs sm:text-sm">Organisation</th>
                    <th className="text-left py-3 px-2 sm:px-3 font-semibold text-gray-700 w-1/4 text-xs sm:text-sm">Amount</th>
                    <th className="text-right py-3 pr-2 sm:pr-4 pl-3 font-semibold text-gray-700 w-1/6 text-xs sm:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSponsors.map((s) => (
                    <tr key={s.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2 sm:px-3 font-medium text-gray-900 text-xs sm:text-sm">
                        {s.name}
                      </td>
                      <td className="py-4 px-2 sm:px-3 text-gray-600 text-xs sm:text-sm">
                        {s.organisation}
                      </td>
                      <td className="py-4 px-2 sm:px-3 font-medium text-gray-600 text-xs sm:text-sm">
                        {s.amount}
                      </td>
                      <td className="py-4 pr-2 sm:pr-4 pl-3 text-right">
                         <button 
                            className="px-3 py-1 text-xs font-medium text-white bg-[#00c399] rounded hover:bg-[#00a386] focus:outline-none"
                            onClick={() => {}}
                          >
                            View
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200">
            
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5 || page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md text-sm font-medium ${
                        page === pageNum
                          ? 'bg-[#00c399] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && page < totalPages - 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                {totalPages > 5 && page < totalPages - 2 && (
                  <button
                    onClick={() => setPage(totalPages)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md text-sm font-medium ${
                      page === totalPages
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
