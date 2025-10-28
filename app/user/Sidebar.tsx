"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Compass,
  Coins,
  MessageCircleMore,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { icon: Home, label: "Home", href: "/user" },
  { icon: Compass, label: "Explore", href: "/user/explore" },
  { icon: MessageCircleMore, label: "Chat", href: "/user/chat" },
  { icon: UserRound, label: "Profile", href: "/user/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // active
  const activeIdx = items.findIndex((i) =>
    i.href === "/user" ? pathname === i.href : pathname.startsWith(i.href)
  );

  if (!mounted) return null;

  return (
    <motion.aside
      className="fixed left-8 top-[30%] z-20 flex -translate-y-1/2 flex-col items-center justify-center 
                 rounded-[48px] bg-brand/90 p-3 text-white shadow-xl backdrop-blur-md"
      style={{ height: "fit-content" }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex w-full flex-col items-center space-y-6 px-2 py-3">
        {items.map(({ icon: Icon, label, href }, idx) => {
          const isActive = idx === activeIdx;
          return (
            <motion.div key={label} className="relative">
              <Link href={href} className="block">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 
                    ${isActive ? "scale-110" : "scale-100"}
                  `}
                >
                  <Icon
                    size={26}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-emerald-300" : "text-white/80"
                    }`}
                  />
                </div>
              </Link>

         
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key={`active-${label}`}
                    className="absolute -left-2 -top-3 z-10 flex items-center 
                               rounded-[24px] bg-white px-4 py-2.5 pr-6 text-slate-900 
                               shadow-[6px_8px_0_rgba(0,0,0,0.15)]"
                    initial={{ x: -20, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -20, opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                        repeatType: "reverse",
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
          );
        })}
      </div>
    </motion.aside>
  );
}
