import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CTASection = () => {
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
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden max-w-[1920px] mx-auto"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Animated spinning circles at top right - partially visible */}
      <div className="absolute -top-[clamp(100px,15vw,144px)] -right-[clamp(100px,15vw,176px)] w-[clamp(200px,30vw,384px)] h-[clamp(200px,30vw,384px)] pointer-events-none">
        {/* Outer circle animation */}
        <svg
          className="absolute animate-spin"
          style={{
            animationDuration: "20s",
            animationDirection: "reverse",
          }}
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#154035"
            strokeWidth="clamp(15,2vw,30)"
            opacity="0.8"
          />
        </svg>

        {/* Middle circle animation */}
        <svg
          className="absolute animate-spin"
          style={{
            animationDuration: "15s",
            top: "8%",
            left: "8%",
            width: "83%",
            height: "83%",
          }}
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="#154035"
            strokeWidth="clamp(12,1.8vw,25)"
            opacity="0.9"
          />
        </svg>

        {/* Inner circle animation */}
        <svg
          className="absolute animate-spin"
          style={{
            animationDuration: "12s",
            top: "16%",
            left: "16%",
            width: "67%",
            height: "67%",
          }}
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="#154035"
            strokeWidth="clamp(10,1.5vw,20)"
            opacity="0.85"
          />
        </svg>

        {/* White center dot */}
        <div
          className="absolute rounded-full bg-white"
          style={{
            width: "clamp(12px,1.5vw,24px)",
            height: "clamp(12px,1.5vw,24px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        />

        {/* Light accent bar */}
        <div
          className="absolute w-[clamp(16px,2vw,32px)] h-[clamp(80px,10vw,160px)] bg-[#b8e6d5] rounded-full blur-sm opacity-70"
          style={{ top: "12%", right: "0" }}
        />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 relative z-10">
        {/* Heading with word animation */}
        <h2
          className={`text-center mb-5 sm:mb-6 md:mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } text-balance mx-auto max-w-5xl`}
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 5vw, 56px)",
            lineHeight: "1.3",
            letterSpacing: "0px",
            color: "#154035",
          }}
        >
          {isVisible && (
            <>
              <span className="inline-block animate-word-bounce">Join</span>{" "}
              <span className="inline-block animate-word-bounce animation-delay-100">
                the
              </span>{" "}
              <span className="inline-block animate-word-bounce animation-delay-200">
                Innovation
              </span>{" "}
              <span className="inline-block animate-word-bounce animation-delay-300">
                Movement
              </span>{" "}
              <span className="inline-block animate-word-bounce animation-delay-400">
                Today!
              </span>
            </>
          )}
        </h2>

        {/* Description */}
        <p
          className={`text-center max-w-5xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } text-balance`}
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 2.5vw, 22px)",
            lineHeight: "1.8",
            letterSpacing: "0px",
            color: "#000000",
          }}
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
          className={`flex justify-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Link
            href="/signup"
            className="group relative flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            style={{
              height: "clamp(44px, 6vw, 60px)",
              borderRadius: "clamp(20px, 3vw, 30px)",
              backgroundColor: "#154035",
            }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer"></div>

            {/* Inner border */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: "calc(100% - 12px)",
                height: "calc(100% - 12px)",
                borderRadius: "clamp(16px, 2.5vw, 25.4px)",
                border: "0.5px solid #FFFFFF",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative flex items-center gap-2 sm:gap-2.5 md:gap-3 px-2 sm:px-3">
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 2vw, 20px)",
                    lineHeight: "1.5",
                    letterSpacing: "0px",
                    color: "#FFFFFF",
                  }}
                >
                  Get Started
                </span>
                <Image
                  src="/arrow.png"
                  alt="Arrow"
                  width={20}
                  height={20}
                  className="w-[clamp(14px,2vw,20px)] h-[clamp(14px,2vw,20px)] transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin linear infinite;
        }

        @keyframes word-bounce {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
          70% {
            transform: translateY(5px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-word-bounce {
          animation: word-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)
            forwards;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
};

export default CTASection;
