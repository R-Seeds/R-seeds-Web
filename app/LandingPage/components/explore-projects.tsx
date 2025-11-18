'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'The SkyScout',
    description: 'A wearable health device that monitors body conditions like temperature, hydration, and immunity',
    creator: 'Mustapha Abdul Kalim',
    status: 'Completed',
    goal: '$200',
    image: '/skyscout.jpg'
  },
  {
    id: 2,
    title: 'Smart Irrigation System',
    description: 'IoT-based irrigation that optimizes water usage for sustainable farming across Africa',
    creator: 'Amina Okafor',
    status: 'In Progress',
    goal: '$500',
    image: '/farm.jpg'
  },

];

export default function ExploreProjects() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleProjects(projects.map((_, i) => i));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20" style={{ backgroundColor: '#1976D20A' }}>
      <div className="max-w-full px-8 lg:px-16">
        <h2 className="text-5xl font-bold text-center mb-16 text-black animate-fade-in-up">
          Explore Projects
        </h2>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center lg:items-start transition-all duration-700 ${
                visibleProjects.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="lg:w-3/5 flex justify-center">
                <div className="relative w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-[4rem] blur-2xl animate-pulse"></div>
                  <div className="relative overflow-hidden rounded-[4rem] border-2 border-transparent hover:border-green-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/20 group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={300}
                      height={100}
                      className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/5 space-y-6 animate-slide-in-right" style={{ transitionDelay: `${index * 150 + 100}ms` }}>
                <h3 className="text-4xl font-bold text-black">{project.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{project.description}</p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#154035] flex items-center justify-center text-white font-bold text-lg">
                      👤
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created By</p>
                      <p className="font-semibold text-black">{project.creator}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#154035] flex items-center justify-center text-white text-lg">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-semibold text-black">{project.status}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#154035] flex items-center justify-center text-white text-lg">
                      💰
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Goal</p>
                      <p className="font-semibold text-black">{project.goal}</p>
                    </div>
                  </div>
                </div>

                <button className="mt-8 px-6 py-2 bg-black text-white font-semibold rounded-full hover:bg-[#154035] transition-all duration-300 transform hover:scale-105 group inline-flex items-center gap-2">
                  View Project
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
