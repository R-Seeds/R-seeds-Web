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

export default function ProjectCard({
  project,
  onFundClick,
}: {
  project: Project;
  onFundClick: () => void;
}) {
  const progress = Math.min(100, Math.round((project.raised / project.goal) * 100));
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
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


  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card className="overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-3">
            <Image
              src="/microguard.jpg"
              alt="MicroGuard"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="text-base font-semibold">MicroGuard</div>
          </div>
          <Ellipsis className="text-slate-500" size={18} />
        </div>

        <div className="relative mx-4 mt-3 h-[320px] overflow-hidden rounded-2xl">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>

        {/* Floating actions */}
        <AnimatePresence>
          <motion.div
            className="relative mx-4 -mt-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass flex gap-8 rounded-2xl px-6 py-3 shadow-card backdrop-blur-sm">
              {[Heart, MessageCircle, Bookmark, Share2].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-brand"
                  custom={i}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  variants={floatingVariants}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15 hover:bg-brand/30">
                    <Icon size={22} />
                  </div>
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
            <div className="text-sm text-slate-700">
              Raised ${project.raised.toLocaleString()} of ${project.goal.toLocaleString()}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full border-brand text-brand hover:bg-brand/5">
                View Project
              </Button>
              <Button className="rounded-full" onClick={onFundClick}>
                Fund Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
