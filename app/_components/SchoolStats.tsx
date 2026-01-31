"use client";

import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
  Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function SchoolStats() {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const stats = [
    {
      label: "Transition Rate",
      value: "100%",
      description: "Students successfully transition to higher education",
      icon: "🎯",
      color: "from-green-400 to-emerald-600",
    },
    {
      label: "Student-Teacher Ratio",
      value: "15:1",
      description: "Personalized attention for every student",
      icon: "👨‍🏫",
      color: "from-blue-400 to-cyan-600",
    },
    {
      label: "Extra-Curriculars",
      value: "25+",
      description: "Clubs, sports, and creative activities",
      icon: "⚽",
      color: "from-orange-400 to-red-600",
    },
    {
      label: "Years of Excellence",
      value: "2010",
      description: "Founded with a vision for holistic education",
      icon: "🎓",
      color: "from-purple-400 to-violet-600",
    },
  ];

  // Counter animation for numbers
  const Counter = ({ value, delay = 0 }: { value: string; delay?: number }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => {
          let start = 0;
          const duration = 2000; // 2 seconds
          const increment = numericValue / (duration / 16); // 60fps

          const updateCounter = () => {
            start += increment;
            if (start < numericValue) {
              setCount(Math.ceil(start));
              requestAnimationFrame(updateCounter);
            } else {
              setCount(numericValue);
            }
          };

          requestAnimationFrame(updateCounter);
        }, delay);

        return () => clearTimeout(timer);
      }
    }, [isInView, numericValue, delay]);

    return (
      <span className="tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  // Floating particles background
  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: [null, `-${Math.random() * 100 + 50}px`],
              x: [null, `-${Math.random() * 50 + 25}px`],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 15,
      },
    },
  };

  const iconVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        delay: 0.5,
      },
    },
    hover: {
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
        repeat: 1,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut", // use a named easing function
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-br from-primary via-primary-dark to-primary/90 py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="School Statistics"
    >
      {/* Animated Background Elements */}
      <FloatingParticles />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              className="w-3 h-3 rounded-full bg-accent"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              By The Numbers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Excellence in{" "}
            <motion.span
              className="text-accent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background:
                  "linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff, #ff6b6b)",
                backgroundSize: "500% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Every Metric
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Our commitment to quality education reflected through meaningful
            statistics
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover="hover"
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
              className="group relative"
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{
                  background:
                    isHovered === index
                      ? `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`
                      : "transparent",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Card */}
              <div
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 h-full 
                transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20"
              >
                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  className="text-4xl mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 
                    flex items-center justify-center backdrop-blur-sm"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover="hover"
                >
                  {stat.icon}
                </motion.div>

                {/* Animated Underline */}
                <motion.div
                  className={`h-1 w-12 mb-4 rounded-full bg-gradient-to-r ${stat.color}`}
                />

                {/* Value */}
                <motion.h3
                  className="text-5xl md:text-6xl font-black mb-2 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.8 }}
                >
                  {isInView ? (
                    <Counter value={stat.value} delay={index * 300} />
                  ) : (
                    "0"
                  )}
                </motion.h3>

                {/* Label */}
                <motion.p
                  className="text-white/90 uppercase tracking-widest text-sm font-bold mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 1 }}
                >
                  {stat.label}
                </motion.p>

                {/* Description (appears on hover) */}
                <AnimatePresence>
                  {isHovered === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/60 text-sm mt-4"
                    >
                      {stat.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Animated indicator */}
                <motion.div
                  className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-accent"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Connecting Line */}
        <motion.div
          className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
        />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-sm uppercase tracking-widest font-semibold mb-2">
            Verified & Audited
          </p>
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="inline-block"
            style={{
              background:
                "linear-gradient(90deg, #4d96ff, #6bcf7f, #ffd93d, #ff6b6b, #4d96ff)",
              backgroundSize: "400% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <span className="text-lg font-bold">
              Transparent • Accountable • Trusted
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Accessibility Note */}
      <div className="sr-only" aria-live="polite">
        {isInView ? "School statistics are now animating." : ""}
      </div>
    </section>
  );
}
