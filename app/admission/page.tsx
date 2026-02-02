import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Wallet,
  CalendarRange,
  UserPlus,
} from "lucide-react";
import AdmissionForm from "../_components/AdmissionForm";

export default function AdmissionsHub() {
  const cards = [
    {
      title: "Enrollment Process",
      desc: "A step-by-step guide to our entry assessments and onboarding.",
      href: "/admission/process",
      icon: CalendarRange,
      cta: "View the Roadmap",
    },
    {
      title: "Fees & Investment",
      desc: "Transparent tuition, transport, and meal plan structures for 2026.",
      href: "/admission/fees",
      icon: Wallet,
      cta: "View Fee Schedule",
    },
    {
      title: "Required Documents",
      desc: "Everything you need to have ready for a successful application.",
      href: "/admission/requirements",
      icon: ShieldCheck,
      cta: "Checklist",
    },
  ];

  return (
    <main className="bg-white min-h-screen pt-32">
      {/* Hero */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-primary-dark rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-surface text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
              Join the <br /> <span className="text-accent">Community.</span>
            </h1>
            <p className="text-surface/70 text-xl font-medium mb-10">
              Choosing a school is one of the most significant decisions you'll
              make. We've simplified our process to focus on what matters: your
              child's future.
            </p>
            <Link
              href="#apply"
              className="inline-flex items-center gap-4 bg-accent text-primary-dark px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
            >
              Start Application <UserPlus size={18} />
            </Link>
          </div>
          {/* Decorative Background Pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Navigation Grid */}
      <section className="px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-32">
        {cards.map((card, i) => (
          <Link key={i} href={card.href} className="group">
            <div className="h-full p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-primary-dark transition-all duration-500">
              <card.icon
                className="text-accent mb-6 group-hover:scale-110 transition-transform"
                size={40}
              />
              <h3 className="text-2xl font-black text-primary-dark group-hover:text-surface uppercase tracking-tighter mb-4">
                {card.title}
              </h3>
              <p className="text-slate-500 group-hover:text-surface/60 mb-8 font-medium">
                {card.desc}
              </p>
              <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                {card.cta} <ArrowUpRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Quick Apply Section */}
      <section
        id="apply"
        className="bg-slate-50 py-24 px-6 border-t border-slate-200"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-primary-dark uppercase tracking-tighter mb-6">
            Ready to apply?
          </h2>
          <p className="text-slate-500 mb-12 font-medium">
            If you have all your documents ready, you can begin the 5-minute
            online application now.
          </p>

          <AdmissionForm />
        </div>
      </section>
    </main>
  );
}
