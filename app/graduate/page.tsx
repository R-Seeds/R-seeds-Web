'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from './Sidebar';
import Spotlight from '@/components/Spotlight';
import BalanceCard from './BalanceCard';
import ProjectCard from '@/components/ProjectCard';
import Notifications from '@/components/Notifications';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { getMyProjects, ProjectDTO } from '@/utils/api';

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // Role guard: only allow graduates
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const type = (localStorage.getItem('userType') || 'user').toLowerCase();
      if (!isLoggedIn) {
        router.replace('/');
        return;
      }
      if (type !== 'graduate') {
        if (type === 'sponsor') router.replace('/sponsor');
        else router.replace('/user');
      }
    } catch {}
    setRoleChecked(true);

    const fetchProjects = async () => {
      console.log("Starting to fetch projects...");
      try {
        const data = await getMyProjects();
        console.log("Projects fetched successfully:", data);
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        console.log("Fetch finished, setting isLoading to false");
        setIsLoading(false);
      }
    };

    fetchProjects();
    return () => setIsMounted(false);
  }, []);

  if (!isMounted || !roleChecked) return null;

  return (
    <div className='bg-white'>
      <Header onNotificationClick={() => setShowNotifications(!showNotifications)} />
      <Sidebar />
      <AnimatePresence mode='wait'>
        <motion.main 
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-6 md:grid-cols-[minmax(0,1fr)_420px]"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <section>
            <motion.div variants={fadeInUp}>
              <Spotlight />
            </motion.div>
            <motion.div className="mt-3" variants={fadeInUp} custom={0.2}>
              <BalanceCard />
            </motion.div>
            
            <div className="mt-8 px-1">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 font-primary">My Projects</h2>
              
              <div className="min-h-[200px] w-full">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand border-t-transparent shadow-brand/20"></div>
                    <p className="mt-4 text-slate-500 font-bold uppercase tracking-wider text-sm">Loading your innovations...</p>
                  </div>
                ) : projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
                    {projects.map((p, i) => (
                      <ProjectCard 
                        key={p.id || i}
                        project={{
                          title: p.title,
                          image: p.logo || '/microguard.jpg',
                          summary: p.description,
                          raised: p.fundingInfo?.raised || 0,
                          goal: p.fundingInfo?.goal || 1000,
                          owner: p.owner
                        }} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 py-32 text-center bg-slate-50/30">
                    <div className="mb-4 flex justify-center">
                      <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12h14"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-slate-700">You haven't created any projects yet.</p>
                    <p className="text-slate-500 mt-2 font-medium">Start your journey by creating your first project.</p>
                    <button 
                      onClick={() => router.push('/graduate/add-new-project')}
                      className="mt-8 bg-brand text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      Create First Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
          {showNotifications && (
            <motion.aside 
              className="w-full"
              variants={fadeInUp}
              custom={0.4}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Notifications />
            </motion.aside>
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}


