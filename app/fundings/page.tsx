import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';

type Funding = {
  title: string;
  image: string;
  donors: number;
  raised: number;
  goal: number;
  status: 'Active' | 'Paused' | 'Closed';
};

const fundings: Funding[] = [
  { title: 'MedScan AI', image: '/doctor.jpg', donors: 25, raised: 5200, goal: 10000, status: 'Active' },
  { title: 'MedScan AI', image: '/doctor.jpg', donors: 25, raised: 5200, goal: 10000, status: 'Active' },
  { title: 'MedScan AI', image: '/doctor.jpg', donors: 25, raised: 5200, goal: 10000, status: 'Active' },
];

export default function FundingsPage() {
  return (
    <div className='bg-white'>
      <Header />
      <Sidebar />
      <main className="mx-auto max-w-5xl px-6 py-6">
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <div className="space-y-6">
          {fundings.map((f, i) => {
            const pct = Math.min(100, Math.round((f.raised / f.goal) * 100));
            return (
              <div key={i} className="rounded-2xl bg-white p-3 shadow-card">
                <div className="overflow-hidden rounded-xl">
                  <div className="relative h-52 w-full">
                    <Image src={f.image} alt={f.title} fill className="object-cover" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold">{f.title}</div>
                    <div className="text-sm">Donors: <span className="text-brand font-semibold">{f.donors}</span></div>
                  </div>
                  <div className="text-right">
                   
                    <span className="rounded-full bg-brand/15 px-4 py-1 text-xs text-brand">{f.status}</span>
                    <div className="text-sm">Raised <span className="text-brand font-semibold">${f.raised.toLocaleString()}</span> of ${f.goal.toLocaleString()}</div>
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Link href="#" className="inline-flex items-center gap-0 rounded-full bg-brand border border-brand/30 px-4 py-2 text-sm text-white">
                    <span>View Project</span>
                    <div className="ml-2 grid h-6 w-6 place-items-center rounded-full bg-white border border-brand/30">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-brand">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                  <div className="text-right text-sm text-brand">{pct}%</div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </main>
    </div>
  );
}


