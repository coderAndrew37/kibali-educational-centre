import { HeartPulse, Music, Rocket, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudentLifePage() {
  const categories = [
    {
      title: "Sports & Athletics",
      icon: <Trophy size={32} />,
      desc: "From swimming to football, we focus on physical health and teamwork.",
      color: "bg-orange-500",
      size: "md:col-span-2",
    },
    {
      title: "The Arts",
      icon: <Music size={32} />,
      desc: "Music, dance, and drama are core to our creative expression.",
      color: "bg-purple-500",
      size: "md:col-span-1",
    },
    {
      title: "STEM & Robotics",
      icon: <Rocket size={32} />,
      desc: "Preparing students for the digital future with coding.",
      color: "bg-blue-500",
      size: "md:col-span-1",
    },
    {
      title: "Pastoral Care",
      icon: <HeartPulse size={32} />,
      desc: "Nurturing emotional and spiritual well-being.",
      color: "bg-rose-500",
      size: "md:col-span-2",
    },
  ];

  return (
    <main className="bg-white">
      {/* 1. HERO: The "Life at Kibali" Experience */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/student-life-hero.jpg"
            className="w-full h-full object-cover"
            alt="Students at Kibali"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            <span className="inline-block bg-accent text-primary-dark px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              The Kibali Experience
            </span>
            <h1 className="text-surface text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Character <br />
              <span className="text-accent underline decoration-4 underline-offset-8">
                Beyond
              </span>{" "}
              <br />
              Classroom.
            </h1>
            <p className="text-surface/90 text-xl md:text-2xl max-w-xl font-medium leading-relaxed">
              We don't just teach students; we nurture leaders, athletes, and
              artists through a vibrant ecosystem of co-curricular life.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PILLARS: Bento Grid Layout */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center align-middle mb-20">
          <h2 className="text-primary-dark text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            Four Pillars of <span className="text-accent">Growth.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`${cat.size} group relative overflow-hidden rounded-[3rem] p-10 bg-slate-50 border border-slate-100 hover:bg-primary-dark transition-all duration-500`}
            >
              <div
                className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform`}
              >
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black text-primary-dark group-hover:text-surface mb-4 uppercase tracking-tighter">
                {cat.title}
              </h3>
              <p className="text-slate-500 group-hover:text-surface/70 leading-relaxed font-medium">
                {cat.desc}
              </p>

              {/* Decorative Accent that appears on hover */}
              <ArrowRight
                className="absolute bottom-10 right-10 text-accent opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300"
                size={40}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3. CLUBS: Modern Visual Grid */}
      <section className="bg-primary-dark py-32 px-6 rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <p className="text-accent font-black uppercase tracking-[0.4em] text-xs">
                Uncover Talent
              </p>
              <h2 className="text-surface text-5xl md:text-7xl font-black uppercase tracking-tighter">
                Clubs & <br /> Societies.
              </h2>
            </div>
            <p className="text-surface/50 max-w-sm text-lg border-l border-surface/20 pl-8">
              Every Wednesday and Friday afternoon, our campus transforms into a
              hub of specialized learning and leadership development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured Item */}
            <div className="md:col-span-8 relative group rounded-[3rem] overflow-hidden h-[500px]">
              <img
                src="/robotics.jpg"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Robotics"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <h4 className="text-4xl font-black text-surface mb-2 uppercase italic tracking-tighter">
                  Robotics & AI Academy
                </h4>
                <p className="text-surface/80 max-w-md font-medium">
                  Preparing the next generation of engineers with hands-on drone
                  tech and coding.
                </p>
              </div>
            </div>

            {/* Sidebar Club Info */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="bg-accent rounded-[3rem] p-10 flex-1 flex flex-col justify-between">
                <Music size={48} className="text-primary-dark" />
                <div>
                  <h4 className="text-2xl font-black text-primary-dark uppercase leading-tight">
                    Orchestra & <br />
                    Music School
                  </h4>
                  <p className="text-primary-dark/70 text-sm mt-2 font-bold uppercase tracking-widest">
                    35+ Instruments Taught
                  </p>
                </div>
              </div>

              <div className="bg-surface/10 backdrop-blur-md rounded-[3rem] p-10 border border-surface/10 flex-1">
                <h4 className="text-surface text-xl font-black uppercase mb-4">
                  Other Societies
                </h4>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-bold text-surface/60 uppercase tracking-widest">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />{" "}
                    Debating
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />{" "}
                    Scouts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />{" "}
                    Drama
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />{" "}
                    Cookery
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />{" "}
                    French
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />{" "}
                    Chess
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
