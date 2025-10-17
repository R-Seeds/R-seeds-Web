import Image from 'next/image';
import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          {/* R-seeds logo */}
          <Image src="/logo.png" alt="Local" width={180} height={72} className="h-14 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
            <Bell size={20} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand"></span>
          </button>
          {/* Profile picture from public/ */}
          <Image src="/girl.jpg" alt="Profile" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
        </div>
      </div>
    </header>
  );
}


