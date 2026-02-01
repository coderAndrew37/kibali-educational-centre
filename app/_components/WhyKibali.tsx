// components/WhyKibali.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function WhyKibali() {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const features = [
    {
      title: "Holistic CBC Integration",
      desc: "We go beyond textbooks, focusing on competency-based learning that identifies and nurtures every child's unique talent.",
      icon: "📚",
      gradient: "from-emerald-400 to-teal-600",
      bgColor: "bg-emerald-50/10",
      stats: [
        "98% Parent Satisfaction",
        "Personalized Learning Paths",
        "60+ Competencies",
      ],
    },
    {
      title: "Digital-First Campus",
      desc: "Our students are tech-savvy from a young age, utilizing modern labs and digital tools to prepare for a tech-driven world.",
      icon: "💻",
      gradient: "from-blue-400 to-indigo-600",
      bgColor: "bg-blue-50/10",
      stats: ["1:1 Tech Ratio", "AI Learning Labs", "Coding from Grade 1"],
    },
    {
      title: "Values-Based Education",
      desc: "Character is as important as grades. We instill discipline, integrity, and social responsibility in all our learners.",
      icon: "🌟",
      gradient: "from-amber-400 to-orange-600",
      bgColor: "bg-amber-50/10",
      stats: [
        "Character Report Cards",
        "Community Service Hours",
        "Leadership Programs",
      ],
    },
  ];

  // Auto-rotate features
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isInView, features.length]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-200/20 to-teal-300/20 blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-200/20 to-indigo-300/20 blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              className="flex items-center gap-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-2xl">✦</span>
            </motion.div>
            <span className="text-accent font-black uppercase tracking-[0.3em] text-sm">
              The Kibali Difference
            </span>
            <motion.div
              className="flex items-center gap-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-2xl">✦</span>
            </motion.div>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-primary-dark mb-6">
            Why <span className="text-accent">Kibali</span> Stands Out
          </h2>

          <p className="text-xl text-primary-dark/70 max-w-3xl mx-auto leading-relaxed">
            Where traditional education meets innovative pedagogy, creating
            <span className="font-semibold text-accent">
              {" "}
              future-ready learners
            </span>{" "}
            through a balanced approach to academic excellence and character
            development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Feature Cards */}
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setActiveFeature(index)}
              onFocus={() => setActiveFeature(index)}
              className={`relative group cursor-pointer ${
                activeFeature === index ? "lg:scale-105" : "lg:scale-95"
              } transition-all duration-500`}
            >
              {/* Animated Border */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} p-[2px]`}
                animate={{
                  opacity: activeFeature === index ? 1 : 0.3,
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
              </motion.div>

              {/* Card Content */}
              <div
                className={`relative ${feature.bgColor} backdrop-blur-sm rounded-3xl p-8 h-full border border-white/10`}
              >
                {/* Icon */}
                <motion.div
                  animate={
                    activeFeature === index ? { rotate: [0, 10, -10, 0] } : {}
                  }
                  transition={{ duration: 0.5 }}
                  className={`text-5xl mb-8 w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                >
                  <div className="text-3xl">{feature.icon}</div>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-primary-dark mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-primary-dark/80 leading-relaxed mb-8">
                  {feature.desc}
                </p>

                {/* Stats */}
                <div className="space-y-3">
                  {feature.stats.map((stat, i) => (
                    <motion.div
                      key={stat}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        activeFeature === index ? { opacity: 1, x: 0 } : {}
                      }
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}
                      />
                      <span className="text-primary-dark/70">{stat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Indicator */}
                <motion.div
                  className={`absolute -bottom-2 left-1/2 w-24 h-1 rounded-full bg-gradient-to-r ${feature.gradient} -translate-x-1/2`}
                  animate={{
                    width: activeFeature === index ? "80px" : "40px",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mt-16">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveFeature(index);
                }
              }}
              className="group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-full"
              aria-label={`View feature ${index + 1}`}
            >
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  activeFeature === index
                    ? "bg-gradient-to-r from-accent to-accent-dark"
                    : "bg-primary-dark/30"
                }`}
                animate={{
                  scale: activeFeature === index ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <div className="sr-only">Feature {index + 1}</div>
            </button>
          ))}
        </div>

        {/* Animated Decorative Elements */}
        <motion.div
          className="absolute -top-10 -right-10 text-8xl opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -left-10 text-8xl opacity-5"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>
      </div>

      {/* Accessibility Announcement */}
      <div className="sr-only" aria-live="polite">
        {`Currently viewing feature ${activeFeature + 1} of ${features.length}: ${features[activeFeature]?.title}`}
      </div>
    </section>
  );
}
