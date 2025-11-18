"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";

export default function AppSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
    disappear: {
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" as const, delay: 2 },
    },
  };

  return (
    <section className="py-20 px-6 bg-gray-100">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div variants={itemVariants}>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 text-[#154035]"
            >
              Download Our App
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <div className="flex items-end gap-4">
                  <h3 className="text-2xl font-bold text-[#154035]">
                    Your Gateway To Tech Opportunities
                  </h3>
                  <motion.div
                    className="h-1 bg-[#154035] origin-left"
                    variants={underlineVariants}
                    initial="hidden"
                    animate={["visible", "disappear"]}
                    transition={{
                      repeatType: "reverse",
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    style={{ width: "80px" }}
                  />
                </div>
                <p className="text-gray-600 leading-relaxed mt-2">
                  Stay Connected anywhere, anytime
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Discover groundbreaking projects from RCA graduates, follow
                their journeys from idea to impact, track real-time funding
                progress, and contribute directly to the next generation of
                African innovation – all from the comfort of your mobile device.
              </p>

              <motion.div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#154035] text-white rounded-lg font-semibold"
                >
                  <Download size={20} /> App Store
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#00C896] text-white rounded-lg font-semibold"
                >
                  <Download size={20} /> Google Play
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Phone Images */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-8 relative"
          >
            {/* Phone 1 */}
            <div className="relative z-10">
              <Image
                src="/Phones.png"
                alt="App interface left"
                width={800}
                height={600}
                
              />
            </div>

            
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
