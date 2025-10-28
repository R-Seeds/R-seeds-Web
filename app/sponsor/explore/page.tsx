'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '../Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInUp, staggerContainer, scaleUp } from '@/utils/animations';

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='relative min-h-screen bg-white'>
      <Header />
      <div className='relative z-10'>
        <Sidebar />
      </div>
      <AnimatePresence mode='wait'>
        <motion.main 
          className="relative z-0 mx-auto max-w-7xl px-6 py-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.section 
            className="rounded-2xl bg-white p-5 shadow-card"
            variants={fadeInUp}
          >
          {/* Search */}
          <motion.div 
            className="flex items-center rounded-full border border-brand/60 bg-white px-3 py-2 text-sm shadow-sm"
            variants={fadeInUp}
            custom={0.1}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2 text-brand">
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <input
              placeholder="Search..."
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />
          </motion.div>

          {/* Most viewed */}
          <motion.div className="mt-8" variants={fadeInUp} custom={0.2}>
            <motion.h2 className="mb-4 text-lg font-semibold text-slate-800">Most Viewed</motion.h2>
            <motion.div 
              className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5"
              variants={staggerContainer}
            >
              {mostViewed.map((item, i) => (
                <motion.div key={item.name} variants={scaleUp} custom={i * 0.1}>
                  <Link href={`/sponsor/explore/${item.slug}`}>
                    <div className="group relative h-48 overflow-hidden rounded-xl border-2 border-brand/60 transition-all duration-300 hover:border-brand/90 hover:shadow-lg">
                      <Image 
                        src={item.img} 
                        alt={item.name} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-3 text-center">
                        <span className="text-sm font-semibold text-white">{item.name}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Browse by Category */}
          <motion.div className="mt-12" variants={fadeInUp} custom={0.3}>
            <motion.h2 className="mb-4 text-lg font-semibold text-slate-800">Browse by Category</motion.h2>
            <motion.div 
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
              variants={staggerContainer}
            >
              {categories.map((c, i) => (
                <motion.div 
                  key={c.name} 
                  variants={scaleUp}
                  custom={i * 0.05}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative h-28 overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <Image 
                    src={c.img} 
                    alt={c.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-center text-sm font-semibold text-white drop-shadow-md">{c.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Based on Your Interests */}
          <motion.div className="mt-12" variants={fadeInUp} custom={0.4}>
            <motion.h2 className="mb-6 text-lg font-semibold text-slate-800">Based on Your Interests</motion.h2>
            <motion.div 
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
            >
              {interests.map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  custom={i * 0.1}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg"
                >
                  <Link href={`/explore/${item.slug}`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/4] lg:aspect-[4/3]">
                      <Image 
                        src={item.img} 
                        alt="interest" 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-xl font-bold text-white drop-shadow-lg">VisionAR</span>
                        <p className="mt-1 text-sm text-white/80">Discover more</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          </motion.section>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}


