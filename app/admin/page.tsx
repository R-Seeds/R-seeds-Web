import { useState } from 'react';
import Header from '@/components/Header';
import AdminSidebar from '@/components/AdminSidebar';

const stats = [
  { label: 'Graduates', value: 120 },
  { label: 'Active Projects', value: 3 },
  { label: 'Donors', value: 30 },
  { label: 'Total funds', value: '$34,500' },
];

const activity = [
  { text: 'SkyScout updated milestone "System Integration"', time: '2 hours' },
  { text: 'New project "EcoSort" was uploaded', time: '2 hours' },
  { text: 'Graduate Nikita requested withdraw', time: '2 hours' },
];

const topProjects = [
  { name: 'SkyScout', owner: 'Justin Carder', percent: 70, raised: '$8,450' },
  { name: 'SkyScout', owner: 'Justin Carder', percent: 70, raised: '$8,450' },
  { name: 'SkyScout', owner: 'Justin Carder', percent: 70, raised: '$8,450' },
  { name: 'SkyScout', owner: 'Justin Carder', percent: 70, raised: '$8,450' },
];

export default function AdminDashboard() {
  return (
    <div className="bg-[#ffffff] min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 lg:ml-64 transition-all duration-300">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative flex flex-col justify-center border border-[#f3f7f6] border-w-100  items-center bg-white rounded-2xl shadow-sm px-4 py-6 sm:px-6 lg:px-8 min-h-[120px] sm:min-h-[140px] border border-[#f3f7f6] hover:shadow-md transition-shadow"
            > 
              <div className="absolute left-0 top-6 h-10 sm:h-12 w-2 sm:w-3 bg-[#00c399] rounded-r-lg" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00c399] mb-2 sm:mb-3" style={{letterSpacing: 1}}>
                {s.value}
              </div>
              <div className="text-base sm:text-lg font-medium text-gray-700">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-[#f3f7f6] shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-500 mt-1">Latest uploads, verifications and donations</p>
            </div>
            <button 
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-50 transition-colors self-end sm:self-auto"
              aria-label="Refresh activities"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 sm:px-4 border border-[#f3f7f6] rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm sm:text-base text-gray-800">{a.text}</span>
                <span className="text-xs sm:text-sm text-gray-500 italic">{a.time} ago</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Projects */}
          <div className="bg-white rounded-2xl border border-[#f3f7f6] p-4 sm:p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6">Top Projects</h2>
            <div className="space-y-4">
              {topProjects.map((p, i) => (
                <div 
                  key={i} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.owner}</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-sm font-medium text-[#00c399] whitespace-nowrap">{p.percent}%</span>
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{p.raised}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Snapshot */}
          <div className="bg-white rounded-2xl border border-[#f3f7f6] p-4 sm:p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6">System Snapshot</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">Pending complaints</span>
                  <span className="text-sm font-medium text-gray-900">70%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00c399] rounded-full transition-all duration-500" 
                    style={{ width: '70%' }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">Verification queue</span>
                  <span className="text-sm font-medium text-gray-900">50%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00c399] rounded-full transition-all duration-500" 
                    style={{ width: '50%' }}
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button className="w-full sm:w-auto px-4 py-2 bg-[#00c399] hover:bg-[#00a386] text-white text-sm font-medium rounded-lg transition-colors">
                  View All Reports
                </button>
              </div>
            </div>
          </div>
        </div>
        </main>
    </div>
  );
}
