"use client";

import PageHero from "@/app/_components/PageHero";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Lightbulb,
  ShieldCheck,
  Star,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const milestones = [
  {
    year: "2010",
    title: "Founded",
    desc: "Established with a vision for holistic, child-centred education in Nairobi.",
  },
  {
    year: "2015",
    title: "CBC Pioneer",
    desc: "Among the earliest schools to adopt Kenya's Competency-Based Curriculum.",
  },
  {
    year: "2020",
    title: "Digital Campus",
    desc: "Full technology integration across all grades — labs, devices and e-learning.",
  },
  {
    year: "2024",
    title: "100% Transition",
    desc: "Every leaver secured placement in a top national school or university.",
  },
];

const stats = [
  { value: "15+", label: "Years of Excellence", icon: Star },
  { value: "100%", label: "CBC Transition Rate", icon: BookOpen },
  { value: "25+", label: "National Awards", icon: Target },
  { value: "50+", label: "Qualified Staff", icon: Users },
];

const values = [
  {
    title: "Integrity",
    icon: ShieldCheck,
    desc: "Unwavering commitment to honesty and moral uprightness in all we do.",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    title: "Excellence",
    icon: Target,
    desc: "Striving for the highest standards in academics, sports, and the arts.",
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    desc: "Embracing new technologies and forward-thinking pedagogical approaches.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Community",
    icon: Users,
    desc: "Fostering a deep sense of belonging and a culture of service to others.",
    gradient: "from-primary to-primary-dark",
  },
];

export default function WhoWeAre() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.2 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <PageHero
        image="/campus-1.jpg"
        eyebrow="Kibali Educational Centre"
        title="Who We Are"
        accentWord="We"
        tagline="A premier institution in Nairobi shaping Kenya's next generation of leaders through CBC excellence, character, and innovation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Who We Are", href: "#" },
        ]}
      />

      {/* ── 2. Story + Timeline ──────────────────────────────────────────── */}
      <section ref={storyRef} className="relative py-32 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isStoryInView ? { width: 60 } : {}}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="h-1 bg-gradient-to-r from-accent to-accent-dark rounded-full"
                />
                <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                  Our Story
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-dark leading-[1.1] tracking-tight">
                A Legacy of <span className="text-accent">Excellence</span>{" "}
                Since 2010
              </h2>

              <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
                <p>
                  Kibali Educational Centre was founded on a singular belief —
                  that education should be a{" "}
                  <strong className="text-primary-dark font-bold">
                    transformative journey
                  </strong>
                  , not a race to a certificate. We set out to build an
                  institution where academic rigour meets holistic character
                  development, producing scholars who are also leaders.
                </p>
                <p>
                  As early adopters of Kenya's Competency Based Curriculum, we
                  have refined a learning model that identifies and nurtures
                  each child's unique gifts. Our approach produces{" "}
                  <strong className="text-primary-dark font-bold">
                    critical thinkers, innovators, and compassionate citizens
                  </strong>{" "}
                  ready for a rapidly evolving world.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-dark/40 mb-8">
                  Our Milestones
                </h3>
                <div className="relative">
                  <div className="absolute left-[31px] top-0 bottom-0 w-px bg-slate-100" />
                  <div className="space-y-8">
                    {milestones.map((m, i) => (
                      <motion.div
                        key={m.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-start gap-6 relative"
                      >
                        <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 relative z-10">
                          <span className="text-primary-dark font-black text-xs leading-tight text-center">
                            {m.year}
                          </span>
                        </div>
                        <div className="pt-3">
                          <h4 className="font-black text-primary-dark text-base uppercase tracking-tight mb-1">
                            {m.title}
                          </h4>
                          <p className="text-slate-500 text-sm leading-relaxed">
                            {m.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 space-y-6 lg:sticky lg:top-32"
            >
              <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 overflow-hidden rounded-2xl">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.35 + i * 0.08, type: "spring" }}
                      className="bg-white p-8 group hover:bg-slate-50 transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5 text-accent mb-6 stroke-[1.5px]" />
                      <div className="text-4xl font-black text-primary-dark tracking-tighter mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="relative bg-primary-dark rounded-2xl p-10 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent/10 blur-2xl" />
                <div className="relative z-10">
                  <div className="text-6xl text-accent/30 font-black leading-none mb-4">
                    "
                  </div>
                  <blockquote className="text-surface/90 text-xl font-medium italic leading-relaxed mb-8">
                    Every child is a star waiting to shine. Our mission is to
                    provide the sky.
                  </blockquote>
                  <div>
                    <div className="text-surface font-black text-sm uppercase tracking-widest">
                      Kibali Motto
                    </div>
                    <div className="text-surface/40 text-xs mt-1 uppercase tracking-wider">
                      Guiding Principle Since 2010
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Core Values ───────────────────────────────────────────────── */}
      <section
        ref={valuesRef}
        className="relative py-32 px-6 bg-background overflow-hidden"
      >
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-2xl text-accent"
              >
                ✦
              </motion.span>
              <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                The Pillars That Define Us
              </span>
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-2xl text-accent"
              >
                ✦
              </motion.span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-primary-dark tracking-tight leading-[1.05] mb-6">
              Our <span className="text-accent">Core Values</span>
            </h2>
            <p className="text-xl text-primary-dark/60 max-w-2xl mx-auto leading-relaxed">
              These principles guide every decision, interaction, and learning
              experience at Kibali — from classroom to career.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 48 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="relative group cursor-default"
                >
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${v.gradient} p-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-white" />
                  </div>
                  <div className="relative bg-surface rounded-3xl p-8 h-full border border-slate-100 group-hover:border-transparent transition-all duration-300">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-8 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white stroke-2" />
                    </div>
                    <h3 className="text-xl font-black text-primary-dark uppercase tracking-tight mb-3">
                      {v.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {v.desc}
                    </p>
                    <motion.div
                      className={`absolute bottom-0 left-8 right-8 h-0.5 rounded-full bg-gradient-to-r ${v.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. CTA ───────────────────────────────────────────────────────── */}
      <section className="relative bg-primary-dark py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="inline-block px-6 py-2 bg-accent/10 border-y border-accent/30 backdrop-blur-sm mb-8">
            <span className="text-accent font-black tracking-[0.3em] text-xs uppercase">
              Ready to Join Us?
            </span>
          </div>
          <h2 className="text-surface text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] mb-6">
            Shape Your Child's <span className="text-accent">Future</span> Today
          </h2>
          <p className="text-surface/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Discover how Kibali's values-driven education can unlock your
            child's full potential.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/admissions"
              className="bg-accent text-primary-dark px-12 py-5 rounded-sm font-black hover:bg-surface transition-all shadow-2xl tracking-tight uppercase text-sm"
            >
              Enroll Your Child
            </Link>
            <Link
              href="/contact"
              className="border-2 border-surface/30 text-surface px-12 py-5 rounded-sm font-bold hover:bg-surface/10 backdrop-blur-sm transition-all uppercase text-sm"
            >
              Book a Tour
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
