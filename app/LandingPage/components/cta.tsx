"use client";

import { useEffect, useRef, useState } from "react";

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden"
    >
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30 blur-3xl animate-wavy-circle"
        style={{
          background: "linear-gradient(135deg, #154035 0%, #00C896 100%)",
        }}
      ></div>
      <div
        className="absolute top-1/2 -left-32 w-72 h-72 rounded-full opacity-20 blur-3xl animate-wavy-circle"
        style={{ background: "#154035", animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-10 right-1/3 w-80 h-80 rounded-full opacity-25 blur-3xl animate-wavy-circle"
        style={{ background: "#00C896", animationDelay: "4s" }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Heading */}
        <h2
          className={`text-5xl lg:text-6xl font-bold text-center mb-8 text-black transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Join the Innovation Movement Today!
        </h2>

        {/* Description */}
        <p
          className={`text-center text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Whether you're a graduating RCA student ready to showcase your
          projects and attract the support needed to turn your ideas into
          reality, or a global donor searching for exciting opportunities to
          fund innovative solutions, this platform is your bridge to creating
          real-world impact, fostering innovation, and building the next
          generation of African tech leaders.
        </p>

        {/* CTA Button */}
        <div
          className={`flex justify-center mt-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <button className="group relative px-8 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>

            <div className="relative flex items-center gap-3">
              <span>Get Started</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
