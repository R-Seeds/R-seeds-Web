
'use client';
import AdminSidebar from '@/components/AdminSidebar';
import { useState } from 'react';

const allGraduates = Array.from({ length: 50 }, (_, i) => ({
  name: 'Umwali Nadia',
  year: 2025,
  email: 'nadia9@gmail.com',
  status: i % 3 === 0 ? 'verified' : 'pending',
}));
const PAGE_SIZE = 10;

const years = [2025, 2024, 2023, 2022];

export default function AdminGraduates() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allGraduates.length / PAGE_SIZE);
  const graduates = allGraduates.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  return (
    <div className="min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 lg:ml-64 transition-all duration-300">
        <div className="w-full bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 border border-[#f3f7f6] mt-4 sm:mt-6 lg:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-bold">Graduates</h2>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-end">
              
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(Number(e.target.value))}
                className="w-full sm:w-auto border rounded-lg px-3 py-2 bg-white text-gray-700 text-sm focus:ring-2 focus:ring-[#00c399] focus:border-transparent"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto -mx-2 sm:-mx-4 lg:-mx-0">
            <div className="min-w-[600px] sm:min-w-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b h-12">
                    <th className="text-left py-3 px-2 sm:px-3 font-semibold text-gray-700 w-1/5 text-xs sm:text-sm">Name</th>
                    <th className="text-left py-3 px-2 sm:px-3 font-semibold text-gray-700 w-1/4 text-xs sm:text-sm">Email</th>
                    <th className="text-left py-3 px-2 sm:px-3 font-semibold text-gray-700 w-1/6 text-xs sm:text-sm">Year</th>
                    <th className="text-left py-3 px-2 sm:px-3 font-semibold text-gray-700 w-1/6 text-xs sm:text-sm">Status</th>
                    <th className="text-right py-3 pr-2 sm:pr-4 pl-3 font-semibold text-gray-700 w-1/6 text-xs sm:text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {graduates.map((g, i) => (
                    <tr key={i} className="border-b h-14 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2 sm:px-3 text-gray-600 text-xs sm:text-sm">
                        <div className="font-medium text-gray-900">{g.name}</div>
                      </td>
                      <td className="py-4 px-2 sm:px-3 text-gray-600 text-xs sm:text-sm">{g.email}</td>
                      <td className="py-4 px-2 sm:px-3 text-gray-600 text-xs sm:text-sm">{g.year}</td>
                      <td className="py-4 px-2 sm:px-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          g.status === 'verified' 
                            ? 'bg-[#00C896]/10 text-green-800 ' 
                            : 'bg-[#B45309]/10 text-yellow-800'
                        }`}>
                          {g.status.charAt(0).toUpperCase() + g.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 pr-2 sm:pr-4 pl-3">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            className="px-3 py-1 text-xs font-medium text-white  bg-[#00c399] border border-gray-300 rounded hover: bg-[#00c399] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#00c399] transition-colors"
                            onClick={() => {}}
                          >
                            Approve
                          </button>
                          <button 
                            className="px-3 py-1 text-xs font-medium text-white bg-[#00c399] border border-[#00c399] rounded hover:bg-[#00a386] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#00c399] transition-colors"
                            onClick={() => {}}
                          >
                            Inspect
                          </button>
                          <button 
                            className="px-3 py-1 text-xs font-medium text-red-600 bg-white border border-red-300 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors"
                            onClick={() => {}}
                          >
                            Delete
                          </button>
                        </div>
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
                  // Show page numbers with ellipsis
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
                          ? ' bg-[#00c399] text-white'
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
