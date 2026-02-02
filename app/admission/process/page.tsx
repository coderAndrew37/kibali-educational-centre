import {
  Search,
  MapPin,
  FileCheck,
  MessageSquare,
  Sparkles,
  Backpack,
} from "lucide-react";
import Link from "next/link";

export default function AdmissionProcess() {
  const steps = [
    {
      title: "Inquiry & Discovery",
      desc: "Fill out our online inquiry form or call our admissions office. We'll send you a digital prospectus and invite you for a personal consultation.",
      icon: Search,
    },
    {
      title: "Campus Experience",
      desc: "Visit our facilities. Meet the faculty and see our learners in action. We believe the 'feel' of the campus is the best way to decide.",
      icon: MapPin,
    },
    {
      title: "Learner Assessment",
      desc: "For Primary and JSS, learners undergo a friendly assessment to identify their academic level and potential talents.",
      icon: MessageSquare,
    },
    {
      title: "Offer of Admission",
      desc: "Successful applicants receive an official offer letter via email within 48 hours of their assessment.",
      icon: FileCheck,
    },
    {
      title: "Securing the Slot",
      desc: "Submit the required documents and pay the admission fee to finalize the enrollment and secure your child's place.",
      icon: Sparkles,
    },
    {
      title: "The First Day",
      desc: "Welcome to the Kibali family! You'll receive an orientation pack, uniform list, and transport details.",
      icon: Backpack,
    },
  ];

  return (
    <main className="bg-white min-h-screen pt-32">
      {/* 1. Page Header */}
      <section className="px-6 max-w-7xl mx-auto mb-20 text-center">
        <h2 className="text-accent text-xs font-black uppercase tracking-[0.4em] mb-4">
          The Roadmap
        </h2>
        <h1 className="text-primary-dark text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          How to <br /> <span className="italic">Join Us.</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          Our admission process is designed to be transparent, welcoming, and
          thorough, ensuring we are the right fit for your child's aspirations.
        </p>
      </section>

      {/* 2. Interactive Timeline */}
      <section className="px-6 max-w-5xl mx-auto pb-32">
        <div className="relative border-l-2 border-slate-100 ml-6 md:ml-12 space-y-16 py-10">
          {steps.map((step, i) => (
            <div key={i} className="relative pl-12 md:pl-20 group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[26px] top-0 w-12 h-12 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500 shadow-sm">
                <step.icon className="w-5 h-5 text-primary-dark group-hover:scale-110 transition-transform" />
              </div>

              {/* Step Content */}
              <div className="space-y-3">
                <span className="text-accent font-black text-xs uppercase tracking-widest">
                  Stage 0{i + 1}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-primary-dark uppercase tracking-tighter leading-none">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Visual Aid: The Flowchart */}
      <section className="bg-slate-50 py-24 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-black text-primary-dark uppercase tracking-tighter mb-12">
            Process Visualization
          </h3>
          <div className="max-w-4xl mx-auto p-4 bg-white rounded-[3rem] shadow-xl"></div>
        </div>
      </section>

      {/* 4. Support CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-primary-dark p-12 md:p-20 rounded-[4rem] text-surface overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">
              Need Assistance?
            </h3>
            <p className="text-surface/70 font-medium mb-10 uppercase tracking-tight text-sm">
              Our admissions officer is available Monday - Friday, 8:00 AM to
              4:30 PM.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="tel:+254700000000"
                className="bg-accent text-primary-dark px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Call: +254 700 000 000
              </Link>
              <Link
                href="/tour"
                className="bg-white/10 border border-white/20 text-surface px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                Book a School Tour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
