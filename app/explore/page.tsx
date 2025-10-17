import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';

const mostViewed = [
  { name: 'AgriBot', img: '/farm.jpg', slug: 'agribot' },
  { name: 'EduBot', img: '/doctor.jpg', slug: 'edubot' },
  { name: 'SkyScout', img: '/skyscout.jpg', slug: 'skyscout' },
  { name: 'EduBot', img: '/edubot.jpg', slug: 'edubot-2' },
  { name: 'EduBot', img: '/ascent.jpg', slug: 'ascent' },
];

const categories = [
  { name: 'Finance', img: '/finance.jpg' },
  { name: 'Business', img: '/business.jpg' },
  { name: 'Education', img: '/edubot.jpg' },
  { name: 'Health', img: '/doctor.jpg' },
  { name: 'Agriculture', img: '/agribot.jpg' },
  { name: 'Transportation', img: '/train.jpg' },
  { name: 'Social', img: '/hands.jpg' },
  { name: 'E-commerce', img: '/cart.jpg' },
  { name: 'Government', img: '/govern.jpg' },
  { name: 'Entertainment', img: '/fam.jpg' },
];

const interests = [
  { img: '/glass.jpg', slug: 'glass' },
  { img: '/joker.jpg', slug: 'joker' },
  { img: '/blues.jpg', slug: 'blues' },
  { img: '/culinary.jpg', slug: 'culinary' },
  { img: '/food.jpg', slug: 'food' },
  { img: '/ascent.jpg', slug: 'ascent' },
];

export default function ExplorePage() {
  return (
    <div className='bg-white'>
      <Header />
      <Sidebar />
      <main className="mx-auto max-w-7xl px-6 py-6">
        <section className="rounded-2xl bg-white p-5 shadow-card">
          {/* Search */}
          <div className="flex items-center rounded-full border border-brand/60 bg-white px-3 py-2 text-sm shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2 text-brand"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/></svg>
            <input
              placeholder="Search..."
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Most viewed */}
          <div className="mt-5">
            <div className="mb-2 text-sm font-semibold text-slate-700">Most Viewed</div>
            <div className="grid grid-cols-5 gap-4">
              {mostViewed.map((item) => (
                <Link key={item.name} href={`/explore/${item.slug}`}>
                  <div className="relative h-44 overflow-hidden rounded-xl border-2 border-brand/60">
                    <Image src={item.img} alt={item.name} fill className="object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/50 py-2 text-center text-white text-sm font-semibold">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Browse by Category */}
          <div className="mt-6">
            <div className="mb-2 text-sm font-semibold text-slate-700">Browse by Category</div>
            <div className="grid grid-cols-5 gap-3">
              {categories.map((c) => (
                <div key={c.name} className="relative h-24 overflow-hidden rounded-lg">
                  <Image src={c.img} alt={c.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 grid place-items-center text-white font-semibold text-sm">{c.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Based on Your Interests */}
          <div className="mt-6">
            <div className="mb-2 text-sm font-semibold text-slate-700">Based on Your Interests</div>
            <div className="grid grid-cols-3 gap-6">
              {interests.map((item, i) => (
                <Link key={i} href={`/explore/${item.slug}`}>
                  <div className="relative h-64 overflow-hidden rounded-xl shadow-card">
                    <Image src={item.img} alt="interest" fill className="object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 py-3 text-center">
                      <span className="text-white text-lg font-semibold">VisionAR</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


