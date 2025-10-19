
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
    <div className="bg-white min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-0 ml-48">
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 border border-[#f3f7f6] mt-8 mr-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Graduates</h2>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="border rounded px-3 py-1.5 bg-white text-gray-700 text-sm"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto mt-8 mb-10">
            <table className="w-full text-sm table-fixed">
              <thead>
                <tr className="border-b h-14">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/5">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/6">Year</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/4">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/6">Status</th>
                  <th className="text-right py-3 pr-48 pl-4 font-semibold text-gray-700 w-1/4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {graduates.map((g, i) => (
                  <tr key={i} className="border-b last:border-b-0 hover:bg-[#f6fcfa]">
                    <td className="py-4 px-4 font-medium truncate">{g.name}</td>
                    <td className="py-4 px-4">{g.year}</td>
                    <td className="py-4 px-4 text-gray-600 truncate">{g.email}</td>
                    <td className="py-4 px-4">
                      {g.status === 'verified' ? (
                        <span className="px-2 py-0.5 rounded-full border border-[#00c399] text-[#00c399] text-xs bg-[#f6fcfa]">Verified</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full border border-[#fbbf24] text-[#fbbf24] text-xs bg-[#fffbea]">Pending</span>
                      )}
                    </td>
                    <td className="py-4 pr-6 pl-4 flex justify-end gap-2">
                      {g.status === 'pending' && (
                        <button className="px-3 py-1.5 rounded bg-[#00c399] text-white text-sm font-semibold hover:bg-[#00a386] transition">Approve</button>
                      )}
                      <button className="px-3 py-1.5 rounded bg-[#f3f4f6] text-gray-700 text-sm font-semibold hover:bg-gray-200 transition">View</button>
                      <button className="px-3 py-1.5 rounded bg-[#f3f4f6] text-gray-700 text-sm font-semibold hover:bg-gray-200 transition">Inspect</button>
                      <button className="px-3 py-1.5 rounded bg-[#f3f4f6] text-gray-700 text-sm font-semibold hover:bg-gray-200 transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-1 mt-8">
            <button
              className="px-3 py-1 rounded bg-[#f3f4f6] text-gray-700 text-sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              {'< Prev'}
            </button>
            <div className="flex gap-1 mx-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  className={`w-8 h-8 rounded text-sm ${page === num ? 'bg-[#00c399] text-white' : 'bg-[#f3f4f6] text-gray-700'}`}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              ))}
              <span className="px-2 py-1">...</span>
              <button
                className={`w-8 h-8 rounded text-sm ${page === totalPages ? 'bg-[#00c399] text-white' : 'bg-[#f3f4f6] text-gray-700'}`}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </button>
            </div>
            <button
              className="px-3 py-1 rounded bg-[#f3f4f6] text-gray-700 text-sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              {'Next >'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
