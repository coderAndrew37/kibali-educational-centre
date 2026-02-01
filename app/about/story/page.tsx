"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  Globe,
  Heart,
  Lightbulb,
  ShieldCheck,
  Star,
  Target,
  Users,
} from "lucide-react";
import { useRef } from "react";

export default function WhoWeAre() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const values = [
    {
      title: "Integrity",
      icon: <ShieldCheck className="w-8 h-8" />,
      desc: "Unwavering commitment to honesty and moral uprightness in all we do.",
      color: "from-emerald-400 to-teal-600",
      bgColor: "bg-emerald-50/10",
    },
    {
      title: "Excellence",
      icon: <Target className="w-8 h-8" />,
      desc: "Striving for the highest standards in academics, sports, and the arts.",
      color: "from-blue-400 to-indigo-600",
      bgColor: "bg-blue-50/10",
    },
    {
      title: "Innovation",
      icon: <Lightbulb className="w-8 h-8" />,
      desc: "Embracing new technologies and modern pedagogical approaches.",
      color: "from-amber-400 to-orange-600",
      bgColor: "bg-amber-50/10",
    },
    {
      title: "Community",
      icon: <Users className="w-8 h-8" />,
      desc: "Fostering a sense of belonging and service to others.",
      color: "from-purple-400 to-violet-600",
      bgColor: "bg-purple-50/10",
    },
  ];

  const milestones = [
    {
      year: "2010",
      title: "Founded",
      desc: "Established with a vision for holistic education",
    },
    {
      year: "2015",
      title: "CBC Pioneer",
      desc: "Early adopter of Competency-Based Curriculum",
    },
    {
      year: "2020",
      title: "Digital Campus",
      desc: "Full technology integration across all grades",
    },
    {
      year: "2024",
      title: "Excellence",
      desc: "Consistent 100% transition rate achieved",
    },
  ];

  const stats = [
    {
      value: "15+",
      label: "Years of Excellence",
      icon: <Star className="w-5 h-5" />,
    },
    {
      value: "100%",
      label: "CBC Transition Rate",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      value: "25+",
      label: "National Awards",
      icon: <Target className="w-5 h-5" />,
    },
    {
      value: "50+",
      label: "Qualified Staff",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-primary/5 to-background">
      {/* 2. The Narrative Section */}
      <section
        ref={statsRef}
        className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-background to-primary/5" />

          {/* Animated Dots Pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStatsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Story Badge */}
              <motion.div
                initial={{ width: 0 }}
                animate={isStatsInView ? { width: 120 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-accent to-accent-dark rounded-full"
              />

              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 rounded-full">
                  <Heart className="w-4 h-4 text-accent" />
                  <span className="text-accent font-bold uppercase tracking-widest text-sm">
                    Our Journey
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-dark leading-tight">
                  A Legacy of <span className="text-accent">Excellence</span> &{" "}
                  <span className="text-primary">Innovation</span>
                </h2>

                <div className="space-y-6 text-lg text-primary-dark/80 leading-relaxed">
                  <p>
                    Founded in 2010, Kibali Educational Centre emerged from a
                    visionary belief: education should be a transformative
                    journey, not just a destination. We set out to create an
                    institution where{" "}
                    <strong className="text-primary-dark">
                      academic rigor meets character development
                    </strong>
                    , producing not just scholars, but leaders.
                  </p>
                  <p>
                    As early adopters of Kenya's Competency Based Curriculum,
                    we've perfected a learning model that identifies and
                    nurtures each child's unique gifts. Our approach goes beyond
                    textbooks—it's about shaping{" "}
                    <strong className="text-primary-dark">
                      critical thinkers, innovators, and compassionate citizens
                    </strong>
                    ready for a rapidly evolving world.
                  </p>
                </div>
              </div>

              {/* Timeline Preview */}
              <div className="pt-8">
                <h3 className="text-xl font-bold text-primary-dark mb-6">
                  Our Milestones
                </h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isStatsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 
                        flex items-center justify-center border border-accent/20"
                      >
                        <span className="text-2xl font-black text-accent">
                          {milestone.year}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-primary-dark">
                          {milestone.title}
                        </h4>
                        <p className="text-primary-dark/60 text-sm">
                          {milestone.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats & Quote */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStatsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl p-8 shadow-lg border border-primary/10 
                      hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 
                        flex items-center justify-center group-hover:scale-110 transition-transform"
                      >
                        <div className="text-accent">{stat.icon}</div>
                      </div>
                    </div>
                    <div className="text-4xl font-black text-primary-dark mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-primary-dark/70 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quote Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="relative bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-10 
                  shadow-2xl overflow-hidden"
              >
                {/* Animated Background */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/20 to-transparent 
                  rounded-full -translate-y-32 translate-x-32"
                />

                <div className="relative z-10">
                  <div className="text-5xl text-accent mb-6">"</div>
                  <blockquote className="text-2xl font-medium text-white italic leading-relaxed mb-8">
                    Raising stars, defining the future—one learner at a time.
                    Our mission is to provide the sky where every child can
                    shine with their unique brilliance.
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-white">
                        — Kibali Motto
                      </div>
                      <div className="text-white/60 text-sm">
                        Guiding Principle Since 2010
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="text-3xl text-accent/50"
                    >
                      ✦
                    </motion.div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-r from-accent/10 to-accent/5"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Section */}
      <section
        ref={valuesRef}
        className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-dark/95 to-primary-dark"
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-accent"
              >
                ✦
              </motion.div>
              <span className="text-accent font-black uppercase tracking-[0.3em] text-sm">
                The Pillars That Define Us
              </span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-accent"
              >
                ✦
              </motion.div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8">
              Our <span className="text-accent">Core Values</span>
            </h2>

            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              These fundamental principles guide every decision, interaction,
              and educational approach at Kibali, creating a foundation for
              lifelong success.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.color} p-[2px]`}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />
                </motion.div>

                {/* Card Content */}
                <div
                  className={`relative ${value.bgColor} backdrop-blur-sm rounded-3xl p-8 h-full 
                  border border-white/10 hover:border-white/20 transition-all duration-300`}
                >
                  {/* Icon */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center 
                      justify-center mb-8 shadow-lg`}
                  >
                    <div className="text-white">{value.icon}</div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed mb-6">
                    {value.desc}
                  </p>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-1 rounded-full bg-white/20"
                        initial={{ width: 0 }}
                        animate={isValuesInView ? { width: "100%" } : {}}
                        transition={{
                          delay: index * 0.15 + i * 0.1,
                          duration: 0.5,
                        }}
                      />
                    ))}
                  </div>

                  {/* Hover Indicator */}
                  <motion.div
                    className={`absolute -bottom-2 left-1/2 w-24 h-1 rounded-full bg-gradient-to-r ${value.color} 
                      -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-20 bg-gradient-to-r from-accent/20 to-accent/10 backdrop-blur-sm rounded-3xl 
              border border-accent/30 p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Discover how Kibali's values-based education can shape your
              child's future.
            </p>
            <button
              className="group px-8 py-4 bg-gradient-to-r from-accent to-accent-dark rounded-full
              text-white font-semibold text-lg tracking-wide
              transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-1
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              <span>Schedule a Discovery Call</span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-20 left-10 text-8xl text-accent/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>
        <motion.div
          className="absolute top-20 right-10 text-8xl text-accent/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>
      </section>
    </main>
  );
}
