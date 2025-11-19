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
      className="w-full py-16 sm:py-20 bg-[#1976D20A]"
      style={{ backgroundColor: "#1976D20A" }}
    >
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-16 text-black animate-fade-in-up text-balance">
          Explore Projects
        </h2>

        <div className="space-y-16 lg:space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-12 items-center lg:items-start transition-all duration-700 ${
                visibleProjects.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="lg:w-3/5 flex justify-center w-full">
                <div className="relative w-full max-w-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-tl-[4rem] blur-2xl animate-pulse"></div>
                  <div className="relative overflow-hidden rounded-3xl lg:rounded-none lg:rounded-tl-[4rem] border-2 border-transparent hover:border-green-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/20 group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={300}
                      height={100}
                      className="w-full h-64 sm:h-80 lg:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <div
                className="lg:w-2/5 space-y-5 animate-slide-in-right text-center lg:text-left"
                style={{ transitionDelay: `${index * 150 + 100}ms` }}
              >
                <h3 className="text-3xl sm:text-4xl font-bold text-black text-balance">
                  {project.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4 pt-4">
                  {projectInfoItems.map(({ label, valueKey, icon, alt }) => (
                    <div
                      key={`${project.id}-${valueKey}`}
                      className="flex items-center gap-3 justify-center lg:justify-start"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#154035] border-[#154035] flex items-center justify-center overflow-hidden">
                        <Image
                          src={icon}
                          alt={alt}
                          width={40}
                          height={40}
                          className="w-8 h-8 object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{label}</p>
                        <p className="text-base sm:text-lg font-semibold text-black">
                          {project[valueKey]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-6 sm:mt-8 px-6 py-3  text-[#154035] text-base sm:text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 group inline-flex items-center gap-2 mx-auto lg:mx-0">
                  View Project
                  {/* <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span> */}
                  <Image
                    src="/arrow2.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="group-hover:translate-x-1 transition-transform"
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
