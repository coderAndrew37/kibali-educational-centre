import {
  ShieldCheck,
  Scale,
  Lock,
  Eye,
  FileText,
  Download,
  AlertTriangle,
} from "lucide-react";

export default function PoliciesPage() {
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

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      {/* 1. HEADER */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="max-w-3xl">
          <h2 className="text-accent text-xs font-black uppercase tracking-[0.4em] mb-4">
            Governance
          </h2>
          <h1 className="text-primary-dark text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Policies & <br />{" "}
            <span className="italic text-slate-300">Governance.</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium leading-relaxed border-l-4 border-accent pl-8">
            Kibali Educational Centre operates under a framework of transparency
            and accountability. Our policies ensure a safe, fair, and
            high-achieving environment for every learner.
          </p>
        </div>
      </section>

      {/* 2. THE POLICY LIBRARY */}
      <section className="px-6 max-w-7xl mx-auto space-y-24 mb-32">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-accent">
                <cat.icon size={28} />
              </div>
              <h3 className="text-3xl font-black text-primary-dark uppercase tracking-tighter">
                {cat.title}
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {cat.policies.map((policy, idx) => (
                <div
                  key={idx}
                  className="group p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-primary-dark transition-all duration-500 flex flex-col justify-between h-full"
                >
                  <div>
                    <h4 className="text-xl font-black text-primary-dark group-hover:text-accent uppercase tracking-tighter mb-4 transition-colors">
                      {policy.name}
                    </h4>
                    <p className="text-slate-500 group-hover:text-surface/60 text-sm font-medium leading-relaxed mb-8">
                      {policy.desc}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-dark group-hover:text-surface">
                    <Download size={14} className="text-accent" /> Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 3. REPORTING & SAFEGUARDING BOX */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="bg-primary-dark rounded-[4rem] p-12 md:p-20 text-surface relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 text-accent bg-accent/10 px-4 py-2 rounded-full">
                <AlertTriangle size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Priority Notice
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                Safeguarding is <br /> our{" "}
                <span className="text-accent">Top Priority.</span>
              </h2>
              <p className="text-surface/60 font-medium leading-relaxed">
                If you have a concern regarding a child's welfare or a breach of
                conduct, please use our confidential reporting channel. Every
                report is handled with absolute discretion and speed.
              </p>
            </div>

            <div className="lg:w-1/2 w-full grid gap-4">
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                <span className="block text-accent font-black text-[10px] uppercase tracking-widest mb-2">
                  Confidential Email
                </span>
                <span className="text-xl md:text-2xl font-bold font-mono">
                  safeguarding@kibali.ac.ke
                </span>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                <span className="block text-accent font-black text-[10px] uppercase tracking-widest mb-2">
                  Anonymous Hotline
                </span>
                <span className="text-xl md:text-2xl font-bold font-mono">
                  +254 7XX XXX XXX
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
