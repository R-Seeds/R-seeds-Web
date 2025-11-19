import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Apple } from 'lucide-react';

const AppSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="app-section"
      ref={sectionRef}
      className="relative w-full bg-gradient-to-br bg-gray-100 py-12 md:py-16 lg:py-24 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 md:w-64 md:h-64 bg-teal-200 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 md:w-80 md:h-80 bg-emerald-200 rounded-full opacity-15 animate-float-slow animation-delay-2000"></div>
      </div>

      {/* Floating Stars */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-twinkle hidden lg:block"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${2.5 + (i % 2)}s`
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.6 6.4L16 8L9.6 9.6L8 16L6.4 9.6L0 8L6.4 6.4L8 0Z" fill="#00C896" opacity="0.5"/>
          </svg>
        </div>
      ))}

      <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Download Our App Title */}
        <div className={`text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-black"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className={`inline-block ${isVisible ? 'animate-word-fade' : ''}`}>Download</span>{' '}
            <span className={`inline-block ${isVisible ? 'animate-word-fade animation-delay-200' : ''}`}>Our</span>{' '}
            <span className={`inline-block ${isVisible ? 'animate-word-fade animation-delay-400' : ''}`}>App</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Side - Content */}
          <div className={`space-y-6 md:space-y-8 order-2 lg:order-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h3 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <span className={`inline-block ${isVisible ? 'animate-slide-up' : ''}`}>Your</span>{' '}
                <span className={`inline-block ${isVisible ? 'animate-slide-up animation-delay-100' : ''}`}>Gateway</span>{' '}
                <span className={`inline-block ${isVisible ? 'animate-slide-up animation-delay-200' : ''}`}>To</span>
              </h3>
              <h3 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <span className={`inline-block ${isVisible ? 'animate-slide-up animation-delay-300' : ''}`}>Tech</span>{' '}
                <span className={`inline-block ${isVisible ? 'animate-slide-up animation-delay-400' : ''}`}>Opportunities</span>
              </h3>
              
              {/* Decorative Line */}
              <div className={`w-24 md:w-32 h-2 bg-[#00C896] mb-6 rounded-full ${isVisible ? 'animate-expand-width' : 'w-0'}`}></div>
            </div>

            <h4 
              className="text-xl md:text-2xl font-semibold text-black"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Stay Connected anywhere, anytime
            </h4>

            <p 
              className="text-base md:text-lg text-gray-700 leading-relaxed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Discover groundbreaking projects from RCA graduates, follow their journeys from idea to impact, track real-time funding progress, and contribute directly to the next generation of African innovators — all from the convenience of your mobile device.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* App Store Button */}
              <a 
                href="#" 
                className="group relative inline-flex items-center gap-3 bg-[#1a4d3e] hover:bg-[#154035] text-white px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  {/* <Apple className="w-8 h-8" fill="white" /> */}
                  <Image src="/apple.png" alt="Apple" width={100} height={100} />
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Download on the
                  </div>
                  <div className="text-lg font-semibold -mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    App Store
                  </div>
                </div>
              </a>

              {/* Google Play Button */}
              <a 
                href="#" 
                className="group relative inline-flex items-center gap-3 bg-[#1a4d3e] hover:bg-[#154035] text-white px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 3.85L17.35 17.7L3.5 31.55C2.95 31.1 2.6 30.4 2.6 29.6V5.8C2.6 5 2.95 4.3 3.5 3.85Z" fill="white"/>
                    <path d="M22.7 12.35L18.8 16.25L5.5 2.95C5.9 2.65 6.4 2.5 6.9 2.5C7.5 2.5 8.05 2.7 8.5 3.05L22.7 12.35Z" fill="white"/>
                    <path d="M22.7 22.05L8.5 31.35C8.05 31.7 7.5 31.9 6.9 31.9C6.4 31.9 5.9 31.75 5.5 31.45L18.8 18.15L22.7 22.05Z" fill="white"/>
                    <path d="M29.1 15.2L24.15 12.35L19.85 16.65L24.15 20.95L29.1 18.1C29.8 17.7 30.3 16.95 30.3 16.15C30.3 15.35 29.8 14.6 29.1 15.2Z" fill="white"/>
                  </svg> */}
                  <Image src="/play.png" alt="Google" width={100} height={100} />
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    GET IT ON
                  </div>
                  <div className="text-lg font-semibold -mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side - Phone Images */}
          <div className={`relative order-1 lg:order-2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative max-w-[600px] mx-auto lg:ml-auto lg:mr-0">
              {/* Animated circles behind phones */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-teal-300 to-emerald-200 rounded-full opacity-30 animate-pulse-slow -z-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] bg-gradient-to-br from-cyan-200 to-teal-100 rounded-full opacity-25 animate-pulse-slow animation-delay-1000 -z-10"></div>
              
              {/* Phone Image with floating animation */}
              <div className="relative animate-float-gentle">
                <Image 
                  src="/Phones.png" 
                  alt="R-seeds mobile app" 
                  width={700} 
                  height={700}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Decorative floating elements */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={`phone-star-${i}`}
                  className="absolute animate-float-around-phone hidden md:block"
                  style={{
                    left: `${10 + i * 25}%`,
                    top: `${15 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.6}s`,
                    animationDuration: `${4 + (i % 2)}s`
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="#00C896" opacity="0.7"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }

        @keyframes float-around-phone {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
          25% { transform: translate(8px, -12px) rotate(90deg); opacity: 1; }
          50% { transform: translate(-8px, -8px) rotate(180deg); opacity: 0.7; }
          75% { transform: translate(12px, 4px) rotate(270deg); opacity: 1; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes word-fade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand-width {
          from {
            width: 0;
          }
          to {
            width: 8rem;
          }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.25; }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 5s ease-in-out infinite;
        }

        .animate-float-around-phone {
          animation: float-around-phone 5s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .animate-word-fade {
          animation: word-fade 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-expand-width {
          animation: expand-width 1s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
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

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @media (min-width: 640px) {
          @keyframes expand-width {
            from {
              width: 0;
            }
            to {
              width: 10rem;
            }
          }
        }
      `}</style>
    </section>
  );
};

export default AppSection;