import Image from 'next/image';
import Link from 'next/link';

const projects = [
  { name: 'Fintech', img: '/fintech.jpg', href: '/project/smarthome-nexus' },
  { name: 'Unio', img: '/unio.jpg', href: '/explore/unio' },
  { name: 'Nucleate', img: '/nucleate.jpg', href: '/explore/nucleate' },
  { name: 'Ascent', img: '/ascent.jpg', href: '/explore/ascent' },
  { name: 'SkyScout', img: '/skyscout.jpg', href: '/explore/skyscout' },
];

export default function Spotlight() {
  return (
    <div className="mb-8">
      <h3 className="mb-6 text-xl font-bold text-slate-900 font-primary">Spotlight Projects</h3>
      <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
        {projects.map((p) => (
          <Link key={p.name} href={p.href} className="select-none flex flex-col items-center group">
            <div className="rounded-2xl bg-gradient-to-tr from-brand to-emerald-400 p-[2px] transition-transform group-hover:scale-105 shadow-sm">
              <div className="relative h-20 w-20 overflow-hidden rounded-[14px] bg-white">
                <Image src={p.img} alt={p.name} fill className="object-cover" />
              </div>
            </div>
            <div className="mt-3 text-center text-sm font-bold text-slate-800 group-hover:text-brand transition-colors">{p.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

