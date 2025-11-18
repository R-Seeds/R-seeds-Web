"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Empower RCA Graduates",
    description:
      "The platform gives graduates a place to showcase their tech solutions, gain visibility, and attract support for real-world impact.",
    number: "01",
    wrapperStyle: { bottom: "6%", left: "6%", width: "40%" },
    align: "left" as const,
  },
  {
    title: "Connect with Global Donors",
    description:
      "Link RCA innovators with individuals and organizations around the world who are ready to fund and follow their progress.",
    number: "02",
    wrapperStyle: { top: "42%", left: "32%", width: "42%" },
    align: "left" as const,
  },
  {
    title: "Promote Transparency & Impact",
    description:
      "Every project is verified by RCA, ensuring that funding is secure, transparent, and used to drive genuine innovation.",
    number: "03",
    wrapperStyle: { top: "4%", right: "2%", width: "45%" },
    align: "right" as const,
  },
];

export default function WhatWeOffer() {
  return (
    <section className="relative overflow-hidden bg-[#0F352B] py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F352B] to-[#07211b]" />
      <div className="relative z-10 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        >
          <div className="absolute -left-8 top-20 h-2/3 w-8 rounded-full bg-gradient-to-b from-[#00C896] to-transparent opacity-30" />
          <p className="text-sm uppercase tracking-[0.4em] text-white/50 mb-6">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            A transparent bridge between innovators and supporters.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            The platform was created to empower Rwanda Coding Academy (RCA)
            graduates with a space to share their innovations, connect with
            global donors, and bring ideas to life. It nurtures a community that
            believes in Africa&apos;s rapidly growing tech potential.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/40 bg-white text-[#0F352B] px-8 py-3 font-semibold shadow-lg"
          >
            Get Started
            <span className="text-lg">→</span>
          </motion.button>
        </motion.div>

        <div className="relative h-[460px] w-full">
          <div className="absolute inset-0 rounded-[40px] border border-white/5 bg-[#0B2C23]/60 blur-3xl pointer-events-none" />
          <motion.svg
            viewBox="0 0 600 400"
            className="absolute inset-0 h-full w-full"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <path
              d="M20 320 C160 160 280 320 420 200 C480 140 520 90 580 120"
              stroke="#00C896"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="drop-shadow-[0_0_10px_#00C896]"
            />
          </motion.svg>

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              style={feature.wrapperStyle}
              className={`absolute flex items-start gap-4 ${
                feature.align === "right"
                  ? "flex-row-reverse text-right"
                  : "text-left"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.2 + index * 0.2,
                  type: "spring",
                  stiffness: 240,
                }}
                viewport={{ once: true }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xl"
              >
                <span className="text-sm font-semibold text-[#0F352B]">
                  {feature.number}
                </span>
              </motion.div>

              <div className="max-w-xs text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
                  Step {index + 1}
                </p>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mt-2">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
