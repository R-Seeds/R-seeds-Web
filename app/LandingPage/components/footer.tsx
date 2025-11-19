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
      className="bg-[#154035] text-white py-16 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="R-seeds"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering graduates, Supporting innovations. Building Africa’s
              next generation of tech leaders.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
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
            <h4 className="font-bold mb-4 text-lg">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
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
            <h4 className="font-bold mb-4 text-lg">
              Sign up to our Newsletter later
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#00C896]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#FFFFFF] text-[#000000] rounded-lg hover:bg-[#00C896] hover:text-[#FFFFFF] font-semibold transition-colors"
              >
                <button> Subscribe</button>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 pt-8 text-center text-sm text-gray-400"
        >
          <p>© 2025 R-seeds. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
