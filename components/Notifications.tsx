import Image from 'next/image';
import { Card } from './ui';
import { X } from 'lucide-react';

const items = new Array(6).fill(0).map((_, i) => ({
  id: i,
  text: 'Umwali Nadia added you to SkyScout',
  time: '3h',
}));

export default function Notifications() {
  return (
    <Card className="p-5">
      <div className="mb-4 text-center text-2xl font-bold">Notifications</div>
      <div className="flex flex-col gap-4">
        {items.map((n) => (
          <div key={n.id} className="flex items-center justify-between rounded-xl bg-slate-100/70 p-3">
            <div className="flex items-center gap-3">
              <Image src="/girl.jpg" alt="avatar" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              <div className="leading-tight">
                <div className="text-[15px]"><span className="font-semibold">Umwali Nadia</span> added you to <span className="font-semibold">SkyScout</span></div>
                <div className="text-xs text-slate-500">{n.time}</div>
              </div>
            </div>
            <button className="rounded p-1 text-slate-600 hover:bg-slate-200"><X size={18}/></button>
          </div>
        ))}
      </div>
    </Card>
  );
}


