'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Bell, Plus } from 'lucide-react';

interface HeaderProps {
  onNotificationClick?: () => void;
}

export default function Header({ onNotificationClick }: HeaderProps) {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-100 border-w-500 bg-white/90 backdrop-blur w-full">
        <div className="w-full px-6">
          <div className="flex justify-between w-full py-3">
            {/* Logo */}
            <div className="flex-shrink-0 -ml-18">
              <Image 
                src="/logo.png" 
                alt="Local" 
                width={120} 
                height={48} 
                className="h-12 w-auto object-contain" 
              />
            </div>
            
            {/* Right side  */}
            <div className="flex items-center gap-4 -mr-18">
             
              <button 
                onClick={onNotificationClick}
                className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full"
              >
                <Bell size={20} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand"></span>
              </button>
              <Image 
                src="/girl.jpg" 
                alt="Profile" 
                width={32} 
                height={32} 
                className="h-8 w-8 rounded-full object-cover" 
              />
            </div>
          </div>
        </div>
      </header>
      
    
    </>
  );
}
