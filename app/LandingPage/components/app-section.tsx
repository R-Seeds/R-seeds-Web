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
      className="relative w-full bg-gradient-to-br bg-gray-100 py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-[clamp(100px,15vw,160px)] h-[clamp(100px,15vw,160px)] md:w-[clamp(150px,20vw,256px)] md:h-[clamp(150px,20vw,256px)] lg:w-[clamp(200px,25vw,320px)] lg:h-[clamp(200px,25vw,320px)] bg-teal-200 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-20 left-10 w-[clamp(120px,18vw,192px)] h-[clamp(120px,18vw,192px)] md:w-[clamp(180px,23vw,320px)] md:h-[clamp(180px,23vw,320px)] lg:w-[clamp(240px,28vw,400px)] lg:h-[clamp(240px,28vw,400px)] bg-emerald-200 rounded-full opacity-15 animate-float-slow animation-delay-2000"></div>
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

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 max-w-[1920px] mx-auto">
        {/* Download Our App Title */}
        <div className={`text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 
            className="font-bold text-black leading-tight text-balance mx-auto max-w-4xl"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px, 5vw, 56px)' }}
          >
            <span className={`inline-block ${isVisible ? 'animate-word-fade' : ''}`}>Download</span>{' '}
            <span className={`inline-block ${isVisible ? 'animate-word-fade animation-delay-200' : ''}`}>Our</span>{' '}
            <span className={`inline-block ${isVisible ? 'animate-word-fade animation-delay-400' : ''}`}>App</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
          {/* Left Side - Content */}
          <div className={`space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10 order-2 lg:order-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h3 
                className="font-bold text-black mb-3 sm:mb-4 leading-tight text-balance"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(22px, 4.5vw, 56px)' }}
              >
                <span className={`inline-block ${isVisible ? 'animate-slide-up' : ''}`}>Your</span>{' '}
                <span className={`inline-block ${isVisible ? 'animate-slide-up animation-delay-100' : ''}`}>Gateway</span>{' '}
                <span className={`inline-block ${isVisible ? 'animate-slide-up animation-delay-200' : ''}`}>To</span>
              </h3>
              <h3 
                className="font-bold text-black mb-4 sm:mb-6 leading-tight text-balance"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(22px, 4.5vw, 56px)' }}
              >
                <span className={`inline-block ${isVisible ? 'animate-slide-up animation-delay-300' : ''}`}>Tech</span>{' '}
                <span className={`inline-block ${isVisible ? 'animate-slide-up animation-delay-400' : ''}`}>Opportunities</span>
              </h3>
              
              {/* Decorative Line */}
              <div className={`w-20 sm:w-24 md:w-32 lg:w-40 xl:w-48 h-1.5 sm:h-2 bg-[#00C896] mb-4 sm:mb-6 rounded-full ${isVisible ? 'animate-expand-width' : 'w-0'}`}></div>
            </div>

            <h4 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-black"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Stay Connected anywhere, anytime
            </h4>

            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed text-balance"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(14px, 2vw, 22px)' }}
            >
              Discover groundbreaking projects from RCA graduates, follow their journeys from idea to impact, track real-time funding progress, and contribute directly to the next generation of African innovators — all from the convenience of your mobile device.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 pt-4">
              {/* App Store Button */}
              <a 
                href="#" 
                className="group relative inline-flex items-center gap-2 sm:gap-3 md:gap-4 bg-[#1a4d3e] hover:bg-[#154035] text-white px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0">
                  <Image src="/apple.png" alt="Apple" width={64} height={64} className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] xs:text-xs sm:text-sm opacity-90" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(10px, 1.2vw, 14px)' }}>
                    Download on the
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold -mt-0.5 sm:-mt-1" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(14px, 1.8vw, 20px)' }}>
                    App Store
                  </div>
                </div>
              </a>

              {/* Google Play Button */}
              <a 
                href="#" 
                className="group relative inline-flex items-center gap-2 sm:gap-3 md:gap-4 bg-[#1a4d3e] hover:bg-[#154035] text-white px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0">
                  <Image src="/play.png" alt="Google" width={64} height={64} className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] xs:text-xs sm:text-sm opacity-90" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(10px, 1.2vw, 14px)' }}>
                    GET IT ON
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold -mt-0.5 sm:-mt-1" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(14px, 1.8vw, 20px)' }}>
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side - Phone Images */}
          <div className={`relative order-1 lg:order-2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative max-w-[clamp(280px,50vw,700px)] mx-auto lg:ml-auto lg:mr-0 px-4 sm:px-0">
              {/* Animated circles behind phones */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[clamp(250px,40vw,400px)] h-[clamp(250px,40vw,400px)] md:w-[clamp(350px,45vw,500px)] md:h-[clamp(350px,45vw,500px)] lg:w-[clamp(450px,50vw,600px)] lg:h-[clamp(450px,50vw,600px)] bg-gradient-to-br from-teal-300 to-emerald-200 rounded-full opacity-30 animate-pulse-slow -z-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[clamp(220px,35vw,350px)] h-[clamp(220px,35vw,350px)] md:w-[clamp(300px,40vw,450px)] md:h-[clamp(300px,40vw,450px)] lg:w-[clamp(400px,45vw,550px)] lg:h-[clamp(400px,45vw,550px)] bg-gradient-to-br from-cyan-200 to-teal-100 rounded-full opacity-25 animate-pulse-slow animation-delay-1000 -z-10"></div>
              
              {/* Phone Image with floating animation */}
              <div className="relative animate-float-gentle">
                <Image 
                  src="/Phones.png" 
                  alt="R-seeds mobile app" 
                  width={700} 
                  height={700}
                  className="w-full h-auto mx-auto"
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