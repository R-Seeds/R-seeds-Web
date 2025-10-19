"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, GraduationCap, Boxes, ClipboardList, Users, DollarSign, Settings, Search, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#00c399] text-white lg:hidden shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside 
        className={`fixed left-0 top-0 z-40 h-full bg-[#00c399] p-4 sm:p-6 lg:p-8 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64 sm:w-72 lg:w-80`}
      >
      <div className="flex flex-col gap-6 h-full overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2">
          <Image 
            src="/white.png" 
            alt="R-seeds logo" 
            width={36} 
            height={36} 
            className="w-9 h-9" 
          />
          <span className="text-white text-2xl font-bold">-seeds</span>
        </div>
        
        {/* Search */}
        <div className="flex items-center bg-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 mb-6 shadow-sm">
          <Search className="text-gray-400 mr-2 sm:mr-3" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm sm:text-base flex-1 text-gray-800 placeholder-gray-400"
            style={{ minWidth: 0 }}
          />
        </div>
        {/* Menu */}
        <nav className="flex-1 flex flex-col gap-1 sm:gap-2 mt-2">
          {items.map(({ icon: Icon, label, href }) => (
            <Link 
              key={label} 
              href={href} 
              className={`flex items-center gap-3 sm:gap-4 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                pathname === href 
                  ? 'bg-white text-[#00c399] shadow-md' 
                  : 'text-white hover:bg-[#00b387]'
              }`}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
    </>
  );
}
