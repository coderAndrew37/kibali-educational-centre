// app/academics/[level]/page.tsx
import LifeAfterClass from "@/app/_components/LifeAfterClass";
import { CheckCircle2, BookOpen, Microscope, Music } from "lucide-react";
import Image from "next/image";

export default function AcademicLevelDetail({
  params,
}: {
  params: { level: string };
}) {
  // In production, fetch this data from Sanity based on params.level
  const levelData = {
    title: "Junior Secondary School (JSS)",
    tagline: "Transitioning to specialized pathways and technical mastery.",
    overview:
      "Our Junior Secondary program (Grade 7-9) is designed to provide a broad-based curriculum while allowing students to explore their interests in Science, Arts, and Social Sciences.",
    subjects: [
      "Pre-Technical Studies",
      "Integrated Science",
      "Computer Science",
      "Business Studies",
      "Health Education",
      "Agriculture",
    ],
    features: [
      "Modern Science & Computer Labs",
      "Career Guidance & Counseling",
      "Project-Based Learning (PBL)",
      "Formative & Summative Assessment Prep",
    ],
  };

  return (
    <main className="pt-32">
      {/* 1. Impact Header */}
      <section className="bg-primary-dark py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <nav className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
              Academics / {levelData.title}
            </nav>
            <h1 className="text-surface text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              {levelData.title}
            </h1>
            <p className="text-surface/70 text-xl font-medium max-w-xl">
              {levelData.tagline}
            </p>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-accent/20 rounded-2xl rotate-3" />
            <Image
              src="/jss-lab.jpg"
              className="relative rounded-2xl shadow-2xl object-cover h-80 w-full"
              alt={levelData.title}
              fill
            />
          </div>
        </div>
      </section>

      {/* 2. The Learning Areas (The "Meat") */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-primary-dark text-3xl font-black mb-6 uppercase">
                Curriculum Overview
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {levelData.overview}
              </p>
            </div>

            {/* Subject Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {levelData.subjects.map((subject, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 bg-surface border border-slate-100 rounded-xl"
                >
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <BookOpen size={20} />
                  </div>
                  <span className="font-bold text-primary-dark">{subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Sidebar: Why Kibali for this level */}
          <div className="bg-slate-50 p-8 rounded-3xl h-fit border border-slate-100">
            <h3 className="text-xl font-black text-primary-dark mb-6">
              Key Highlights
            </h3>
            <ul className="space-y-4">
              {levelData.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-accent shrink-0 mt-1"
                    size={18}
                  />
                  <span className="text-slate-600 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full mt-10 bg-primary text-surface py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary-dark transition-colors">
              Inquire for Admission
            </button>
          </div>
        </div>
      </section>

      <LifeAfterClass />
    </main>
  );
}
