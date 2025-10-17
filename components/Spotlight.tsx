import Image from 'next/image';

const projects = [
  { name: 'Fintech', img: '/fintech.jpg' },
  { name: 'Unio', img: '/unio.jpg' },
  { name: 'Nucleate', img: '/nucleate.jpg' },
  { name: 'Ascent', img: '/ascent.jpg' },
  { name: 'SkyScout', img: '/skyscout.jpg' },
];

export default function Spotlight() {
  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold text-slate-900">Spotlight Projects</h3>
      <div className="flex gap-8 overflow-x-auto pb-3">
        {projects.map((p) => (
          <div key={p.name} className="select-none">
            <div className="rounded-3xl bg-gradient-to-tr from-brand to-purple-400 p-[3px] shadow-card transition-transform hover:scale-[1.02]">
              <div className="relative h-40 w-40 overflow-hidden rounded-[22px] bg-white">
                <Image src={p.img} alt={p.name} fill className="object-cover" />
              </div>
            </div>
            <div className="mt-3 text-center text-xl font-semibold text-slate-800">{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


