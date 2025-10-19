'use client';
import AdminSidebar from '@/components/AdminSidebar';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const funds = [35, 34, 24, 22, 8, 80, 28];
const categories = [
  { name: 'Health', count: 12 },
  { name: 'Education', count: 12 },
  { name: 'Finance', count: 12 },
  { name: 'Agriculture', count: 12 },
  { name: 'E-commerce', count: 12 },
];

export default function AdminReports() {
  return (
    <div className="bg-[#f6fcfa] min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-0 ml-48">
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 border border-[#f3f7f6] mt-8 mr-8 flex flex-col md:flex-row gap-6">
          <div className="flex-1 min-w-[300px]">
            <h2 className="text-xl font-bold mb-4">Reports & Analytics</h2>
            <div className="mb-2 font-semibold text-sm">Funds By Month</div>
            <div className="w-full h-72 bg-white">
              <Bar
                data={{
                  labels: months,
                  datasets: [
                    {
                      label: '2025',
                      data: funds,
                      backgroundColor: 'rgba(129, 140, 248, 0.7)',
                      borderRadius: 6,
                      barPercentage: 0.55,
                      categoryPercentage: 0.7,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { display: false },
                    title: { display: false },
                  },
                  scales: {
                    x: {
                      grid: { display: true, color: '#f3f7f6' },
                      ticks: { color: '#444', font: { size: 12, weight: 500 } },
                    },
                    y: {
                      grid: { color: '#f3f7f6'},
                      beginAtZero: true,
                      max: 100,
                      ticks: { color: '#888', font: { size: 11 }, stepSize: 20 },
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={290}
              />
              <div className="mt-1 text-xs text-center text-[#818cf8]">2025</div>
            </div>
          </div>
          <div className="w-full md:w-[300px] bg-white rounded-xl border border-[#f3f7f6] p-4 h-fit self-start">
            <div className="font-bold text-sm mb-3">Categories</div>
            <div className="flex flex-col gap-3">
              {categories.map((cat, i) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="text-xs mb-0.5">{cat.name}</div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                      <div className="h-1.5 bg-[#00c399] rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 whitespace-nowrap">{cat.count} projects</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
