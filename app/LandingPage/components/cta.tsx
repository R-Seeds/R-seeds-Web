'use client'

import { motion } from 'framer-motion'

export default function CTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#f0fdf9] relative overflow-hidden">
      {/* Animated ellipses background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -30, -60],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
            }}
            className="w-16 h-16 rounded-full border-3 border-[#154035]"
            style={{
              right: `${i * 20}px`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#154035] mb-6">
            Join the Innovation Movement Today!
          </h2>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Whether you're a young innovator ready to change the world or an established donor seeking
            to fuel Africa's most promising startups, there's a place for you on our platform.
            Discover, fund, and nurture the innovations building tomorrow's solutions to today's challenges.
          </p>

          <motion.div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,200,150,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#154035] text-white rounded-lg font-semibold text-lg"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,200,150,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-[#00C896] text-[#00C896] rounded-lg font-semibold text-lg hover:bg-[#00C896]/5"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
