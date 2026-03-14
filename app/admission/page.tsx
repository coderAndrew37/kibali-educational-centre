import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Wallet,
  CalendarRange,
  UserPlus,
} from "lucide-react";
import AdmissionForm from "../_components/AdmissionForm";
import PageHero from "../_components/PageHero";

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

export default function AdmissionsHub() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        image="/campus-1.jpg"
        eyebrow="Admissions 2026"
        title="Join the Community"
        accentWord="Community"
        tagline="Choosing a school is one of the most significant decisions you'll make. We've simplified our process to focus on what matters: your child's future."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "#" },
        ]}
        overlayOpacity={0.68}
        minHeight="60vh"
      />

      {/* ── Navigation cards ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-10 md:mb-12">
          <div className="h-1 w-10 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
          <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
            Where to Start
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link key={i} href={card.href} className="group">
                <div className="h-full flex flex-col p-8 md:p-10 bg-surface border border-slate-100 hover:bg-primary-dark hover:border-primary-dark transition-all duration-500">
                  <Icon
                    className="text-accent mb-6 shrink-0 group-hover:scale-110 transition-transform duration-300"
                    size={32}
                  />
                  <h3 className="text-lg md:text-xl font-black text-primary-dark group-hover:text-surface uppercase tracking-tighter mb-3 leading-tight transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 group-hover:text-surface/55 text-sm leading-relaxed mb-8 flex-1 transition-colors duration-300">
                    {card.desc}
                  </p>
                  <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                    {card.cta} <ArrowUpRight size={13} className="shrink-0" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Quick Apply ──────────────────────────────────────────────────── */}
      <section
        id="apply"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-surface border-t border-slate-100"
      >
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-accent text-xl">✦</span>
              <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                5-Minute Application
              </span>
              <span className="text-accent text-xl">✦</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-dark uppercase tracking-tighter leading-[1.05] mb-4">
              Ready to <span className="text-accent">Apply?</span>
            </h2>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              If you have all your documents ready, you can begin the online
              application now.
            </p>
          </div>

          <AdmissionForm />
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <section className="relative bg-primary-dark py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/10 blur-[80px]" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-accent font-black text-xs uppercase tracking-[0.3em] mb-2">
              Still Have Questions?
            </p>
            <h3 className="text-surface text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight">
              Talk to our Admissions Team
            </h3>
          </div>
          <Link
            href="/contact"
            className="shrink-0 flex items-center gap-3 bg-accent text-primary-dark px-8 py-4 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-surface transition-colors shadow-xl shadow-accent/20"
          >
            Contact Us <UserPlus size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
