import { studentLifeData } from "@/app/data/student-life";
import { StudentLifeData } from "@/types";
import { CheckCircle2, Shield } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>; // 2. Update type to Promise
}) {
  // 3. Unbox the params before use
  const { service } = await params;

  const data = (studentLifeData as StudentLifeData).services[service];

  if (!data) notFound();

  return (
    <main className="pt-32 bg-white">
      {/* 1. KISC-Style Header */}
      <section className="bg-primary-dark py-24 px-6 relative">
        <div className="max-w-7xl mx-auto z-10 relative">
          <p className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">
            Student Life
          </p>
          <h1 className="text-surface text-5xl md:text-7xl font-black uppercase tracking-tighter">
            {data.title}
          </h1>
          <p className="text-surface/60 text-xl mt-6 max-w-2xl font-medium">
            {data.tagline}
          </p>
        </div>
      </section>

      {/* 2. Content Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Narrative */}
          <div className="lg:col-span-2 space-y-12">
            <p className="text-2xl font-bold text-primary-dark leading-snug">
              {data.description}
            </p>

            <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>

            {data.sections.map((section, i) => (
              <div key={i} className="space-y-4">
                <h2 className="text-3xl font-black text-primary-dark uppercase italic">
                  {section.title}
                </h2>
                <p className="text-slate-600 leading-loose text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Sidebar Feature List */}
          <aside className="space-y-8">
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm sticky top-40">
              <h3 className="text-xl font-black text-primary-dark mb-8 border-b pb-4">
                WHY CHOOSE US
              </h3>
              <ul className="space-y-6">
                {data.benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2
                      className="text-accent shrink-0 mt-1"
                      size={20}
                    />
                    <span className="font-bold text-slate-700 text-sm uppercase tracking-tight">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary p-8 rounded-[3rem] text-surface flex items-center gap-4">
              <Shield className="text-accent" size={40} />
              <p className="font-black uppercase text-xs tracking-widest">
                24/7 Campus Safeguarding
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
