"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, GraduationCap, Boxes, ClipboardList, Users, DollarSign, Settings, Search } from 'lucide-react';
import Image from 'next/image';

const items = [
  { icon: LayoutGrid, label: 'Dashboard', href: '/admin' },
  { icon: GraduationCap, label: 'Graduates', href: '/admin/graduates' },
  { icon: Boxes, label: 'Projects', href: '/admin/projects' },
  { icon: ClipboardList, label: 'Reports', href: '/admin/reports' },
  { icon: Users, label: 'Complaints', href: '/admin/complaints' },
  { icon: DollarSign, label: 'Sponsors', href: '/admin/sponsors' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-30 h-full w-80 bg-[#00c399] p-8 flex flex-col">
      <div className="flex flex-col gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2">
          {/* Replace with actual logo if available */}
          <Image src="/white.png" alt="R-seeds logo" width={36} height={36} className="" />
          <span className="text-white text-3xl font-bold">-seeds</span>
        </div>
        {/* Search */}
        <div className="flex items-center bg-white rounded-lg px-4 py-3 mb-6 shadow-sm">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search graduates/ projects..."
            className="bg-transparent outline-none text-lg flex-1 text-gray-800 placeholder-gray-400"
            style={{ minWidth: 0 }}
          />
        </div>
        {/* Menu */}
        <nav className="flex-1 flex flex-col gap-2 mt-2">
          {items.map(({ icon: Icon, label, href }) => (
            <Link 
              key={label} 
              href={href} 
              className={`flex items-center gap-5 py-3.5 px-5 rounded-lg font-semibold transition text-xl ${
                pathname === href 
                  ? 'bg-white text-[#00c399] shadow-md' 
                  : 'text-white hover:bg-[#00b387]'
              }`}
            >
              <Icon size={26} className="" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
