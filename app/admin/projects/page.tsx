'use client';
import AdminSidebar from '@/components/AdminSidebar';
import { useState } from 'react';

const allProjects = Array.from({ length: 50 }, (_, i) => ({
  name: 'SkyScout',
  owner: 'Justin Carder',
  raised: '$8,450',
  status: i < 3 || i === 49 ? 'Active' : i < 6 ? 'Achieved' : i < 9 ? 'Archived' : 'Active',
}));
const PAGE_SIZE = 10;
const years = [2025, 2024, 2023, 2022];

export default function AdminProjects() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [page, setPage] = useState(5);
  const totalPages = Math.ceil(allProjects.length / PAGE_SIZE);
  const projects = allProjects.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  return (
    <div className="bg-white min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-0 ml-48">
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 border border-[#f3f7f6] mt-8 mr-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Projects</h2>
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/5">Owner</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/6">Raised</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/4">Status</th>
                  <th className="text-right py-3 pr-48 pl-4 font-semibold text-gray-700 w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={i} className="border-b last:border-b-0 hover:bg-[#f6fcfa]">
                    <td className="py-4 px-4 font-medium truncate">{p.name}</td>
                    <td className="py-4 px-4 text-gray-600 truncate">{p.owner}</td>
                    <td className="py-4 px-4 font-medium">{p.raised}</td>
                    <td className="py-4 px-4">
                      {p.status === 'Active' && (
                        <span className="px-2 py-0.5 rounded-full border border-[#00c399] text-[#00c399] text-xs bg-[#f6fcfa]">Active</span>
                      )}
                      {p.status === 'Achieved' && (
                        <span className="px-2 py-0.5 rounded-full border border-[#fbbf24] text-[#fbbf24] text-xs bg-[#fffbea]">Achieved</span>
                      )}
                      {p.status === 'Archived' && (
                        <span className="px-2 py-0.5 rounded-full border border-[#f87171] text-[#f87171] text-xs bg-[#fff1f2]">Archived</span>
                      )}
                    </td>
                    <td className="py-4 pr-6 pl-4 flex justify-end gap-3">
                      <button className="px-2 py-0.5 rounded bg-[#00c399] text-white text-xs font-semibold">View</button>
                      {p.status === 'Active' && <button className="px-2 py-0.5 rounded bg-[#f3f4f6] text-gray-700 text-xs font-semibold">Spotlight</button>}
                      {(p.status === 'Active' || p.status === 'Achieved') && <button className="px-2 py-0.5 rounded bg-[#f3f4f6] text-gray-700 text-xs font-semibold">Archive</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-1 mt-6">
            <button
              className="px-2 py-0.5 rounded bg-[#f3f4f6] text-gray-700 text-sm"
              disabled={page === 1}
              onClick={() => setPage(page-1)}
            >{'<'}</button>
            <button className="px-2 py-1 rounded bg-[#f3f4f6] text-gray-700" disabled>
              ...
            </button>
            {[3,4,5,6,7].map(n => (
              <button
                key={n}
                className={`px-2 py-0.5 rounded text-sm ${n===page ? 'bg-[#00c399] text-white' : 'bg-[#f3f4f6] text-gray-700'}`}
                onClick={() => setPage(n)}
              >{n}</button>
            ))}
            <button className="px-2 py-1 rounded bg-[#f3f4f6] text-gray-700" disabled>
              ...
            </button>
            <button
              className="px-2 py-0.5 rounded bg-[#f3f4f6] text-gray-700 text-sm"
              disabled={page === totalPages}
              onClick={() => setPage(page+1)}
            >{'>'}</button>
          </div>
        </div>
      </main>
    </div>
  );
}
