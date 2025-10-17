"use client";
import Link from 'next/link';
import { Home, Compass, Coins, MessageCircleMore, UserRound } from 'lucide-react';

const items = [
  { icon: Home, label: 'Home', href: '#' },
  { icon: Compass, label: 'Explore', href: '#' },
  { icon: Coins, label: 'Funds', href: '#' },
  { icon: MessageCircleMore, label: 'Chat', href: '#' },
  { icon: UserRound, label: 'Profile', href: '#' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-6 top-1/2 z-20 flex w-16 -translate-y-1/2 flex-col items-center justify-between rounded-[48px] bg-brand p-3 py-6 text-white shadow-xl" style={{ height: '400px' }}>
      <div className="w-full space-y-10">
        {items.map(({ icon: Icon, label, href }, idx) => (
          <Link key={label} href={href} className="group relative block">
            <div className="grid place-items-center">
              {idx === 0 ? (
                <div className="h-10 w-10" />
              ) : (
                <Icon size={26} className="text-white drop-shadow" />
              )}
            </div>
            {idx === 0 && (
              <div className="absolute -left-2 -top-3 z-10 flex items-center rounded-[24px] bg-white px-4 py-2.5 pr-6 text-slate-900 shadow-[6px_8px_0_rgba(0,0,0,0.15)]">
                <div className="mr-3 grid h-8 w-8 place-items-center rounded-full bg-brand/10">
                  <Home size={22} className="text-brand" />
                </div>
                <span className="text-base font-medium">Home</span>
              </div>
            )}
          </Link>
        ))}
      </div>
      
    </aside>
  );
}


