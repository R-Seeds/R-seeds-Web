"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Thanks to this platform, my smart irrigation project reached secured the funding I needed to make my dream a reality.",
      name: "Ada Okonkwo",
      role: "Tech Innovator",
      image: "/glass.jpg",
    },
    {
      text: "Thanks to this platform, my smart irrigation project reached secured the funding I needed to make my dream a reality.",
      name: "Chidi Amadi",
      role: "Entrepreneur",
      image: "/girl.jpg",
    },
    {
      text: "Thanks to this platform, my smart irrigation project reached secured the funding I needed to make my dream a reality.",
      name: "Zainab Hassan",
      role: "Developer",
      image: "/girl.jpg",
    },
    {
      text: "Thanks to this platform, my smart irrigation project reached secured the funding I needed to make my dream a reality.",
      name: "Kwame Asante",
      role: "Designer",
      image: "/african-man-designer.jpg",
    },
    {
      text: "Thanks to this platform, my smart irrigation project reached secured the funding I needed to make my dream a reality.",
      name: "Fatima Al-Rashid",
      role: "Innovator",
      image: "/african-woman-innovator.jpg",
    },
    {
      text: "Thanks to this platform, my smart irrigation project reached secured the funding I needed to make my dream a reality.",
      name: "Kofi Mensah",
      role: "Founder",
      image: "/african-man-founder.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [counter, setCounter] = useState(0);

  // Auto-rotate testimonials every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Counter animation to 10K
  useEffect(() => {
    if (counter < 10000) {
      const timer = setTimeout(() => {
        setCounter(
          Math.min(counter + Math.floor(Math.random() * 500) + 100, 10000)
        );
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [counter]);

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

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#f0fdf9]">
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
          What Donors & Graduates Say
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12 bg-white border-2 border-[#00C896]/20 rounded-lg min-h-64 flex flex-col justify-between"
              >
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#00C896]"
                  >
                    <Image
                      src={
                        testimonials[currentIndex].image || "/placeholder.svg"
                      }
                      alt={testimonials[currentIndex].name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <p className="font-bold text-[#154035]">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + testimonials.length) % testimonials.length
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-[#00C896] text-white p-2 rounded-full hover:bg-[#008856]"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % testimonials.length)
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-[#00C896] text-white p-2 rounded-full hover:bg-[#008856]"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Testimonial Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-2 mt-8"
        >
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              animate={{
                width: i === currentIndex ? 32 : 8,
                backgroundColor: i === currentIndex ? "#00C896" : "#00C896/30",
              }}
              className="h-2 rounded-full transition-all"
            />
          ))}
        </motion.div>

        {/* Counter Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center bg-gradient-to-r from-[#00C896]/10 to-[#154035]/10 rounded-lg p-12"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl font-bold text-[#00C896] mb-4"
          >
            {counter.toLocaleString()}+
          </motion.div>
          <p className="text-gray-700 text-lg">
            Successful projects & growing community of innovators
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
