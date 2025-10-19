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
    <div className="bg-[#f6fcfa] min-h-screen">
     
      <AdminSidebar />
      <div className="flex">
        <main className="flex-1 p-10 ml-72">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="relative flex flex-col justify-center items-center bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,195,153,0.07)] px-8 py-6 min-w-[200px] min-h-[140px]"
              >
                {/* Left accent ribbon */}
                <div className="absolute left-0 top-6 h-12 w-6 bg-[#00c399] rounded-r-xl" style={{boxShadow:'0 0 8px 0 rgba(0,195,153,0.07)'}} />
                <div className="text-5xl font-bold text-[#00c399] mb-3" style={{letterSpacing:1}}>{s.value}</div>
                <div className="text-xl font-semibold text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-[#eaf5f2] p-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="font-bold text-2xl text-[#222]">Recent Activity</span>
                  <span className="ml-3 text-sm text-gray-500 align-bottom">Latest uploads, verifications and donations</span>
                </div>
                {/* Refresh Icon */}
                <button className="p-1 rounded-full hover:bg-[#f6fcfa] transition">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#222" strokeWidth="2"><path d="M21 2v6h-6"/><path d="M3 13a9 9 0 0 0 15 5l3-3M21 8A9 9 0 0 0 6 6l-3 3"/></svg>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {activity.map((a, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border border-[#eaf5f2] rounded-lg px-4 py-3 bg-white hover:bg-[#f6fcfa] transition"
                  >
                    <span className="text-base text-[#222]">{a.text}</span>
                    <span className="text-sm italic text-gray-500">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#eaf5f2] p-5 shadow-sm">
              <div className="font-bold text-2xl mb-4">Top Projects</div>
              <div className="space-y-3">
                {topProjects.map((p, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                    <div>
                      <div className="font-semibold text-lg">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.owner}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#00c399] font-bold">{p.percent}%</span>
                      <span className="font-semibold">{p.raised}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#eaf5f2] p-5 shadow-sm">
              <div className="font-bold text-lg mb-2">System Snapshot</div>
              <div className="mb-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Pending complaints</span>
                  <span>70%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                  <div className="h-2 bg-[#00c399] rounded-full" style={{width: '70%'}}></div>
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Verification queue</span>
                  <span>50%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-[#00c399] rounded-full" style={{width: '50%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
