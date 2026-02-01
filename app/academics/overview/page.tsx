import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { academicLevels } from "../../data/academics";

export default function AcademicsOverview() {
  return (
    <main className="bg-[var(--kibali-bg)] pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-20">
          <h2 className="text-[var(--kibali-amber)] text-xs font-bold uppercase tracking-[0.4em] mb-4">
            Academic Excellence
          </h2>
          <h1 className="text-5xl md:text-6xl font-serif text-[var(--kibali-navy)] mb-8 italic">
            Levels of Learning
          </h1>
          <p className="text-slate-600 text-lg font-light">
            From the early years of discovery to the specialized pathways of
            Junior Secondary, our curriculum is designed to nurture global
            leaders.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(academicLevels).map((level) => (
            <Link
              key={level.slug}
              href={`/academics/${level.slug}`}
              className="group bg-white border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-video relative bg-slate-200 overflow-hidden">
                <div className="absolute inset-0 bg-[var(--kibali-navy)]/20 group-hover:bg-transparent transition-colors z-10" />
                {/* Image component here */}
              </div>
              <div className="p-8">
                <h3 className="text-xl font-serif text-[var(--kibali-navy)] mb-3 group-hover:text-[var(--kibali-amber)] transition-colors">
                  {level.title}
                </h3>
                <p className="text-slate-500 text-sm font-light mb-6 line-clamp-2">
                  {level.tagline}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--kibali-navy)]">
                  Explore Program{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
