"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  creator: string;
  status: string;
  goal: string;
  image: string;
};

const projects: Project[] = [
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
];

const projectInfoItems: {
  label: string;
  valueKey: keyof Pick<Project, "creator" | "status" | "goal">;
  icon: string;
  alt: string;
}[] = [
  {
    label: "Created By",
    valueKey: "creator",
    icon: "/user.png",
    alt: "User male",
  },
  {
    label: "Status",
    valueKey: "status",
    icon: "/tick.png",
    alt: "Status icon",
  },
  { label: "Goal", valueKey: "goal", icon: "/coins.png", alt: "Goal icon" },
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
    <section
      id="explore-projects"
      ref={sectionRef}
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-[#1976D20A]"
      style={{ backgroundColor: "#1976D20A" }}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 max-w-[1920px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-black animate-fade-in-up text-balance" style={{ fontSize: 'clamp(24px, 5vw, 64px)' }}>
          Explore Projects
        </h2>

        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 xl:space-y-28">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center lg:items-start transition-all duration-700 ${
                visibleProjects.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="lg:w-3/5 flex justify-center w-full">
                <div className="relative w-full max-w-4xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-tl-[clamp(2rem,4vw,4rem)] blur-2xl animate-pulse"></div>
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-none lg:rounded-tl-[clamp(2rem,4vw,4rem)] border-2 border-transparent hover:border-green-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/20 group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-[clamp(200px,40vh,450px)] sm:h-[clamp(250px,45vh,500px)] md:h-[clamp(300px,50vh,550px)] lg:h-[clamp(350px,55vh,600px)] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <div
                className="lg:w-2/5 space-y-4 sm:space-y-5 md:space-y-6 animate-slide-in-right text-center lg:text-left"
                style={{ transitionDelay: `${index * 150 + 100}ms` }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black text-balance" style={{ fontSize: 'clamp(22px, 4vw, 56px)' }}>
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed" style={{ fontSize: 'clamp(14px, 2vw, 22px)' }}>
                  {project.description}
                </p>

                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                  {projectInfoItems.map(({ label, valueKey, icon, alt }) => (
                    <div
                      key={`${project.id}-${valueKey}`}
                      className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-[#154035] border-[#154035] flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                          src={icon}
                          alt={alt}
                          width={64}
                          height={64}
                          className="w-[clamp(20px,3vw,32px)] h-[clamp(20px,3vw,32px)] object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm md:text-base text-gray-500" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)' }}>{label}</p>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-black" style={{ fontSize: 'clamp(14px, 2vw, 22px)' }}>
                          {project[valueKey]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-4 sm:mt-6 md:mt-8 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-[#154035] font-semibold rounded-full transition-all duration-300 transform hover:scale-105 group inline-flex items-center gap-2 mx-auto lg:mx-0" style={{ fontSize: 'clamp(14px, 2vw, 20px)' }}>
                  View Project
                  <Image
                    src="/arrow2.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="w-[clamp(14px,2vw,20px)] h-[clamp(14px,2vw,20px)] group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
