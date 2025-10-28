'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '../../Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInUp, staggerContainer, scaleUp } from '@/utils/animations';

type Params = { params: { slug: string } };

const sample = {
  title: 'SkyScout',
  hero: '/sky.jpg',
  tags: ['Agriculture', 'Education'],
  summary:
    'SkyScout is an intelligent drone platform designed for aerial mapping, surveillance, and delivery. Equipped with advanced sensors and GPS navigation, SkyScout can capture real-time data from above, making it valuable for agriculture, logistics, disaster management, and security.',
  mission:
    'To provide reliable, versatile, and cost–effective drones/solutions that empower communities, businesses, and organizations.',
  vision:
    'A future where drones become everyday assistants improving efficiency, safety, and sustainability across multiple industries.',
  features: [
    'Autonomous flight planning via mobile app.',
    'HD video and thermal imaging cameras.',
    'Modular payload system (sensors, sprayers, delivery boxes).',
    'Real-time GPS tracking and geofencing.',
    'Emergency return-to-home functionality.',
  ],
  team: new Array(4).fill(0).map((_, i) => ({
    name: 'Justin Carder',
    role: 'UI/UX designer',
    avatar: '/girl.jpg',
    id: i,
  })),
  raised: 5200,
  target: 10000,
};

export default function ProjectDetail({ params }: Params) {
  const [isMounted, setIsMounted] = useState(false);
  const p = sample; 
  const progress = Math.round((p.raised / p.target) * 100);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Sidebar />
      <AnimatePresence mode='wait'>
        <motion.main 
          className="mx-auto max-w-7xl px-6 py-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="rounded-2xl bg-white p-4 shadow-card md:p-6"
            variants={fadeInUp}
            custom={0.1}
         />
          {/* Hero */}
          <motion.div 
            className="relative h-[260px] w-full overflow-hidden rounded-xl md:h-[360px] group"
            variants={scaleUp}
            custom={0.2}
            whileHover={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="h-full w-full"
            >
              <Image 
                src={p.hero} 
                alt={p.title} 
                fill 
                className="object-cover transition-all duration-700 ease-out"
                priority
              />
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Title + actions */}
          <motion.div 
            className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            variants={fadeInUp}
            custom={0.3}
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-slate-900">{p.title}</h1>
              <Link
                href={`/graduate/edit-project/${params.slug}`}
                className="relative group p-1"
                aria-label="Edit Project"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00c399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/>
                </svg>
                <span className="block h-1 w-6 bg-[#00c399] rounded group-hover:bg-[#00b387] mt-0.5"></span>
              </Link>
            </div>
            <div className="flex gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-brand bg-brand/10 px-3 py-1 text-sm text-brand">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div 
            className="mt-6"
            variants={fadeInUp}
            custom={0.4}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-sm text-slate-600">Funds Raised</div>
                <div className="text-2xl font-bold text-slate-900">${p.raised.toLocaleString()}</div>
              </div>
              <div className="flex-1 mx-6">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full bg-brand" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600">Target</div>
                <div className="text-2xl font-bold text-brand">${p.target.toLocaleString()}</div>
              </div>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div 
            className="mt-8 relative bg-gray-50 p-6 rounded-xl overflow-hidden"
            variants={fadeInUp}
            custom={0.5}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent"
              initial={{ x: '-100%' }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.p 
              className="text-[15px] leading-relaxed text-slate-700 pr-24 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {p.summary}
            </motion.p>
            <motion.button 
              className="absolute top-0 right-0 rounded-full bg-brand px-6 py-2 text-sm text-white z-10"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 4px 12px -2px rgba(0, 195, 153, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Follow
            </motion.button>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div 
            className="mt-8 space-y-6 p-6 bg-gradient-to-r from-brand/5 to-purple-50 rounded-xl"
            variants={fadeInUp}
            custom={0.6}
          >
            <div>
              <span className="text-sm font-bold text-brand">Mission →</span>
              <span className="ml-2 text-sm text-slate-700">{p.mission}</span>
            </div>
            <div>
              <span className="text-sm font-bold text-brand">Vision →</span>
              <span className="ml-2 text-sm text-slate-700">{p.vision}</span>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div 
            className="mt-8"
            variants={fadeInUp}
            custom={0.7}
          >
            <div className="mb-3 text-sm font-bold text-brand">Key Features</div>
            <ul className="space-y-2 text-sm text-slate-700">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-slate-400">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Team */}
          <motion.div 
            className="mt-12"
            variants={fadeInUp}
            custom={0.8}
          >
            <div className="mb-6 text-lg font-bold text-slate-800">Team Members</div>
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {p.team.map((m, i) => (
                <motion.div 
                  key={m.id} 
                  className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  variants={fadeInUp}
                  custom={i * 0.1}
                >
                  <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                    <Image src={m.avatar} alt={m.name} width={64} height={64} className="h-16 w-16 object-cover" />
                  </div>
                  <div className="mt-2 text-sm font-bold text-slate-900">{m.name}</div>
                  <div className="text-xs text-slate-500">{m.role}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Milestone */}
          <motion.div 
            className="mt-12 p-6 bg-white rounded-xl border border-slate-100 shadow-sm"
            variants={fadeInUp}
            custom={0.9}
          >
            <div className="mb-6 text-sm font-bold text-brand">Milestone</div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-brand"></div>
              
              {/* Timeline nodes */}
              <div className="relative flex justify-between">
                {/* Completed milestones */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative z-10">
                    <div className="h-6 w-6 rounded-full bg-brand border-2 border-brand flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                ))}
                
                {/* Current milestone */}
                <div className="relative z-10 mr-36">
                  <div className="h-6 w-6 rounded-full bg-brand border-2 border-brand flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Location pin above current milestone */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-brand">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  {/* Connecting line to info box */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-px h-8 bg-brand"></div>
                </div>
                
                {/* Future milestone */}
                <div className="relative z-10">
                  <div className="h-6 w-6 rounded-full bg-white border-2 border-brand"></div>
                </div>
              </div>
              
              {/* Info box */}
              <div className="mt-8 max-w-md rounded-lg border border-brand bg-white p-4 mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-brand">System Integration</span>
                  <span className="text-xs text-slate-500">In progress</span>
                </div>
                <ul className="space-y-1 text-sm text-slate-700 mb-3">
                  <li>• Setting up the navigation system ($600)</li>
                  <li>• Purchasing sensors & GPS modules ($1,200)</li>
                  <li>• Drone frame assembly for first prototype ($900)</li>
                </ul>
                <div className="text-xs text-brand">Completion: October 20, 2025</div>
                <div className="text-xs text-brand">Total Funds: $2,700</div>
              </div>
            </div>
          </motion.div>

          {/* Funding info (simple list) */}
          <motion.div 
            className="mt-10"
            variants={fadeInUp}
            custom={1}
          >
            <div className="text-sm font-bold text-brand mb-3">Funding info</div>
            <div className="space-y-1 text-[13px] leading-relaxed text-slate-700">
              <div><span className="font-semibold">Project Name:</span> SkyScout</div>
              <div><span className="font-semibold">Funding Goal:</span> $12,000</div>
              <div><span className="font-semibold">Current Raised:</span> $8,450</div>
              <div><span className="font-semibold">Donors:</span> 37 contributors</div>
            </div>
          </motion.div>

          {/* Links and Docs */}
          <motion.div 
            className="mt-8"
            variants={fadeInUp}
            custom={1.1}
          >
            <div className="text-sm font-bold text-brand mb-3">Links and Docs</div>
            <div className="space-y-1 text-[13px] leading-relaxed text-slate-700">
              <div>
                <span className="font-semibold">Project website:</span> <a className="text-brand hover:underline" href="#">https://www.skyscout.rw</a>
              </div>
              <div>
                <span className="font-semibold">Jira Link:</span> <a className="text-brand hover:underline" href="#">link</a>
              </div>
              <div>
                <span className="font-semibold">GitHub Repo:</span> <a className="text-brand hover:underline" href="#">https://github.com/RCA-Projects/GreenByte</a>
              </div>
            </div>
          </motion.div>

        </motion.main>
      </AnimatePresence>
    </div>
  );
}

