import { studentLifeData } from "@/app/data/student-life";
import { StudentLifeData } from "@/types";
import { CheckCircle2, Shield } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = (studentLifeData as StudentLifeData).services[service];

  if (!data) notFound();

  return (
    <main className="bg-white">
      {/* 1. KISC-Style Hero with Background Image */}

      <section className="relative h-screen min-h-[500px] flex items-center overflow-hidden pt-120px">
        {/* Static Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/student-life-hero.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-primary-dark/70" />
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10 relative w-full">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <p className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                Student Life
              </p>
            </div>

            <h1 className="text-surface text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              {data.title}
            </h1>

            <p className="text-surface/80 text-lg md:text-xl mt-6 max-w-2xl font-medium border-l-2 border-accent pl-6">
              {data.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Content Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Narrative */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <h2 className="text-accent font-black uppercase tracking-[0.2em] text-xs">
                Overview
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-primary-dark leading-tight">
                {data.description}
              </p>
            </div>

            {/* Dynamic Service-Specific Image */}
            <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl relative group">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
            </div>

            {data.sections.map((section, i) => (
              <div
                key={i}
                className="space-y-4 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100"
              >
                <h2 className="text-2xl font-black text-primary-dark uppercase">
                  {section.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Sidebar Feature List */}
          <aside className="space-y-8">
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm sticky top-40">
              <h3 className="text-xl font-black text-primary-dark mb-8 border-b border-slate-200 pb-4">
                WHY CHOOSE US
              </h3>
              <ul className="space-y-6">
                {data.benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <CheckCircle2
                      className="text-accent shrink-0 mt-1 transition-transform group-hover:scale-110"
                      size={20}
                    />
                    <span className="font-bold text-slate-700 text-sm uppercase tracking-tight">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-dark p-8 rounded-[3rem] text-surface flex items-center gap-4 border border-accent/20">
              <div className="bg-accent p-3 rounded-2xl">
                <Shield className="text-primary-dark" size={32} />
              </div>
              <div>
                <p className="font-black uppercase text-xs tracking-widest">
                  Secure Campus
                </p>
                <p className="text-[10px] text-surface/50 uppercase tracking-tighter mt-1">
                  24/7 Professional Safeguarding
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
