"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "./Sidebar";
import Spotlight from "@/components/Spotlight";
import ProjectCard from "./ProjectCard";
import Notifications from "@/components/Notifications";
import FundMicroGuardModal from "@/components/FundMicroGuardModal.tsx";
import ConfirmFundingModal from "@/components/ConfirmFundingModal";
import SuccessModal from "@/components/SuccessModal";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const projects = [
  {
    title: "Wearable AI Health",
    image: "/doctor.jpg",
    summary:
      "A wearable health device that monitors body conditions like temperature, hydration, and immunity... more",
    raised: 2500,
    goal: 10000,
  },
  {
    title: "Agri Robotics",
    image: "/farm.jpg",
    summary:
      "Autonomous robots to improve crop monitoring and yields in sustainable farms.",
    raised: 5200,
    goal: 10000,
  },
];

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [fundDetails, setFundDetails] = useState({ amount: "", method: "" });

  useEffect(() => {
    setIsMounted(true);
    // Role guard: sponsor only
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const type = (localStorage.getItem('userType') || 'user').toLowerCase();
      if (!isLoggedIn) {
        router.replace('/');
        return;
      }
      if (type !== 'sponsor') {
        if (type === 'graduate') router.replace('/graduate');
        else router.replace('/user');
      }
    } catch {}
    setRoleChecked(true);
  }, []);

  if (!isMounted || !roleChecked) return null;

  
  const handleFundConfirm = (details: { amount: string; method: string }) => {
    setFundDetails(details);
    setIsFundModalOpen(false);
    setIsConfirmModalOpen(true);
  };

 
  const handleConfirmModalConfirm = () => {
    setIsConfirmModalOpen(false);

    
    setTimeout(() => {
      setIsSuccessModalOpen(true);
    }, 300);
  };

  return (
    <div className="relative bg-white transition-all duration-300">
      <Header onNotificationClick={() => setShowNotifications(!showNotifications)} />
      <Sidebar />

      {/* Main Content */}
      <AnimatePresence mode="wait">
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

            <motion.div
              className="mt-4 flex flex-col gap-4"
              variants={staggerContainer}
            >
              {projects.map((p, i) => (
                <motion.div key={p.title} variants={fadeInUp} custom={0.3 + i * 0.1}>
                  <ProjectCard
                    project={p}
                    onFundClick={() => setIsFundModalOpen(true)}
                  />
                </motion.div>
              ))}
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

      {/* Fund Modal */}
      <AnimatePresence>
        {isFundModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFundModalOpen(false)}
            />
            <FundMicroGuardModal
              isOpen={isFundModalOpen}
              onClose={() => setIsFundModalOpen(false)}
              onConfirm={handleFundConfirm}
            />
          </>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirmModalOpen(false)}
            />
            <ConfirmFundingModal
              isOpen={isConfirmModalOpen}
              onClose={() => setIsConfirmModalOpen(false)}
              project="SkyScout"
              amount={fundDetails.amount}
              method={fundDetails.method}
              onConfirm={handleConfirmModalConfirm}
            />
          </>
        )}
      </AnimatePresence>

      {/*  Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <SuccessModal
            isOpen={isSuccessModalOpen}
            onClose={() => setIsSuccessModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
