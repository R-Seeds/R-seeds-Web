'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from './Sidebar';
import Spotlight from '@/components/Spotlight';
import BalanceCard from '@/components/BalanceCard';
import ProjectCard from '@/components/ProjectCard';
import Notifications from '@/components/Notifications';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const projects = [
  {
    title: 'Wearable AI Health',
    image: '/doctor.jpg',
    summary: 'A wearable health device that monitors body conditions like temperature, hydration, and immunity... more',
    raised: 2500,
    goal: 10000,
  },
  {
    title: 'Agri Robotics',
    image: '/farm.jpg',
    summary: 'Autonomous robots to improve crop monitoring and yields in sustainable farms.',
    raised: 5200,
    goal: 10000,
  },
];

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // Role guard: default user only
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const type = (localStorage.getItem('userType') || 'user').toLowerCase();
      if (!isLoggedIn) {
        router.replace('/');
        return;
      }
      if (type !== 'user') {
        // Stay consistent: accessing /user while logged as another role goes to home
        router.replace('/');
      }
    } catch {}
    setRoleChecked(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted || !roleChecked) return null;

  return (
    <div className='bg-white'>
      <Header />
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
            <motion.div 
              className="mt-4 flex flex-col gap-4"
              variants={staggerContainer}
            >
              {projects.map((p, i) => (
                <motion.div 
                  key={p.title} 
                  variants={fadeInUp}
                  custom={0.3 + (i * 0.1)}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </motion.div>
          </section>
          <motion.aside 
            className="w-full"
            variants={fadeInUp}
            custom={0.4}
          >
            <Notifications />
          </motion.aside>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}


