import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, BookOpen } from "lucide-react";
import { academicLevels } from "@/app/data/academics";

export default async function AcademicLevelDetail({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const data = academicLevels[level];

  if (!data) notFound();

  return (
    <main className="bg-[var(--kibali-bg)] min-h-screen">
      {/* 1. Header Section */}
      <section className="bg-[var(--kibali-dark)] pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <nav className="text-[var(--kibali-amber)] text-xs font-bold uppercase tracking-[0.3em]">
              Academics / {data.title}
            </nav>
            <h1 className="text-white text-5xl md:text-7xl font-serif leading-tight">
              {data.title}
            </h1>
            <p className="text-white/60 text-xl font-light max-w-xl">
              {data.tagline}
            </p>
          </div>
          <div className="flex-1 relative w-full h-[400px]">
            <div className="absolute inset-0 border border-[var(--kibali-amber)] translate-x-4 translate-y-4" />
            <div className="relative h-full w-full bg-slate-800">
              {/* Fallback color if image missing */}
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-[var(--kibali-navy)] text-3xl font-serif mb-6">
                Curriculum Overview
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                {data.overview}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {data.subjects.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center gap-4 p-6 bg-white border border-slate-100 shadow-sm"
                >
                  <BookOpen className="text-[var(--kibali-amber)] w-5 h-5" />
                  <span className="font-medium text-[var(--kibali-navy)]">
                    {subject}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-[var(--kibali-navy)] p-10 text-white">
              <h3 className="text-xl font-serif mb-8 text-[var(--kibali-amber)]">
                Key Highlights
              </h3>
              <ul className="space-y-6">
                {data.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-white/80 font-light leading-snug"
                  >
                    <CheckCircle2 className="text-[var(--kibali-amber)] shrink-0 w-5 h-5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-12 bg-[var(--kibali-amber)] text-[var(--kibali-dark)] py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Admission Inquiry
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
