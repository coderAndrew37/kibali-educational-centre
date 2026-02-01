"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GraduationCap, Users, Trophy, BookOpen } from "lucide-react";

interface statsType {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
}

const stats: statsType[] = [
  {
    label: "University Transition",
    value: "100%",
    icon: GraduationCap,
    description: "Successful placement in leading global universities.",
  },
  {
    label: "Student-Teacher Ratio",
    value: "15:1",
    icon: Users,
    description: "Dedicated attention ensuring no child is left behind.",
  },
  {
    label: "Extracurricular Activities",
    value: "25+",
    icon: Trophy,
    description: "Nurturing talents beyond the traditional classroom.",
  },
  {
    label: "Foundation Year",
    value: "2010",
    icon: BookOpen,
    description: "Over a decade of shaping Kenya's future leaders.",
  },
];

export function SchoolStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="bg-[var(--kibali-bg)] py-24 md:py-32 border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-[var(--kibali-amber)] font-bold mb-4">
              Institutional Impact
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">
              A legacy of academic excellence and{" "}
              <span className="italic text-slate-400">holistic growth.</span>
            </h3>
          </div>
          <div className="hidden md:block h-[1px] flex-1 bg-slate-200 mx-12 mb-4" />
        </div>

        {/* Stats Grid - Clean Border-Collapse Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 overflow-hidden">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  isInView,
  index,
}: {
  stat: statsType;
  isInView: boolean;
  index: number;
}) {
  return (
    <div className="bg-white p-10 group hover:bg-slate-50 transition-colors duration-500">
      <stat.icon className="w-6 h-6 text-[var(--kibali-amber)] mb-8 stroke-[1.5px]" />

      <div className="space-y-2">
        <h4 className="text-5xl font-serif text-[var(--kibali-navy)] tracking-tighter">
          {isInView ? <Counter value={stat.value} /> : "0"}
        </h4>
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
          {stat.label}
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-xs text-slate-500 leading-relaxed font-light">
          {stat.description}
        </p>
      </div>
    </div>
  );
}

function Counter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    const duration = 2000;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [numericValue]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}
