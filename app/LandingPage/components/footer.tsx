"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.footer
      id="footer"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#154035] text-white py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 max-w-[1920px] mx-auto"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 mb-8 sm:mb-10 md:mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="mb-3 sm:mb-4">
              <Image
                src="/logo.png"
                alt="R-seeds"
                width={180}
                height={60}
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                priority
              />
            </div>
            <p className="text-gray-300 leading-relaxed" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)' }}>
              Empowering graduates, Supporting innovations. Building Africa's
              next generation of tech leaders.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-3 sm:mb-4" style={{ fontSize: 'clamp(16px, 2.5vw, 24px)' }}>Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-300" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)' }}>
              <li>
                <a
                  href="#hero"
                  className="hover:text-[#00C896] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#00C896] transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#explore-projects"
                  className="hover:text-[#00C896] transition-colors"
                >
                  Explore
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-3 sm:mb-4" style={{ fontSize: 'clamp(16px, 2.5vw, 24px)' }}>Company</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-300" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)' }}>
              <li>
                <a href="#" className="hover:text-[#00C896] transition-colors">
                  Donate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C896] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C896] transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-3 sm:mb-4" style={{ fontSize: 'clamp(16px, 2.5vw, 24px)' }}>
              Sign up to our Newsletter later
            </h4>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#00C896]"
                style={{ fontSize: 'clamp(12px, 1.5vw, 18px)' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#FFFFFF] text-[#000000] rounded-lg hover:bg-[#00C896] hover:text-[#FFFFFF] font-semibold transition-colors flex-shrink-0 w-full sm:w-auto"
                style={{ fontSize: 'clamp(12px, 1.5vw, 18px)' }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 pt-6 sm:pt-8 text-center text-gray-400"
          style={{ fontSize: 'clamp(11px, 1.3vw, 16px)' }}
        >
          <p>© 2025 R-seeds. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
