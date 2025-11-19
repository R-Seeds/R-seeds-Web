"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Thanks to this platform, my smart irrigation project reached donors I never imagined. I secured the funding I needed to make my idea a reality!",
    author: "Aline Mukamana",
    role: "Class of 2025",
    image: "/girl.jpg",
  },
  {
    id: 2,
    quote:
      "The exposure and support I received through this platform have been invaluable for developing my AI medical diagnostic solution.",
    author: "Hassan Yousuf",
    role: "Class of 2025",
    image: "/girl.jpg",
  },
  {
    id: 3,
    quote:
      "Being part of this community connected me with investors who truly believed in my vision. This is more than just funding, it is a partnership.",
    author: "Amina Okafor",
    role: "Class of 2025",
    image: "/girl.jpg",
  },
  {
    id: 4,
    quote:
      "As a donor, I found incredible projects and talented innovators all in one place. The transparency and impact are remarkable.",
    author: "James Mitchell",
    role: "Global Donor",
    image: "/girl.jpg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlay(false);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-gradient-to-b from-white to-blue-50/30"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16 text-black animate-fade-in-up">
          What Donors & Graduates Say
        </h2>

        <div className="relative">
          {/* Testimonial Cards Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white border-2 border-[#00C896] rounded-2xl p-8 min-h-72 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Quote */}
                    <p className="text-gray-700 text-lg leading-relaxed relative z-10 italic">
                      "{testimonial.quote}"
                    </p>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4 mt-8 relative z-10">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-[#00C896] bg-gradient-to-br from-cyan-100 to-blue-100">
                          <Image
                            src={testimonial.image || "/placeholder-user.jpg"}
                            alt={testimonial.author}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-black text-lg">
                          {testimonial.author}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 lg:translate-x-0 w-12 h-12 bg-[#00C896] hover:bg-[#154035] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 lg:translate-x-0 w-12 h-12 bg-[#00C896] hover:bg-[#154035] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-3 bg-[#00C896]"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
