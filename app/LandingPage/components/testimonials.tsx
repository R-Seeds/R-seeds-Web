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
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-white to-blue-50/30"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 max-w-[1920px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-black animate-fade-in-up text-balance" style={{ fontSize: 'clamp(24px, 5vw, 64px)' }}>
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
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="bg-white border-2 border-[#00C896] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 min-h-[clamp(200px,35vh,300px)] flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Quote */}
                    <p className="text-gray-700 leading-relaxed relative z-10 italic text-balance" style={{ fontSize: 'clamp(14px, 2vw, 22px)' }}>
                      "{testimonial.quote}"
                    </p>

                    {/* Profile Section */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mt-4 sm:mt-6 md:mt-8 relative z-10">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full overflow-hidden border-[clamp(2px,0.3vw,4px)] border-[#00C896] bg-gradient-to-br from-cyan-100 to-blue-100">
                          <Image
                            src={testimonial.image || "/placeholder-user.jpg"}
                            alt={testimonial.author}
                            width={72}
                            height={72}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-black" style={{ fontSize: 'clamp(14px, 2vw, 22px)' }}>
                          {testimonial.author}
                        </p>
                        <p className="text-gray-500" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)' }}>
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
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 xl:-translate-x-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-[#00C896] hover:bg-[#154035] text-white rounded-full items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg z-20"
            aria-label="Previous testimonial"
          >
            <Image src="/arrow1.png" alt="Arrow" width={24} height={24} className="w-[clamp(16px,2vw,24px)] h-[clamp(16px,2vw,24px)]"/>
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 xl:translate-x-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-[#00C896] hover:bg-[#154035] text-white rounded-full items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg z-20"
            aria-label="Next testimonial"
          >
            <Image src="/arrow.png" alt="arrow" width={24} height={24} className="w-[clamp(16px,2vw,24px)] h-[clamp(16px,2vw,24px)]"/>
          </button>

          <div className="flex md:hidden justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={prevSlide}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00C896] text-white flex items-center justify-center transition-all hover:scale-110"
              aria-label="Previous testimonial mobile"
            >
              <Image src="/arrow1.png" alt="Arrow" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5"/>
            </button>
            <button
              onClick={nextSlide}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00C896] text-white flex items-center justify-center transition-all hover:scale-110"
              aria-label="Next testimonial mobile"
            >
              <Image src="/arrow.png" alt="arrow" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5"/>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 md:mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex
                    ? "w-6 sm:w-8 h-2 sm:h-3 bg-[#00C896]"
                    : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 hover:bg-gray-400"
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
