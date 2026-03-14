import PageHero from "@/app/_components/PageHero";
import {
  ShieldCheck,
  Scale,
  Lock,
  Download,
  AlertTriangle,
} from "lucide-react";

const categories = [
  {
    title: "Safeguarding & Welfare",
    icon: ShieldCheck,
    policies: [
      {
        name: "Child Protection Policy",
        desc: "Our commitment to keeping every student safe from harm.",
      },
      {
        name: "Anti-Bullying Protocol",
        desc: "Zero-tolerance framework and disciplinary actions.",
      },
      {
        name: "Health & Safety Policy",
        desc: "Procedures for campus safety and emergency response.",
      },
    ],
  },
  {
    title: "Academic & Conduct",
    icon: Scale,
    policies: [
      {
        name: "Code of Conduct",
        desc: "Behavioral expectations for students and staff.",
      },
      {
        name: "Academic Integrity",
        desc: "Policy on original work and examination ethics.",
      },
      {
        name: "ICT & Digital Safety",
        desc: "Responsible use of technology and the internet.",
      },
    ],
  },
  {
    title: "Privacy & Legal",
    icon: Lock,
    policies: [
      {
        name: "Data Protection (GDPR)",
        desc: "How we handle and protect student and parent data.",
      },
      {
        name: "Admissions Policy",
        desc: "Criteria and transparency for student enrollment.",
      },
      {
        name: "Complaints Procedure",
        desc: "A formal pathway for resolving parental concerns.",
      },
    ],
  },
];

export default function PoliciesPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        image="/campus-1.jpg"
        eyebrow="Governance"
        title="Policies & Compliance"
        accentWord="Policies"
        tagline="Kibali operates under a framework of transparency and accountability — ensuring a safe, fair, and high-achieving environment for every learner."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Policies", href: "#" },
        ]}
        overlayOpacity={0.72}
        minHeight="55vh"
      />

      {/* ── Policy Library ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 max-w-7xl mx-auto space-y-16 md:space-y-24">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div key={i} className="space-y-8">
              {/* Category header */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 shrink-0 bg-accent flex items-center justify-center rounded-sm shadow-lg shadow-accent/20">
                  <Icon size={20} className="text-primary-dark" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-primary-dark uppercase tracking-tighter">
                  {cat.title}
                </h3>
              </div>

              {/* Policy cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {cat.policies.map((policy, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col justify-between p-6 md:p-8 bg-surface border border-slate-100 hover:bg-primary-dark hover:border-primary-dark transition-all duration-500"
                  >
                    <div>
                      <h4 className="text-base md:text-lg font-black text-primary-dark group-hover:text-accent uppercase tracking-tight mb-3 transition-colors leading-tight">
                        {policy.name}
                      </h4>
                      <p className="text-slate-500 group-hover:text-surface/50 text-sm leading-relaxed mb-8 transition-colors">
                        {policy.desc}
                      </p>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-surface transition-colors">
                      <Download size={13} className="text-accent shrink-0" />
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Safeguarding box ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 max-w-7xl mx-auto">
        <div className="relative bg-primary-dark overflow-hidden">
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Amber glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/10 blur-[80px]" />

          <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
              {/* Left copy */}
              <div className="w-full lg:w-1/2 space-y-6">
                {/* Eyebrow — matches site pattern */}
                <div className="inline-block px-5 py-2 bg-accent/10 border-y border-accent/30">
                  <span className="flex items-center gap-2 text-accent font-black text-[10px] uppercase tracking-[0.3em]">
                    <AlertTriangle size={13} />
                    Priority Notice
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-surface uppercase tracking-tighter leading-[1.05]">
                  Safeguarding is Our{" "}
                  <span className="text-accent">Top Priority</span>
                </h2>

                <p className="text-surface/60 leading-relaxed text-base md:text-lg border-l-2 border-accent/40 pl-5">
                  If you have a concern regarding a child's welfare or a breach
                  of conduct, please use our confidential reporting channel.
                  Every report is handled with absolute discretion and speed.
                </p>
              </div>

              {/* Right contact cards */}
              <div className="w-full lg:w-1/2 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="p-6 md:p-8 border border-white/10 bg-white/5">
                  <span className="block text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-3">
                    Confidential Email
                  </span>
                  <span className="text-lg md:text-xl font-bold font-mono text-surface break-all">
                    safeguarding@kibali.ac.ke
                  </span>
                </div>
                <div className="p-6 md:p-8 border border-white/10 bg-white/5">
                  <span className="block text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-3">
                    Anonymous Hotline
                  </span>
                  <span className="text-lg md:text-xl font-bold font-mono text-surface">
                    +254 7XX XXX XXX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
