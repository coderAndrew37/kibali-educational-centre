import { notFound } from "next/navigation";
import Image from "next/image";
import {
  CheckCircle2,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import { academicLevels } from "@/app/data/academics";
import Link from "next/link";

export default async function AcademicLevelDetail({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const data = academicLevels[level];

  if (!data) notFound();

  return (
    <main className="bg-white min-h-screen">
      {/* 1. ARCHITECTURAL HERO SECTION */}
      <section className="relative h-screen min-h-[650px] flex items-center overflow-hidden bg-primary-dark">
        {/* 1. Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gala-3.jpg" // This pulls the specific image from your data file
            alt={data.title}
            fill
            priority // Ensures the hero image loads immediately
            className="object-cover object-center scale-105 transition-transform duration-[10s] hover:scale-100"
          />

          {/* 2. Sophisticated Overlay System */}
          {/* Left-to-right gradient to protect text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/70 to-transparent z-10" />

          {/* Bottom-to-top gradient to blend into the next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-20 z-10" />

          {/* Subtle Grain or Pattern Overlay (Optional) */}
          <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none bg-[url('/noise.png')]" />
        </div>

        {/* 3. Content Layer */}
        <div className="max-w-7xl mx-auto px-6 z-20 relative w-full pt-[100px]">
          <div className="max-w-4xl space-y-8">
            {/* Animated Breadcrumb */}
            <nav className="flex items-center gap-4 text-accent text-xs font-black uppercase tracking-[0.4em] animate-fade-in">
              <span className="h-px w-10 bg-accent" />
              Academics / {data.slug}
            </nav>

            {/* Main Title */}
            <h1 className="text-surface text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
              {data.title.split("(")[0]}
              <span className="block text-accent italic md:-mt-4">
                Excellence.
              </span>
            </h1>

            {/* Tagline with Decorative Border */}
            <div className="relative pt-4">
              <p className="text-surface/90 text-xl md:text-3xl font-medium max-w-2xl border-l-4 border-accent pl-8 italic leading-snug">
                "{data.tagline}"
              </p>
            </div>

            {/* Optional: Scroll Indicator */}
            <div className="absolute bottom-10 left-6 flex items-center gap-4 text-surface/30 uppercase text-[10px] font-bold tracking-[0.5em] vertical-rl">
              <span className="h-12 w-px bg-surface/20 block mx-auto mb-4" />
              Scroll to Explore
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY & OUTCOMES (The "Why") */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="inline-flex p-4 bg-slate-50 rounded-2xl">
            <Lightbulb className="text-accent" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary-dark uppercase tracking-tighter">
            Educational <br />
            Philosophy
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            {data.philosophy || data.overview}
          </p>
          <div className="pt-6">
            <button className="flex items-center gap-3 bg-primary-dark text-surface px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-primary-dark transition-all">
              Download Syllabus <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
          <h3 className="text-xl font-black text-primary-dark mb-8 uppercase flex items-center gap-3">
            <GraduationCap className="text-accent" /> Key Learning Outcomes
          </h3>
          <ul className="space-y-6">
            {(data.outcomes || []).map((outcome, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <span className="text-accent font-black text-lg">
                  0{i + 1}.
                </span>
                <span className="text-slate-700 font-bold group-hover:text-primary transition-colors">
                  {outcome}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. SUBJECTS GRID (Visual Detail) */}
      <section className="py-24 bg-primary-dark text-surface rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">
              The Curriculum
            </h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Core Subjects
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.subjects.map((subject, i) => (
              <div
                key={i}
                className="p-8 border border-surface/10 rounded-[2rem] hover:bg-surface/5 transition-all group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                  <BookOpen
                    className="text-accent group-hover:text-primary-dark"
                    size={24}
                  />
                </div>
                <h4 className="text-xl font-black mb-3 uppercase tracking-tight">
                  {typeof subject === "string" ? subject : subject.name}
                </h4>
                <p className="text-surface/60 text-sm leading-relaxed">
                  {typeof subject === "string"
                    ? "In-depth exploration of core concepts and practical applications."
                    : subject.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <div className="bg-accent p-12 md:p-20 rounded-[4rem] text-primary-dark relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Join the <span className="italic">Kibali</span> Family
            </h2>
            <p className="text-lg font-bold mb-10 max-w-xl mx-auto opacity-80 uppercase tracking-tight">
              Applications are currently open for the 2026 Academic Year.
              Schedule a tour to see our facilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/admission"
                className="bg-primary-dark text-surface px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
              >
                Apply for Admission
              </Link>
              <Link
                href="/tour"
                className="bg-white/20 border border-primary-dark/20 text-primary-dark px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-all"
              >
                Book a School Tour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
