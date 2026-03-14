"use client";

import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Monitor,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    index: "01",
    title: "Holistic CBC Integration",
    desc: "We go beyond textbooks — competency-based learning that identifies and nurtures every child's unique talent through personalised pathways.",
    icon: BookOpen,
    accent: "#f59e0b", // site accent
    stats: [
      { value: "98%", label: "Parent Satisfaction" },
      { value: "60+", label: "Competencies Mapped" },
      { value: "100%", label: "CBC Transition Rate" },
    ],
  },
  {
    index: "02",
    title: "Digital-First Campus",
    desc: "Students are tech-savvy from day one — modern labs and digital tools preparing every learner for a rapidly evolving, tech-driven world.",
    icon: Monitor,
    accent: "#1e3a8a", // site primary
    stats: [
      { value: "1:1", label: "Device Ratio" },
      { value: "G1", label: "Coding Starts" },
      { value: "4", label: "AI Learning Labs" },
    ],
  },
  {
    index: "03",
    title: "Values-Based Education",
    desc: "Character is as important as grades. Discipline, integrity, and social responsibility are woven into the fabric of every school day.",
    icon: Star,
    accent: "#f59e0b",
    stats: [
      { value: "3×", label: "Character Reporting" },
      { value: "200h", label: "Community Service" },
      { value: "15+", label: "Leadership Roles" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyKibali() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Auto-advance
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % features.length),
      5000,
    );
    return () => clearInterval(id);
  }, [isInView]);

  // Sync mobile slider scroll when active changes programmatically
  useEffect(() => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.children[active] as HTMLElement;
    if (card) {
      sliderRef.current.scrollTo({
        left: card.offsetLeft - 24,
        behavior: "smooth",
      });
    }
  }, [active]);

  // Track scroll position on mobile to update active dot
  const onScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const idx = Math.round(scrollLeft / clientWidth);
    setActive(Math.min(idx, features.length - 1));
  }, []);

  const prev = () =>
    setActive((p) => (p - 1 + features.length) % features.length);
  const next = () => setActive((p) => (p + 1) % features.length);

  const feature = features[active];

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-5">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-xl text-accent"
            >
              ✦
            </motion.span>
            <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
              The Kibali Difference
            </span>
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-xl text-accent"
            >
              ✦
            </motion.span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-dark tracking-tighter leading-[1.0] uppercase max-w-2xl">
              Why <span className="text-accent">Kibali</span>{" "}
              <br className="hidden sm:block" />
              Stands Out
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-sm lg:text-right">
              Where innovative pedagogy meets rigorous academics, creating{" "}
              <strong className="text-primary-dark font-bold">
                future-ready learners
              </strong>
              .
            </p>
          </div>
        </motion.div>

        {/* ── Desktop layout: number nav + detail panel ──────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-0 border border-slate-100">
          {/* Left: numbered feature list */}
          <div className="lg:col-span-4 border-r border-slate-100">
            {features.map((f, i) => {
              const Icon = f.icon;
              const isActive = active === i;
              return (
                <motion.button
                  key={f.index}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-start gap-5 p-8 border-b border-slate-100 last:border-b-0 transition-colors duration-300 group relative ${
                    isActive
                      ? "bg-primary-dark"
                      : "bg-surface hover:bg-slate-50"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Active accent bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                    />
                  )}

                  {/* Number */}
                  <span
                    className={`text-xs font-black tabular-nums shrink-0 mt-1 ${isActive ? "text-accent" : "text-slate-300"}`}
                  >
                    {f.index}
                  </span>

                  {/* Icon */}
                  <div
                    className={`shrink-0 w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? "bg-accent"
                        : "bg-slate-100 group-hover:bg-accent/10"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-primary-dark" : "text-slate-500"}`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`font-black text-sm uppercase tracking-tight leading-snug transition-colors duration-300 ${
                        isActive ? "text-surface" : "text-primary-dark"
                      }`}
                    >
                      {f.title}
                    </h3>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-surface/50 text-xs mt-1 leading-relaxed line-clamp-2"
                      >
                        {f.desc}
                      </motion.p>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div className="lg:col-span-8 bg-surface relative overflow-hidden">
            {/* Progress bar */}
            <motion.div
              key={active}
              className="absolute top-0 left-0 h-0.5 bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />

            <motion.div
              key={`detail-${active}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-10 xl:p-14 h-full flex flex-col justify-between"
            >
              {/* Top: content */}
              <div className="space-y-8">
                <div className="flex items-start justify-between">
                  <div className="inline-block px-5 py-2 bg-accent/10 border-y border-accent/30">
                    <span className="text-accent font-black tracking-[0.3em] text-[10px] uppercase">
                      {feature.index} / 0{features.length}
                    </span>
                  </div>
                  {/* Nav arrows */}
                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      className="w-9 h-9 flex items-center justify-center border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-400" />
                    </button>
                    <button
                      aria-label="next slide"
                      onClick={next}
                      className="w-9 h-9 flex items-center justify-center border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                <h3 className="text-3xl xl:text-4xl font-black text-primary-dark uppercase tracking-tighter leading-[1.1]">
                  {feature.title}
                </h3>

                <p className="text-slate-500 text-lg leading-relaxed max-w-xl border-l-2 border-accent pl-5">
                  {feature.desc}
                </p>
              </div>

              {/* Bottom: stats */}
              <div className="mt-12 grid grid-cols-3 gap-px bg-slate-100 border border-slate-100 overflow-hidden">
                {feature.stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-surface p-6 group hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-3xl font-black text-primary-dark tracking-tighter mb-1">
                      {s.value}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Mobile: horizontal drag-scroll slider ──────────────────────── */}
        <div className="lg:hidden">
          {/* Slider */}
          <div
            ref={sliderRef}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="shrink-0 w-[85vw] sm:w-[70vw] snap-start bg-surface border border-slate-100 overflow-hidden"
                >
                  {/* Card top accent */}
                  <div className="h-1 bg-accent w-full" />

                  <div className="p-7 space-y-6">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                        <Icon className="w-5 h-5 text-primary-dark" />
                      </div>
                      <span className="text-[10px] font-black text-slate-300 tabular-nums">
                        {f.index} / 0{features.length}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-primary-dark uppercase tracking-tight leading-snug mb-3">
                        {f.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-accent pl-4">
                        {f.desc}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-px bg-slate-100 border border-slate-100 overflow-hidden">
                      {f.stats.map((s) => (
                        <div
                          key={s.label}
                          className="bg-surface p-4 text-center"
                        >
                          <div className="text-xl font-black text-primary-dark tracking-tighter">
                            {s.value}
                          </div>
                          <div className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 mt-0.5 leading-tight">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots + arrows */}
          <div className="flex items-center justify-between mt-5 px-1">
            <button
              onClick={prev}
              className="w-9 h-9 flex items-center justify-center border border-slate-200 hover:border-accent transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>

            <div className="flex gap-2 items-center">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to feature ${i + 1}`}
                  className={`transition-all duration-300 ${
                    active === i
                      ? "w-8 h-1.5 bg-accent"
                      : "w-3 h-1.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <button
              aria-label="next slide"
              onClick={next}
              className="w-9 h-9 flex items-center justify-center border border-slate-200 hover:border-accent transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="sr-only" aria-live="polite">
        {`Viewing feature ${active + 1} of ${features.length}: ${features[active].title}`}
      </div>
    </section>
  );
}
