"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, Coins, MessageCircleMore, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';

const items = [
  { icon: Home, label: 'Home', href: '/graduate' },
  { icon: Compass, label: 'Explore', href: '/graduate/explore' },
  { icon: Coins, label: 'Funds', href: '/graduate/fundings' },
  { icon: MessageCircleMore, label: 'Chat', href: '/graduate/chat' },
  { icon: UserRound, label: 'Profile', href: '/graduate/profile' },
];

const itemVariants = {
  closed: (i: number) => ({
    opacity: 0.8,
    scale: 0.95,
    transition: { 
      duration: 0.2,
      delay: 0.1 * i
    }
  }),
  hover: (i: number) => ({
    scale: 1.1,
    transition: { 
      type: 'spring' as const,
      stiffness: 400,
      damping: 10
    }
  }),
  active: (i: number) => ({
    scale: 1.2,
    transition: { 
      type: 'spring' as const,
      stiffness: 400,
      damping: 10
    }
  })
};

const activeLabelVariants = {
  initial: (i: number) => ({
    x: -20, 
    opacity: 0,
    scale: 0.9,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20
    }
  }),
  animate: (i: number) => ({
    x: 0, 
    opacity: 1,
    scale: 1,
    transition: { 
      type: 'spring' as const,
      stiffness: 300,
      damping: 20
    }
  }),
  exit: (i: number) => ({
    x: -20, 
    opacity: 0,
    scale: 0.9,
    transition: { 
      duration: 0.15,
      type: 'tween' as const
    }
  })
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeIdx = items.findIndex(i => {
    if (i.href === '#') return false;
    if (i.href === '/') return pathname === '/';
    return pathname.startsWith(i.href);
  });

  if (!mounted) return null;

  return (
    <motion.aside 
      className="fixed left-8 top-[30%] z-20 flex -translate-y-1/2 flex-col items-center justify-center rounded-[48px] bg-brand p-2 text-white shadow-xl backdrop-blur-sm" 
      style={{ height: 'fit-content' }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
    >
      <div className="flex w-full flex-col items-center space-y-6 px-2 py-3">
        {items.map(({ icon: Icon, label, href }, idx) => (
          <motion.div 
            key={label} 
            className="relative"
            onHoverStart={() => setIsHovered(idx)}
            onHoverEnd={() => setIsHovered(null)}
            custom={idx}
            initial="closed"
            animate={[isHovered === idx ? 'hover' : 'closed', activeIdx === idx ? 'active' : 'closed']}
            variants={itemVariants}
          >
            <Link href={href} className="block">
              <div className="grid h-12 w-12 place-items-center rounded-2xl">
                <Icon 
                  size={26} 
                  className={`transition-colors duration-200 ${activeIdx === idx ? 'text-brand' : 'text-white'}`} 
                />
              </div>
            </Link>

            <AnimatePresence>
              {activeIdx === idx && (
                <motion.div 
                  className="absolute -left-2 -top-3 z-10 flex items-center rounded-[24px] bg-white px-4 py-2.5 pr-6 text-slate-900 shadow-[6px_8px_0_rgba(0,0,0,0.15)]"
                  variants={activeLabelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={idx}
                  key={`active-${label}`}
                >
                  <motion.div 
                    className="mr-3 grid h-8 w-8 place-items-center rounded-full bg-brand/10"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    <Icon size={20} className="text-brand" />
                  </motion.div>
                  <motion.span 
                    className="text-base font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {label}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.aside>
  );
}


