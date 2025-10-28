'use client';

import { useState } from 'react';
import { Bell, Edit2, LogOut } from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminSettings() {
  const [preferences, setPreferences] = useState({
    darkMode: true,
    notifications: true,
  });

  const togglePreference = (name: string) => {
    setPreferences(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  return (
    <div className="bg-white min-h-screen flex">
      <AdminSidebar />

      <main className="flex-1 p-4 lg:ml-64 transition-all duration-300">
        <div className="max-w-5xl mx-auto">
          {/* Profile */}
          <div className="relative bg-[#00c399] h-40 rounded-2xl mb-20">
            <button className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow hover:bg-gray-50">
              <Edit2 className="w-5 h-5 text-gray-600" />
            </button>
            <div className="absolute -bottom-12 left-6 flex items-center">
              <img
                src="/girl.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">Nadia Uwimana</h2>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Platform Management */}
            <div className=" rounded-xl border shadow-sm p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Platform Management</h3>
              <div className="space-y-2">
                <Link href="/manage-categories">
                  <div className="p-3  rounded-lg cursor-pointer hover:bg-gray-200 ">
                    Manage Categories
                  </div>
                </Link>
                <Link href="/spotlight-rules">
                  <div className="p-3  rounded-lg cursor-pointer hover:bg-gray-200">
                    Spotlight Rules
                  </div>
                </Link>
                <Link href="/featured-projects">
                  <div className="p-3  rounded-lg cursor-pointer hover:bg-gray-200">
                    Featured Projects
                  </div>
                </Link>
              </div>
            </div>

            {/* Security & Access */}
            <div className="bg-white rounded-xl border shadow-sm p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Security & Access</h3>
              <div className="space-y-2">
                <Link href="/manage-admins">
                  <div className="p-3  rounded-lg cursor-pointer hover:bg-gray-200">
                    Manage Admins
                  </div>
                </Link>
                <Link href="/access-logs">
                  <div className="p-3  rounded-lg cursor-pointer hover:bg-gray-200">
                    View Access Logs
                  </div>
                </Link>
                <Link href="/backup-restore">
                  <div className="p-3  rounded-lg cursor-pointer hover:bg-gray-200">
                    Backup & Restore
                  </div>
                </Link>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl border shadow-sm p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Preferences</h3>
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Dark Mode</span>
                  <button
                    onClick={() => togglePreference('darkMode')}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                      preferences.darkMode ? 'bg-[#00c399]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                        preferences.darkMode ? 'translate-x-6' : ''
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 flex items-center gap-2"><Bell className="w-4 h-4" /> Notification</span>
                  <button
                    onClick={() => togglePreference('notifications')}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                      preferences.notifications ? 'bg-[#00c399]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                        preferences.notifications ? 'translate-x-6' : ''
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Language</span>
                  <select className="border rounded-lg px-3 py-1 text-gray-700">
                    <option>English</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Section */}
            <div className="bg-white rounded-xl border shadow-sm p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Account</h3>
              <div className="space-y-3">
                <Link href="/change-password">
                  <div className="p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                    Change Password
                  </div>
                </Link>
                <button className="w-full text-red-500 text-center py-3 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
