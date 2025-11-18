import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [activeNav, setActiveNav] = useState('Home');
  const [reviewCount, setReviewCount] = useState(0);

  // Counter animation for reviews
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = 10000 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 10000) {
        setReviewCount(10000);
        clearInterval(timer);
      } else {
        setReviewCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const navItems = ['Home', 'Our App', 'Services', 'Explore Projects'];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br bg-white overflow-hidden">
      {/* Animated Background Circles - Full Page */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-teal-200 rounded-full opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-emerald-200 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-cyan-200 rounded-full opacity-25 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Stars */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float z-10 hidden md:block"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i % 3)}s`
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-4 h-4 md:w-5 md:h-5">
            <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="#00C896" opacity="0.6"/>
          </svg>
        </div>
      ))}

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-6 animate-fadeInDown">
        <div className="flex items-center gap-1">
          <span className="text-2xl md:text-[32px] font-normal text-[#00C896]" style={{ fontFamily: 'Akronim, cursive' }}>
            R
          </span>
          <span className="text-sm md:text-[16px] font-semibold text-[#00C896]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            - seeds
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 ${
                activeNav === item
                  ? 'bg-[#154035] text-white font-bold'
                  : 'text-[#111111] font-medium hover:bg-gray-200'
              }`}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                lineHeight: '22px'
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            className="px-3 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-lg border border-black bg-white text-black transition-transform hover:scale-105"
            style={{
              fontFamily: 'Afacad, sans-serif',
              fontSize: '16px',
              lineHeight: '30px'
            }}
          >
            Login
          </button>
          <button
            className="px-3 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-lg border border-white bg-[#154035] text-white transition-transform hover:scale-105"
            style={{
              fontFamily: 'Afacad, sans-serif',
              fontSize: '16px',
              lineHeight: '30px'
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-30 flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-6 md:py-8 lg:py-12 gap-8 lg:gap-0 max-w-[2000px] mx-auto w-full">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 relative animate-fadeInLeft order-2 lg:order-1">
          <div className="relative max-w-[500px] mx-auto lg:mx-0">
            {/* Background decorative circles - BEHIND the image */}
            <div className="absolute -top-10 -left-10 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-emerald-300 to-teal-200 rounded-full opacity-40 animate-pulse-slow z-0"></div>
            <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] bg-gradient-to-br from-cyan-200 to-emerald-100 rounded-full opacity-30 animate-pulse-slow animation-delay-1000 z-0"></div>
            
            {/* Woman image - ABOVE the decorative circles */}
            <div className="relative z-20">
              <Image 
                src="/women.png" 
                alt="woman" 
                width={800} 
                height={900} 
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Floating decorative stars around image */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute animate-float-around z-10 hidden sm:block"
                style={{
                  left: `${-5 + i * 20}%`,
                  top: `${10 + (i % 4) * 20}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${4 + (i % 2)}s`
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-3 h-3 sm:w-4 sm:h-4">
                  <path d="M8 0L9.6 6.4L16 8L9.6 9.6L8 16L6.4 9.6L0 8L6.4 6.4L8 0Z" fill="#00C896"/>
                </svg>
              </div>
            ))}
          </div>

          {/* Review Counter */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-xl px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center gap-2 sm:gap-3 md:gap-4 animate-fadeInUp animation-delay-1000 z-30">
            <div className="flex -space-x-2">
              {['diana.png', 'women.png', 'glass.jpg', 'girl.jpg'].map((avatar, i) => (
                <div
                  key={i}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-teal-400 to-emerald-500"
                >
                  <Image 
                    src={`/${avatar}`} 
                    alt={`Reviewer ${i + 1}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#154035]">
                {reviewCount.toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Reviews</div>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 lg:pl-8 xl:pl-16 space-y-4 md:space-y-6 lg:space-y-8 order-1 lg:order-2">
          <h1
            className="text-[#000000] animate-fadeInRight text-center lg:text-left"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(28px, 4vw, 35px)',
              fontWeight: 700,
              lineHeight: '1.4'
            }}
          >
            <span className="inline-block animate-slideInUp">Empowering</span>{' '}
            <span className="inline-block animate-slideInUp animation-delay-200">Innovation,</span>
            <br />
            <span className="inline-block animate-slideInUp animation-delay-400">Connecting</span>{' '}
            <span className="inline-block animate-slideInUp animation-delay-600">Opportunities.</span>
          </h1>

          <p
            className="text-[#000000] max-w-xl mx-auto lg:mx-0 animate-fadeInRight animation-delay-800 text-center lg:text-left"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(16px, 2vw, 18px)',
              fontWeight: 400,
              lineHeight: '1.8'
            }}
          >
            A secure, transparent platform connecting RCA graduates with global
            donors to showcase their innovations and drive Africa's tech growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-4 md:gap-6 animate-fadeInUp animation-delay-1000">
            {/* Show case your project button */}
            <button className="group relative bg-[#154035] rounded-[30px] p-[4px] transition-transform hover:scale-105 hover:shadow-xl w-full sm:w-auto">
              <div className="relative bg-[#154035] rounded-[25.4px] border border-white px-4 sm:px-6 md:px-8 py-2.5 md:py-3 flex items-center justify-center gap-2 md:gap-3">
                <span
                  className="text-white whitespace-nowrap text-sm sm:text-base md:text-lg"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    lineHeight: '30px'
                  }}
                >
                  Show case your project
                </span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Discover & Fund Projects button */}
            <button className="group relative bg-[#DDF8F14D] rounded-[30px] px-4 sm:px-6 md:px-8 py-2.5 md:py-3 flex items-center justify-center gap-2 md:gap-3 transition-transform hover:scale-105 hover:shadow-lg w-full sm:w-auto">
              <span
                className="text-[#000000] whitespace-nowrap text-sm sm:text-base md:text-lg"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: '30px'
                }}
              >
                Discover & Fund Projects
              </span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-[#154035] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(30px, 10px) scale(1.05); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-around {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(90deg); }
          50% { transform: translate(-10px, -10px) rotate(180deg); }
          75% { transform: translate(15px, 5px) rotate(270deg); }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-around {
          animation: float-around 5s ease-in-out infinite;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;