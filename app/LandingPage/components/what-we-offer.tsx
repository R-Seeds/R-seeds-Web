"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    title: "Promote Transparency & Impact",
    description:
      "Every project is verified by RCA, ensuring that funding is secure, transparent, and used to drive genuine innovation.",
  },
  {
    id: 2,
    title: "Connect with Global Donors",
    description:
      "It links RCA innovators with individuals and organizations around the world who are ready to fund and follow their progress.",
  },
  {
    id: 3,
    title: "Empower RCA Graduates",
    description:
      "The platform gives graduates a place to showcase their tech solutions, gain visibility, and attract support for real-world impact.",
  },
];

export default function WhatWeOffer() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedFeatures, setAnimatedFeatures] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger the feature animations
          features.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedFeatures((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full overflow-hidden px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20 lg:py-32"
      style={{ backgroundColor: "#154035" }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute left-10 top-10 w-64 h-64 rounded-full border-2 border-[#00C8964D] animate-pulse"
          style={{
            animation: "wavyCircle 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-20 bottom-20 w-96 h-96 rounded-full border-2 border-[#00C8964D] animate-pulse"
          style={{
            animation: "wavyCircle 10s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-72 h-72 rounded-full border-2 border-[#00C8964D]"
          style={{
            animation: "wavyCircle 12s ease-in-out infinite",
            animationDelay: "4s",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-start gap-16 lg:gap-0 lg:flex-row lg:items-stretch">
        {/* Left Content */}
        <div
          className={`flex flex-col justify-start gap-8 lg:w-1/2 transform transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              What We Offer
            </h2>
            <p className="text-lg leading-relaxed text-white text-opacity-90 max-w-md">
              This platform was created to empower Rwanda Coding Academy (RCA)
              graduates by giving them a space to share their innovative
              projects, connect with global donors, and bring their ideas to
              life. It serves as a transparent bridge between young innovators
              and supporters who believe in Africa's growing tech potential.
            </p>
          </div>

          <div
            className={`flex ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            } transition-all duration-700`}
            style={{ transitionDelay: "300ms" }}
          >
            <button
              className="group relative flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
              style={{
                width: "231px",
                height: "51px",
                borderRadius: "30px",
                backgroundColor: "#FFFFFF",
              }}
            >
              {/* Inner border */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  width: "220px",
                  height: "43px",
                  borderRadius: "25.4px",
                  border: "0.5px solid #154035",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative flex items-center gap-2">
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "30px",
                      letterSpacing: "0px",
                      color: "#154035",
                    }}
                  >
                    Get Started
                  </span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: "#154035" }}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Content - Features with Curved Line */}
        <div className="relative lg:w-1/2 lg:pl-8">
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
            preserveAspectRatio="none"
            style={{ minHeight: "600px" }}
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00C896" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00C896" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M 20 40 Q 150 100, 200 180 T 250 380"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="animate-movingLine"
              style={{
                filter: "drop-shadow(0 0 8px rgba(0, 200, 150, 0.3))",
              }}
            />

            <circle
              cx="20"
              cy="40"
              r="5"
              fill="#00C8964D"
              className="animate-dotFloat"
            />
            <circle
              cx="200"
              cy="180"
              r="5"
              fill="#00C8964D"
              className="animate-dotFloat"
              style={{ animationDelay: "1s" }}
            />
            <circle
              cx="250"
              cy="380"
              r="5"
              fill="#00C8964D"
              className="animate-dotFloat"
              style={{ animationDelay: "2s" }}
            />
          </svg>

          {/* Feature Cards */}
          <div className="relative space-y-12">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`flex gap-6 lg:gap-8 transform transition-all duration-700 ease-out ${
                  animatedFeatures[index]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                {/* Feature Pill */}
                <div className="relative flex-shrink-0 z-20">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-3xl bg-white shadow-lg" />
                </div>

                {/* Feature Content */}
                <div className="flex-1 pt-1 lg:pt-2">
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base lg:text-base leading-relaxed text-white text-opacity-80">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
