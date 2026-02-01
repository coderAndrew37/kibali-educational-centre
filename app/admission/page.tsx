import {
  FileText,
  CreditCard,
  ClipboardCheck,
  CalendarDays,
} from "lucide-react";
import AdmissionForm from "@/app/_components/AdmissionForm"; // Your existing form

export default function AdmissionsPage() {
  const steps = [
    {
      icon: FileText,
      title: "1. Inquiry & Application",
      desc: "Submit the online form or visit our campus for a prospectus and application kit.",
    },
    {
      icon: ClipboardCheck,
      title: "2. Assessment",
      desc: "Learners undergo a friendly age-appropriate placement interview or entry assessment.",
    },
    {
      icon: CalendarDays,
      title: "3. Admission Offer",
      desc: "Successful applicants receive an offer letter within 48 hours of assessment.",
    },
    {
      icon: CreditCard,
      title: "4. Fee Payment",
      desc: "Secure the slot by paying the admission fee and submitting required documents.",
    },
  ];

  return (
    <main className="bg-[var(--kibali-bg)] pt-40 pb-24">
      {/* 1. Hero Header */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-[10px] uppercase tracking-[0.4em] text-[var(--kibali-amber)] font-bold mb-4">
          Join Our Community
        </h2>
        <h1 className="text-5xl md:text-7xl font-serif text-[var(--kibali-navy)] mb-8">
          Admissions <span className="italic text-slate-400">2026</span>
        </h1>
        <p className="text-slate-600 text-lg font-light max-w-2xl leading-relaxed">
          Kibali Educational Centre welcomes students of all backgrounds who are
          ready to embrace a rigorous CBC curriculum and a culture of integrity.
        </p>
      </section>

      {/* 2. The Process (The Roadmap) */}
      <section className="bg-white border-y border-slate-100 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-serif text-[var(--kibali-navy)] mb-12">
            The Enrollment Journey
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="space-y-4">
                <step.icon className="w-8 h-8 text-[var(--kibali-amber)]" />
                <h4 className="font-bold text-[var(--kibali-navy)] text-sm uppercase tracking-wider">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Fees & Requirements (Transparency Section) */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 mb-24">
        <div className="space-y-8">
          <h3 className="text-3xl font-serif text-[var(--kibali-navy)]">
            Requirements
          </h3>
          <div className="space-y-4">
            {[
              "Birth Certificate (Copy & Original for verification)",
              "Previous School Report Forms (Last 3 terms)",
              "NEMIS Number / UPI",
              "2 Passport size photos",
              "Immunization card (For Kindergarten entry)",
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 items-center text-slate-600 font-light"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--kibali-amber)]" />
                {item}
              </div>
            ))}
          </div>
          <div className="p-8 bg-[var(--kibali-navy)] text-white">
            <h4 className="text-[var(--kibali-amber)] uppercase text-xs font-bold tracking-widest mb-2">
              Notice
            </h4>
            <p className="text-sm font-light">
              Placement for January 2026 is currently at 85% capacity. We
              recommend early application for JSS levels.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-10 border border-slate-100 h-fit">
          <h3 className="text-xl font-serif text-[var(--kibali-navy)] mb-6">
            Fee Structure
          </h3>
          <p className="text-sm text-slate-500 mb-8 font-light">
            Click below to download the comprehensive 2026 fee structure
            including transport and meal plans.
          </p>
          <button className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 text-xs font-bold uppercase tracking-widest text-[var(--kibali-navy)] hover:border-[var(--kibali-amber)] transition-all w-full justify-center">
            Download 2026 Fee Structure (PDF)
          </button>
        </div>
      </section>

      {/* 4. The Form (Final Action) */}
      <section
        id="apply-now"
        className="max-w-7xl mx-auto px-6 pt-24 border-t border-slate-200"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[var(--kibali-navy)] mb-4">
            Begin Your Application
          </h2>
          <p className="text-slate-500 font-light">
            Please fill out the form below and our admissions office will
            contact you within 24 hours.
          </p>
        </div>
        <AdmissionForm />
      </section>
    </main>
  );
}
