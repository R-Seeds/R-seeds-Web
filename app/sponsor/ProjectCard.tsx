
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../../components/ui';
import { Heart, MessageCircle, Bookmark, Share2, Ellipsis } from 'lucide-react';

type Project = {
  title: string;
  image: string;
  summary: string;
  raised: number;
  goal: number;
};

export default function ProjectCard({ project }: { project: Project }) {
  const progress = Math.min(100, Math.round((project.raised / project.goal) * 100));
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger the animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1] // Using cubic-bezier values for easeOut
      }
    },
    hover: { 
      y: -5, 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
    }
  } as const;

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card className="overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-3">
          <Image src="/microguard.jpg" alt="MicroGuard" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
          <div className="text-base font-semibold">MicroGuard</div>
        </div>
        <Ellipsis className="text-slate-500" size={18} />
      </div>
      <div className="relative mx-4 mt-3 h-[320px] overflow-hidden rounded-2xl">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>

      {/* floating actions */}
      <AnimatePresence>
        <motion.div 
          className="relative mx-4 -mt-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: isHovered ? -10 : 0,
            transition: { 
              y: { 
                type: 'spring',
                stiffness: 100,
                damping: 10
              },
              opacity: { duration: 0.3 }
            }
          }}
        >
          <div className="glass flex gap-8 rounded-2xl px-6 py-3 shadow-card backdrop-blur-sm">
            {[
              { icon: <Heart size={22} />, count: '123k' },
              { icon: <MessageCircle size={22} />, count: '200' },
              { icon: <Bookmark size={22} />, count: 'Save' },
              { icon: <Share2 size={22} />, count: 'Share' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-brand"
                custom={index}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={floatingVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand/15 transition-all duration-300 hover:bg-brand/30"
                  whileTap={{ scale: 0.9 }}
                >
                  {item.icon}
                </motion.div>
                <motion.div 
                  className="mt-1 text-xs text-slate-600"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0.7,
                    y: isHovered ? 0 : 5,
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.count}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="px-4 pb-5 pt-4">
        <p className="text-[15px] text-slate-700">{project.summary}</p>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-700">Raised ${project.raised.toLocaleString()} of ${project.goal.toLocaleString()}</div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full border-brand text-brand hover:bg-brand/5">View Project</Button>
            <Button className="rounded-full">Fund Now</Button>
          </div>
        </div>
      </div>
    </Card>
    </motion.div>
  );
}


