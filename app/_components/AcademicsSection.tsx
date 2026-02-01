import { ArrowRight, GraduationCap, BookOpen, Palette } from "lucide-react";
import Link from "next/link";

const levels = [
  {
    title: "Kindergarten",
    age: "3 - 6 Years",
    desc: "Focusing on social-emotional development and foundational literacy through play-based learning.",
    icon: <Palette className="w-8 h-8" />,
    link: "/academics/kindergarten",
    color: "bg-blue-500",
  },
  {
    title: "Primary School",
    age: "6 - 12 Years",
    desc: "Implementing the CBC framework to nurture core competencies and critical thinking skills.",
    icon: <BookOpen className="w-8 h-8" />,
    link: "/academics/primary",
    color: "bg-accent",
  },
  {
    title: "Junior Secondary",
    age: "12 - 15 Years",
    desc: "A transition stage focused on career pathways and advanced technical and academic skills.",
    icon: <GraduationCap className="w-8 h-8" />,
    link: "/academics/jss",
    color: "bg-primary",
  },
];

export default function AcademicsSection() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-accent font-black uppercase tracking-widest text-xs mb-4">
              Academic Excellence
            </h2>
            <p className="text-primary-dark text-4xl md:text-5xl font-black leading-tight">
              A World-Class Foundation for Every Stage of Growth.
            </p>
          </div>
          <p className="text-slate-500 max-w-sm mb-2 font-medium">
            Following the Kenya Competency Based Curriculum (CBC) with a global
            perspective.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {levels.map((level, i) => (
            <div
              key={i}
              className="group relative bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              {/* Icon & Age Tag */}
              <div className="flex justify-between items-start mb-8">
                <div
                  className={`${level.color} text-white p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {level.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                  {level.age}
                </span>
              </div>

              <h3 className="text-2xl font-black text-primary-dark mb-4">
                {level.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                {level.desc}
              </p>

              <Link
                href={level.link}
                className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all"
              >
                LEARN MORE <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Subtle background decoration */}
              <div className="absolute -bottom-2 -right-2 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
                {level.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
