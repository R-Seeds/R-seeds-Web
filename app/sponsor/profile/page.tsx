'use client';
import Header from '@/components/Header';
import Sidebar from '../Sidebar';
import Image from 'next/image';
import { Settings, User, CreditCard, Bell, Globe, LogOut, ChevronRight, Edit3, Save } from 'lucide-react';

export default function ProfilePage() {
  const stats = [
    { value: '$2,350', label: 'Funded' },
    { value: '8', label: 'Projects' },
    { value: '10', label: 'Following' },
  ];

  const menuItems = [
    { icon: Save, label: 'Saved projects' },
    { icon: User, label: 'Account Info' },
    { icon: CreditCard, label: 'Payment Methods' },
    { icon: Bell, label: 'Notifications' },
    { icon: Globe, label: 'Language and Region' },
    { icon: Settings, label: 'Preference' },
    { icon: LogOut, label: 'Logout', isDestructive: true },
  ];

  return (
    <div>
      <Header />
      <Sidebar />
      <main className="mx-auto max-w-4xl px-6 py-6">
        <div className="rounded-2xl bg-white shadow-card overflow-hidden">
          {/* Cover Image Area */}
          <div className="relative h-32 bg-brand">
            {/* Edit Button */}
            <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
              <Edit3 size={16} className="text-white" />
            </button>
            {/* Profile Picture */}
            <div className="absolute -bottom-12 left-6">
              <Image
                src="/girl.jpg"
                alt="Nadia Uwimana"
                width={120}
                height={120}
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-6">
            {/* User Name  */}
            <div className="px-6 mb-6">
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-slate-900">Nadia Uwimana</h1>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="mx-6 mb-8">
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="text-center flex-1 relative">
                      <div className="text-2xl font-bold text-brand mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                      {index < stats.length - 1 && (
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-8 bg-slate-300"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Menu Items */}
            <div className="px-6">
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <div key={item.label} className="flex items-center justify-between py-4 px-4 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer group transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${item.isDestructive ? 'text-red-500' : 'text-brand'}`}>
                        <item.icon size={20} />
                      </div>
                      <span className={`font-medium ${item.isDestructive ? 'text-red-500' : 'text-slate-900'}`}>
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
