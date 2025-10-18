"use client";
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SmartHomeNexusPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    { src: "/hands.jpg", alt: "Mobile App" },
    { src: "/joker.jpg", alt: "Creative" },
    { src: "/blues.jpg", alt: "Modern Tech" },
    { src: "/agribot.jpg", alt: "Agriculture" },
    { src: "/glass.jpg", alt: "Glass Tech" },
    { src: "/culinary.jpg", alt: "Culinary" },
    { src: "/food.jpg", alt: "Food Tech" },
    { src: "/ascent.jpg", alt: "Ascent" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div>
      <Header />
      <Sidebar />
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="relative min-h-screen flex items-center justify-center py-12">
          {/* Blurred Background Cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Left Cards */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 transform -rotate-12 z-0">
              <div className="h-[500px] w-64 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl overflow-hidden transition-all duration-1000">
                <Image 
                  src={backgroundImages[(currentImageIndex) % backgroundImages.length].src} 
                  alt={backgroundImages[(currentImageIndex) % backgroundImages.length].alt} 
                  fill 
                  className="rounded-2xl object-cover" 
                />
              </div>
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 transform -rotate-6 z-0">
              <div className="h-[500px] w-64 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl overflow-hidden transition-all duration-1000">
                <Image 
                  src={backgroundImages[(currentImageIndex + 1) % backgroundImages.length].src} 
                  alt={backgroundImages[(currentImageIndex + 1) % backgroundImages.length].alt} 
                  fill 
                  className="rounded-2xl object-cover" 
                />
              </div>
            </div>
            
            {/* Right Cards */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 transform rotate-6 z-0">
              <div className="h-[500px] w-64 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl overflow-hidden transition-all duration-1000">
                <Image 
                  src={backgroundImages[(currentImageIndex + 2) % backgroundImages.length].src} 
                  alt={backgroundImages[(currentImageIndex + 2) % backgroundImages.length].alt} 
                  fill 
                  className="rounded-2xl object-cover" 
                />
              </div>
            </div>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 transform rotate-12 z-0">
              <div className="h-[500px] w-64 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl overflow-hidden transition-all duration-1000">
                <Image 
                  src={backgroundImages[(currentImageIndex + 3) % backgroundImages.length].src} 
                  alt={backgroundImages[(currentImageIndex + 3) % backgroundImages.length].alt} 
                  fill 
                  className="rounded-2xl object-cover" 
                />
              </div>
            </div>
          </div>

          {/* Main SmartHome Nexus Card */}
          <div className="relative z-10 mx-auto w-[500px] rounded-3xl bg-white shadow-2xl overflow-hidden">
            {/* Illustration Section */}
            <div className="relative h-[500px]">
              <Image src="/home.jpg" alt="Smart Home System Illustration" fill className="object-cover" />
            </div>

            {/* Text and Button Section */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-3">SmartHome Nexus</h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                A centralized system that automates and controls home lighting, temperature, and security from one smart panel.
              </p>
              <div className="flex items-center justify-between">
                <Link href="#" className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-white font-medium hover:bg-brand/90 transition-colors shadow-lg">
                  <span>View Project</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight size={14} />
                  </div>
                </Link>
                <div className="relative h-16 w-16 rounded-full border-4 border-white shadow-lg">
                  <Image src="/ascent.jpg" alt="Thumbnail" fill className="rounded-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
