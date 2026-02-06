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
import { getMyProjects, getAuthToken, type ProjectDTO } from '@/utils/api';

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // Authentication and role guard
    try {
      const token = getAuthToken();
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const type = (localStorage.getItem('userType') || 'user').toLowerCase();
      
      if (!token || !isLoggedIn) {
        router.replace('/login');
        return;
      }
      if (type !== 'user') {
        router.replace('/');
        return;
      }
    } catch {
      router.replace('/login');
      return;
    }
    setRoleChecked(true);
    return () => setIsMounted(false);
  }, [router]);

  useEffect(() => {
    if (roleChecked) {
      // Fetch user's projects
      const fetchProjects = async () => {
        try {
          setIsLoadingProjects(true);
          const userProjects = await getMyProjects();
          console.log('Fetched projects:', userProjects);
          console.log('Number of projects:', userProjects?.length || 0);
          if (userProjects && userProjects.length > 0) {
            console.log('First project details:', {
              id: userProjects[0].id,
              title: userProjects[0].title,
              logo: userProjects[0].logo,
              description: userProjects[0].description,
              fundingInfo: userProjects[0].fundingInfo
            });
          }
          setProjects(userProjects || []);
        } catch (error: any) {
          console.error('Failed to fetch projects:', error);
          console.error('Error details:', error.message);
          // Show error but don't block the page
          setProjects([]);
        } finally {
          setIsLoadingProjects(false);
        }
      };
      fetchProjects();
    }
  }, [roleChecked]);

  // Refresh projects when coming back from creating a project or on mount
  useEffect(() => {
    if (roleChecked) {
      const urlParams = new URLSearchParams(window.location.search);
      const shouldRefresh = urlParams.get('refresh') === 'true';
      
      if (shouldRefresh) {
        const fetchProjects = async () => {
          try {
            const userProjects = await getMyProjects();
            console.log('Refreshed projects:', userProjects);
            setProjects(userProjects || []);
            // Remove the refresh parameter from URL
            window.history.replaceState({}, '', '/user');
          } catch (error) {
            console.error('Failed to refresh projects:', error);
          }
        };
        fetchProjects();
      }
    }
  }, [roleChecked]);

  // Refresh projects when window gains focus
  useEffect(() => {
    const handleFocus = () => {
      if (roleChecked) {
        const fetchProjects = async () => {
          try {
            const userProjects = await getMyProjects();
            setProjects(userProjects || []);
          } catch (error) {
            console.error('Failed to refresh projects:', error);
          }
        };
        fetchProjects();
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [roleChecked]);

  if (!isMounted || !roleChecked) return null;

  return (
    <div className='bg-white min-h-screen'>
      <Header onNotificationClick={() => setShowNotifications(!showNotifications)} />
      <Sidebar />
      <AnimatePresence mode='wait'>
        <motion.main 
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-6 md:grid-cols-[minmax(0,1fr)_420px] relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <section className="relative z-10">
            <motion.div variants={fadeInUp}>
              <Spotlight />
            </motion.div>
            <motion.div className="mt-3" variants={fadeInUp} custom={0.2}>
              <BalanceCard />
            </motion.div>
            <motion.div 
              className="mt-4 flex flex-col gap-4 relative z-10"
              variants={staggerContainer}
            >
              {isLoadingProjects ? (
                <div className="text-center py-8 text-gray-500">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No projects yet. Create your first project!</p>
                  <button
                    onClick={() => router.push('/add-new-project')}
                    className="bg-[#00C896] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#00b68f] transition-colors"
                  >
                    Add New Project
                  </button>
                </div>
              ) : (
                projects.map((p, i) => (
                  <motion.div 
                    key={p.id || i} 
                    variants={fadeInUp}
                    custom={0.3 + (i * 0.1)}
                    className="relative z-20"
                    style={{ display: 'block', position: 'relative' }}
                  >
                    <ProjectCard project={{
                      title: p.title || 'Untitled Project',
                      image: p.logo && p.logo.startsWith('http') 
                        ? p.logo 
                        : (p.logo && p.logo.startsWith('/') 
                          ? `http://localhost:8080${p.logo}` 
                          : (p.logo ? `http://localhost:8080/${p.logo}` : '/microguard.jpg')),
                      summary: p.description || p.title || 'No description available',
                      raised: p.fundingInfo?.raised || 0,
                      goal: p.fundingInfo?.goal || 10000,
                    }} />
                  </motion.div>
                ))
              )}
            </motion.div>
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


