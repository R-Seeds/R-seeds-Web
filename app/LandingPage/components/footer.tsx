'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#154035] text-white py-16 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'Akronim, serif', color: '#00C896' }}
            >
              R-seeds
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering graduates, Supporting innovations, Connecting opportunities.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-[#00C896] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C896] transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C896] transition-colors">
                  About
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
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C896] transition-colors">
                  Careers
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
            <h4 className="font-bold mb-4 text-lg">Sign up to our Newsletter later</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#00C896]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#00C896] text-[#154035] rounded-lg font-semibold hover:bg-[#00C896]/90 transition-colors"
              >
                <Mail size={20} />
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
  )
}
