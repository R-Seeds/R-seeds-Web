'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

export default function ExploreProjects() {
  const projects = [
    {
      title: 'The SkyScout',
      description: 'A wearable health device that monitors body conditions like temperature, humidity and more.',
      image: '/drone-camera-tech-device.jpg',
      creator: 'Mustapha Abdel Karim',
      status: 'Completed',
      fund: '3200',
    },
  ]

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
    <section className="py-20 px-6 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-center text-[#154035] mb-16"
        >
          Explore Projects
        </motion.h2>

        <motion.div className="space-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? 'md:grid-cols-2 md:direction-rtl' : ''
              }`}
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-lg h-80"
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Content */}
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-bold text-[#154035] mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <motion.div
                  variants={itemVariants}
                  className="space-y-3 mb-6"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#00C896]" />
                    <span className="text-gray-700">
                      Created by {project.creator}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#00C896]" />
                    <span className="text-gray-700">{project.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#00C896]" />
                    <span className="text-gray-700">
                      The Skyscout - Goal ${project.fund}
                    </span>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#00C896] font-semibold hover:text-[#008856] transition-colors"
                >
                  View Project →
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
