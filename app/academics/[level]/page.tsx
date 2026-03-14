import { academicLevels } from "@/app/data/academics";
import { ArrowRight, BookOpen, GraduationCap, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AcademicLevelDetail({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const data = academicLevels[level];

  if (!data) notFound();

  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-primary-dark">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gala-3.jpg"
            alt={data.title}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Left-to-right: protects text on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/75 to-primary-dark/30 z-10" />
          {/* Bottom-to-top: always-on dark bed for text on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent z-10" />
          {/* Grain */}
          <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none bg-[url('/noise.png')]" />
        </div>

        {/* Content — anchored to bottom so it clears the notch/status bar */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24 pt-28 sm:pt-32">
          <div className="max-w-4xl space-y-5 sm:space-y-7">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-3 text-accent text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="h-px w-8 bg-accent shrink-0" />
              Academics / {data.slug}
            </nav>

            {/* Title */}
            <div className="space-y-2 sm:space-y-3">
              <h1
                className="text-surface font-black uppercase tracking-tighter leading-none drop-shadow-2xl
                text-5xl sm:text-4xl md:text-8xl lg:text-9xl"
              >
                {data.title.split("(")[0].trim()}
              </h1>
              <p
                className="text-accent font-black uppercase tracking-tighter italic leading-none drop-shadow-2xl
                text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
              >
                Excellence.
              </p>
            </div>

            {/* Tagline */}
            <p
              className="text-surface/85 font-medium border-l-2 border-accent pl-5 italic leading-snug
              text-base sm:text-lg md:text-xl max-w-sm sm:max-w-xl"
            >
              "{data.tagline}"
            </p>
          </div>
        </div>

        {/* Scroll indicator — hidden on small screens where it would overlap content */}
        <div className="hidden md:flex absolute bottom-8 left-6 lg:left-8 items-center gap-3 text-surface/30 uppercase text-[9px] font-bold tracking-[0.4em] flex-col z-20">
          <span className="h-10 w-px bg-surface/20" />
          Scroll
        </div>
      </section>

      {/* ── 2. Philosophy & Outcomes ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — philosophy */}
          <div className="space-y-6 md:space-y-8">
            <div className="w-14 h-14 bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
              <Lightbulb className="text-primary-dark" size={24} />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-dark uppercase tracking-tighter leading-[1.05]">
              Educational <br />
              Philosophy
            </h2>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {data.philosophy || data.overview}
            </p>

            <button className="flex items-center gap-3 bg-primary-dark text-surface px-8 py-4 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-primary-dark transition-all">
              Download Syllabus <ArrowRight size={14} />
            </button>
          </div>

          {/* Right — outcomes */}
          <div className="bg-background border border-slate-100 p-8 md:p-10">
            <h3 className="text-sm font-black text-primary-dark mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
              <GraduationCap className="text-accent shrink-0" size={20} />
              Key Learning Outcomes
            </h3>
            <ul className="space-y-5">
              {(data.outcomes || []).map((outcome, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="text-accent font-black text-base shrink-0 w-7">
                    0{i + 1}.
                  </span>
                  <span className="text-slate-700 font-bold text-sm leading-relaxed group-hover:text-primary-dark transition-colors">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. Subjects Grid ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary-dark text-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header — matches site eyebrow pattern */}
          <div className="mb-12 md:mb-16">
            <div className="inline-block px-6 py-2 bg-accent/10 border-y border-accent/30 mb-6">
              <span className="text-accent font-black tracking-[0.3em] text-xs uppercase">
                The Curriculum
              </span>
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[1.0]">
              Core Subjects
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {data.subjects.map((subject, i) => (
              <div
                key={i}
                className="group p-6 md:p-8 border border-surface/10 hover:bg-surface/5 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                  <BookOpen
                    className="text-accent group-hover:text-primary-dark transition-colors duration-300"
                    size={20}
                  />
                </div>
                <h4 className="text-base md:text-lg font-black mb-3 uppercase tracking-tight leading-tight">
                  {typeof subject === "string" ? subject : subject.name}
                </h4>
                <p className="text-surface/55 text-sm leading-relaxed">
                  {typeof subject === "string"
                    ? "In-depth exploration of core concepts and practical applications."
                    : subject.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-accent overflow-hidden p-8 sm:p-12 md:p-16 lg:p-20">
            {/* Texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10 text-center">
              <div className="inline-block px-6 py-2 bg-primary-dark/10 border-y border-primary-dark/20 mb-8">
                <span className="text-primary-dark font-black tracking-[0.3em] text-xs uppercase">
                  2026 Enrolment Open
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary-dark uppercase tracking-tighter leading-[1.05] mb-6">
                Join the <span className="italic">Kibali</span> Family
              </h2>

              <p className="text-primary-dark/70 text-base md:text-lg font-bold mb-10 max-w-xl mx-auto uppercase tracking-tight leading-snug">
                Applications are open for the 2026 Academic Year. Schedule a
                tour to see our facilities.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <Link
                  href="/admission"
                  className="bg-primary-dark text-surface px-10 py-5 rounded-sm font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary transition-colors"
                >
                  Apply for Admission
                </Link>
                <Link
                  href="/tour"
                  className="bg-white/30 border-2 border-primary-dark/20 text-primary-dark px-10 py-5 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Book a School Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
