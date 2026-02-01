// components/WelcomeMessage.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function WelcomeMessage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-surface to-accent/5" />

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-100/30 to-teal-200/30 blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-amber-100/30 to-orange-200/30 blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Director's Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              {/* Placeholder for director image - replace with actual Image component */}
              <Image
                src="/overview.jpg"
                alt="school overview"
                fill
                className="object-cover w-full h-full"
              />

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-accent to-accent-dark rounded-2xl rotate-12"
                animate={{ rotate: [12, 15, 12] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl -rotate-12"
                animate={{ rotate: [-12, -15, -12] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            {/* Stats Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-primary/10"
            >
              <div className="text-center">
                <div className="text-3xl font-black text-primary-dark mb-1">
                  14+
                </div>
                <div className="text-xs font-bold text-primary-dark/70 uppercase tracking-wider">
                  Years of Excellence
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quote Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-accent to-accent-dark rounded-full"
              />
              <span className="text-accent font-bold uppercase tracking-widest text-sm">
                Leadership Vision
              </span>
            </div>

            {/* Main Quote */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-8 leading-tight">
              A Message from our <span className="text-accent">Director</span>
            </h2>

            {/* Quote Container */}
            <div className="relative">
              {/* Quote Marks */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-8xl text-accent/20 absolute -top-10 -left-6"
              >
                "
              </motion.div>

              {/* Quote Text */}
              <motion.blockquote
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="text-2xl md:text-3xl text-primary-dark italic font-medium leading-relaxed mb-10 pl-8 relative z-10"
              >
                At Kibali Educational Centre, we believe that every child is a
                star waiting to shine. Our mission is to provide the sky where
                they can discover their light and illuminate the world with
                their unique brilliance.
              </motion.blockquote>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 }}
                className="border-t border-primary/10 pt-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xl font-bold text-primary-dark">
                      Dr. James Mwangi
                    </div>
                    <div className="text-primary-dark/70">
                      School Director & Founder
                    </div>
                  </div>

                  {/* Signature Image */}
                  <div className="relative">
                    <div className="text-3xl opacity-50">—</div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-accent to-accent-dark rounded-full
                  text-white font-semibold text-lg tracking-wide
                  transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-1
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                <span className="relative z-10">Schedule a Tour</span>
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                />
              </button>

              <button
                className="group px-8 py-4 border-2 border-primary/20 rounded-full
                  text-primary-dark font-semibold text-lg tracking-wide
                  transition-all duration-300 hover:border-accent hover:text-accent
                  hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                <span>Meet Our Team</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 right-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-accent/30"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: `${i * 20}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated Border Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
      />
    </section>
  );
}
