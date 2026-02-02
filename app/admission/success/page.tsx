import Link from "next/link";
import {
  CheckCircle,
  Calendar,
  Mail,
  PhoneCall,
  ArrowRight,
  Download,
} from "lucide-react";

export default function AdmissionSuccess() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center pt-20 pb-12 px-6">
      <div className="max-w-4xl w-full">
        {/* 1. CELEBRATORY HEADER */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-4 animate-bounce">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          <h1 className="text-primary-dark text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Application <br />{" "}
            <span className="text-accent italic">Received.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
            Thank you for choosing Kibali Educational Centre. Your journey
            toward academic excellence has officially begun.
          </p>
        </div>

        {/* 2. WHAT HAPPENS NEXT? (Immediate Roadmap) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
            <h3 className="text-xl font-black text-primary-dark uppercase tracking-tighter mb-6 flex items-center gap-3">
              <Mail className="text-accent" /> Check Your Inbox
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We have sent a confirmation email to the address provided. It
              contains your <strong>Application Reference Number</strong> and a
              copy of your submitted details.
            </p>
          </div>

          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
            <h3 className="text-xl font-black text-primary-dark uppercase tracking-tighter mb-6 flex items-center gap-3">
              <Calendar className="text-accent" /> Next 24-48 Hours
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Our Admissions Officer will review your application and contact
              you to schedule a <strong>Campus Tour</strong> and{" "}
              <strong>Student Assessment</strong>.
            </p>
          </div>
        </div>

        {/* 3. WHILE YOU WAIT (Engagement) */}
        <div className="bg-primary-dark rounded-[3rem] p-10 md:p-16 text-surface relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <h4 className="text-2xl font-black uppercase tracking-tighter">
                Prepare for the Visit
              </h4>
              <p className="text-surface/60 text-sm font-medium max-w-md">
                Review our checklist once more to ensure you have all physical
                documents ready for your assessment day.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                href="/admission/requirements"
                className="flex items-center justify-center gap-3 bg-accent text-primary-dark px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
              >
                View Checklist <ArrowRight size={16} />
              </Link>
              <button className="flex items-center justify-center gap-3 bg-white/10 text-surface px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                Download Brochure <Download size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 4. EMERGENCY CONTACT */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Urgent Inquiry?
          </p>
          <div className="flex items-center justify-center gap-6 text-primary-dark font-black">
            <a
              href="tel:+254700000000"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <PhoneCall size={18} /> +254 700 000 000
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
