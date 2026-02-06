'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from './ui';
import { Heart, MessageCircle, Bookmark, Share2, Ellipsis } from 'lucide-react';

type Project = {
  title: string;
  image: string;
  summary: string;
  raised: number;
  goal: number;
  owner?: {
    id: string;
    name: string;
    email: string;
  };
};

export default function ProjectCard({ project }: { project: Project }) {
  const goal = project.goal || 1000;
  const raised = project.raised || 0;
  const progress = Math.min(100, Math.round((raised / goal) * 100)) || 0;
  const [isHovered, setIsHovered] = useState(false);

  const floatingVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring' as const,
        stiffness: 100,
        damping: 10
      }
    }),
    hover: { y: -5, scale: 1.05 }
  };

  const cardVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    },
    hover: { 
      y: -10, 
      boxShadow: '0 30px 60px -12px rgba(0,0,0,0.15), 0 18px 36px -18px rgba(0,0,0,0.1)' 
    }
  } as const;

  return (
    <motion.div
      variants={cardVariants}
      initial="visible"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ opacity: 1, visibility: 'visible' }}
      className="relative z-20 w-full"
    >
      <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 w-full transition-all duration-500 hover:shadow-brand/20">
      <div className="flex items-center justify-between px-6 pt-5 pb-2 text-slate-900">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm ring-2 ring-brand/5">
            {project.owner?.name?.charAt(0) || 'P'}
          </div>
          <div>
            <div className="text-base font-bold leading-none">{project.owner?.name || 'Project Owner'}</div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Innovation Leader</div>
          </div>
        </div>
        <button className="h-10 w-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
          <Ellipsis size={20} />
        </button>
      </div>
      
      <div className="relative mx-6 mt-2 h-[280px] overflow-hidden rounded-[2rem] group-hover:shadow-xl transition-shadow duration-500">
        <Image 
          src={project.image || '/microguard.jpg'} 
          alt={project.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <AnimatePresence>
        <motion.div 
          className="relative mx-6 -mt-8 flex justify-center z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: isHovered ? -12 : 0,
          }}
          transition={{ 
            type: 'spring',
            stiffness: 260,
            damping: 20
          }}
        >
          <div className="glass flex gap-6 rounded-3xl px-6 py-3 shadow-2xl backdrop-blur-md bg-white/90 border border-white/20">
            {[
              { icon: <Heart size={20} />, count: '0' },
              { icon: <MessageCircle size={20} />, count: '0' },
              { icon: <Bookmark size={20} />, count: 'Save' },
              { icon: <Share2 size={20} />, count: 'Share' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-brand"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={floatingVariants}
              >
                <button className="grid h-10 w-10 place-items-center rounded-2xl bg-brand/10 transition-all duration-300 hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-brand/20">
                  {item.icon}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="px-7 pb-8 pt-6 text-slate-900">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-2xl font-black tracking-tight leading-tight">{project.title}</h3>
          <div className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest rounded-full">Active</div>
        </div>
        <p className="text-[15px] text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">{project.summary}</p>
        
        <div className="space-y-3">
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-50">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-brand to-emerald-400 shadow-[0_0_12px_rgba(0,195,153,0.4)]" 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Raised</span>
              <span className="text-lg font-black text-brand">${project.raised.toLocaleString()}</span>
            </div>
            <div className="text-right flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 text-right">Goal</span>
              <span className="text-lg font-black text-slate-800">${project.goal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-200 transition-all">
            Details
          </Button>
          <Button className="flex-1 h-14 rounded-2xl bg-brand text-white font-bold shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all">
            Support Project
          </Button>
        </div>
      </div>
      </div>
    </motion.div>
  );
}


