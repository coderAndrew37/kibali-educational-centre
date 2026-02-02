import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap } from "lucide-react";
import { academicLevels } from "../../data/academics";

export default function AcademicsOverview() {
  return (
    <main className="bg-white">
      {/* 1. Impactful Hero Header */}
      <section className="relative h-screen flex items-center bg-primary-dark overflow-hidden mt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/gala-3.jpg" // Use a general academic shot here
            alt="Academics at Kibali"
            fill
            className="object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-4xl">
            <h2 className="text-accent text-xs font-black uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-accent" />
              Academic Excellence
            </h2>
            <h1 className="text-surface text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Levels of <br />
              <span className="text-accent italic">Learning.</span>
            </h1>
            <p className="text-surface/60 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
              Our curriculum is a deliberate journey—carefully mapped to evolve
              with your child from initial curiosity to specialized technical
              mastery.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Program Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.values(academicLevels).map((level, i) => (
            <Link
              key={level.slug}
              href={`/academics/${level.slug}`}
              className="group relative flex flex-col h-[500px] rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl transition-all duration-700 hover:-translate-y-4"
            >
              {/* Background Image that zooms on hover */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/gala-3.jpg"
                  alt={level.title}
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/20 to-transparent" />
              </div>

              {/* Content Layer */}
              <div className="relative z-10 mt-auto p-10 space-y-4">
                <span className="text-accent font-black text-4xl opacity-20 group-hover:opacity-100 transition-opacity">
                  0{i + 1}
                </span>
                <h3 className="text-3xl font-black text-surface uppercase tracking-tighter leading-none">
                  {level.title}
                </h3>
                <p className="text-surface/70 text-sm font-medium leading-relaxed line-clamp-2 transition-all group-hover:text-surface">
                  {level.tagline}
                </p>

                <div className="pt-4 flex items-center gap-3 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="h-px w-6 bg-accent group-hover:w-12 transition-all" />
                  Explore Program
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>

              {/* Decorative Corner Icon */}
              <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-surface group-hover:bg-accent group-hover:text-primary-dark transition-colors">
                <GraduationCap size={24} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Bottom Philosophy Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h3 className="text-primary-dark text-4xl font-black uppercase tracking-tighter mb-6">
              A Global Standard for <br />
              <span className="text-accent">Local Leadership.</span>
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              While we strictly adhere to the Competency Based Curriculum (CBC),
              we integrate international teaching methodologies to ensure our
              students are competitive globally.
            </p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <p className="text-3xl font-black text-primary-dark">100%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                Transition Rate
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <p className="text-3xl font-black text-primary-dark">12:1</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                Student Teacher Ratio
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
