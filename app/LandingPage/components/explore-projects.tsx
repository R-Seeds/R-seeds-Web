"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "The SkyScout",
    description:
      "A wearable health device that monitors body conditions like temperature, hydration, and immunity",
    creator: "Mustapha Abdul Kalim",
    status: "Completed",
    goal: "$200",
    image: "/skyscout.jpg",
  },
  {
    id: 2,
    title: "Smart Irrigation System",
    description:
      "IoT-based irrigation that optimizes water usage for sustainable farming across Africa",
    creator: "Amina Okafor",
    status: "In Progress",
    goal: "$500",
    image: "/farm.jpg",
  },
  // {
  //   id: 3,
  //   title: "AI Medical Diagnostic",
  //   description:
  //     "Machine learning model for early disease detection in remote healthcare settings",
  //   creator: "Hassan Yousuf",
  //   status: "Completed",
  //   goal: "$750",
  //   image: "/placeholder.jpg",
  // },
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
    <section ref={sectionRef} className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16 text-black animate-fade-in-up">
          Explore Projects
        </h2>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center transition-all duration-700 ${
                visibleProjects.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Project Image with curved borders */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 blur-2xl animate-pulse"></div>
                  <div className="relative overflow-hidden rounded-l-3xl border-2 border-transparent hover:border-green-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/20 group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={400}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div
                className="lg:w-1/2 space-y-6 animate-slide-in-right"
                style={{ transitionDelay: `${index * 150 + 100}ms` }}
              >
                <h3 className="text-4xl font-bold text-black">
                  {project.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold">
                      👤
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created By</p>
                      <p className="font-semibold text-black">
                        {project.creator}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-semibold text-black">
                        {project.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white">
                      💰
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Goal</p>
                      <p className="font-semibold text-black">{project.goal}</p>
                    </div>
                  </div>
                </div>

                <button className="mt-8 px-6 py-2 bg-black text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 group inline-flex items-center gap-2">
                  View Project
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
