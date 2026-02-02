import { Download, CreditCard, Info, CheckCircle } from "lucide-react";

export default function FeesPage() {
  const feeTiers = [
    { level: "Kindergarten", tuition: "45,000", frequency: "Per Term" },
    { level: "Primary (G1-G6)", tuition: "58,000", frequency: "Per Term" },
    { level: "Junior Secondary", tuition: "72,000", frequency: "Per Term" },
  ];

  return (
    <main className="bg-white min-h-screen pt-32">
      {/* 1. Header Section */}
      <section className="px-6 max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <h2 className="text-accent text-xs font-black uppercase tracking-[0.4em] mb-4">
              Investment
            </h2>
            <h1 className="text-primary-dark text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Fees & <br /> <span className="italic">Structure.</span>
            </h1>
          </div>
          <button className="flex items-center gap-3 bg-primary-dark text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-accent hover:text-primary-dark transition-all">
            Download PDF Schedule <Download size={16} />
          </button>
        </div>
      </section>

      {/* 2. Main Tuition Table */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {feeTiers.map((tier, i) => (
              <div
                key={i}
                className="p-12 text-center hover:bg-white transition-colors group"
              >
                <h3 className="text-slate-400 font-black uppercase text-xs tracking-[0.2em] mb-4">
                  {tier.level}
                </h3>
                <div className="text-primary-dark text-5xl font-black tracking-tighter mb-2">
                  <span className="text-xl align-top mr-1 font-bold">KES</span>
                  {tier.tuition}
                </div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">
                  {tier.frequency}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mandatory & Optional Extras */}
      <section className="px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 mb-32">
        {/* Mandatory One-Offs */}
        <div className="space-y-8">
          <h3 className="text-2xl font-black text-primary-dark uppercase tracking-tighter flex items-center gap-3">
            <Info className="text-accent" /> Admission Costs
          </h3>
          <div className="space-y-4">
            {[
              { label: "Application Fee (Non-refundable)", price: "2,000" },
              { label: "Registration Fee (One-off)", price: "10,000" },
              { label: "Caution Money (Refundable)", price: "5,000" },
              { label: "Student ID & Diary", price: "1,500" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm"
              >
                <span className="font-bold text-slate-600 text-sm uppercase">
                  {item.label}
                </span>
                <span className="font-black text-primary-dark">
                  KES {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Policy Card */}
        <div className="bg-primary-dark rounded-[3rem] p-12 text-surface">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 text-accent">
            Payment Policies
          </h3>
          <ul className="space-y-6 mb-10">
            <li className="flex gap-4 items-start">
              <CheckCircle className="text-accent shrink-0" size={20} />
              <p className="text-sm text-surface/70 leading-relaxed">
                Fees are due on or before the first day of each term.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <CheckCircle className="text-accent shrink-0" size={20} />
              <p className="text-sm text-surface/70 leading-relaxed">
                A 5% early-bird discount applies to tuition paid in full 14 days
                before the term starts.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <CheckCircle className="text-accent shrink-0" size={20} />
              <p className="text-sm text-surface/70 leading-relaxed">
                Sibling discounts: 10% for the second child and 15% for the
                third.
              </p>
            </li>
          </ul>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h4 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <CreditCard size={14} className="text-accent" /> Accepted Methods
            </h4>
            <p className="text-xs text-surface/50 leading-relaxed uppercase font-bold tracking-tight">
              M-Pesa Paybill • Bank Transfer • Banker's Cheque
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
