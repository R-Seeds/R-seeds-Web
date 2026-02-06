'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '../Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInUp, staggerContainer, scaleUp } from '@/utils/animations';
import { getAllProjects, ProjectDTO } from '@/utils/api';
import ProjectCard from '@/components/ProjectCard';

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

export default function ExplorePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='relative min-h-screen bg-slate-50'>
      <Header />
      <Sidebar />
      
      <AnimatePresence mode='wait'>
        <motion.main 
          className="mx-auto max-w-7xl px-6 py-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Hero Section */}
          <motion.section 
            className="mb-16 text-center"
            variants={fadeInUp}
          >
            <h1 className="text-5xl font-extrabold text-slate-900 mb-6">Explore Innovations</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">Discover ground-breaking projects from our graduate community and find your next inspiration.</p>
            
            <div className="max-w-xl mx-auto relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects, categories, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-14 pr-6 rounded-full border-2 border-slate-200 bg-white text-lg focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-xl shadow-slate-200/50 outline-none"
              />
            </div>
          </motion.section>

          {/* Categories Grid */}
          <motion.section className="mb-20" variants={fadeInUp}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Browse by Category</h2>
              <button className="text-brand font-semibold hover:underline">View all</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.slice(0, 5).map((c, i) => (
                <motion.div 
                  key={c.name} 
                  variants={scaleUp}
                  custom={i * 0.05}
                  whileHover={{ y: -8 }}
                  className="group relative h-40 overflow-hidden rounded-3xl shadow-lg cursor-pointer"
                >
                  <Image 
                    src={c.img} 
                    alt={c.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-lg font-bold text-white leading-tight">{c.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Real Projects Grid */}
          <motion.section variants={fadeInUp}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Featured Projects</h2>
              <div className="flex gap-2">
                <span className="px-4 py-2 rounded-full bg-brand text-white text-sm font-bold shadow-md shadow-brand/20">All</span>
                <span className="px-4 py-2 rounded-full bg-white text-slate-600 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">Trending</span>
                <span className="px-4 py-2 rounded-full bg-white text-slate-600 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">Newest</span>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-brand border-t-transparent shadow-brand/10"></div>
                <p className="text-slate-500 font-medium animate-pulse">Scanning the innovations...</p>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProjects.map((p, i) => (
                  <motion.div key={p.id} variants={fadeInUp} custom={i * 0.1}>
                    <ProjectCard 
                      project={{
                        title: p.title,
                        image: p.logo || '/microguard.jpg',
                        summary: p.description,
                        raised: p.fundingInfo?.raised || 0,
                        goal: p.fundingInfo?.goal || 1000,
                        owner: p.owner
                      }} 
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-300 mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">No projects found</h3>
                <p className="text-slate-500 max-w-xs mx-auto">We couldn't find any projects matching your search. Try another keyword!</p>
              </div>
            )}
          </motion.section>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}


