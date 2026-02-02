import {
  FileCheck,
  Camera,
  UserCircle,
  HeartPulse,
  Download,
  AlertCircle,
} from "lucide-react";

export default function AdmissionRequirements() {
  const documentGroups = [
    {
      group: "Identity & Personal",
      items: [
        {
          name: "Birth Certificate",
          detail: "Original for verification and 2 clear photocopies.",
          icon: FileCheck,
        },
        {
          name: "Passport Photos",
          detail: "2 recent color passport-sized photos of the student.",
          icon: Camera,
        },
        {
          name: "NEMIS / UPI Number",
          detail: "Unique Personal Identifier from the previous school.",
          icon: UserCircle,
        },
      ],
    },
    {
      group: "Academic History",
      items: [
        {
          name: "Previous School Reports",
          detail: "Certified copies for the last 3 consecutive terms.",
          icon: FileCheck,
        },
        {
          name: "Leaving Certificate",
          detail: "Required for students joining from Grade 2 and above.",
          icon: FileCheck,
        },
      ],
    },
    {
      group: "Health & Wellbeing",
      items: [
        {
          name: "Immunization Card",
          detail: "Mandatory for Kindergarten & Lower Primary entry.",
          icon: HeartPulse,
        },
        {
          name: "Medical Form",
          detail:
            "Completed by a certified practitioner (download template below).",
          icon: HeartPulse,
        },
      ],
    },
  ];

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      {/* 1. Page Header */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="max-w-3xl">
          <h2 className="text-accent text-xs font-black uppercase tracking-[0.4em] mb-4">
            Preparation
          </h2>
          <h1 className="text-primary-dark text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight mb-6">
            Document <br /> <span className="italic">Checklist.</span>
          </h1>
          <p className="text-slate-600 text-lg font-medium border-l-4 border-accent pl-8">
            To ensure a seamless enrollment process, please have the following
            original documents and copies ready for submission.
          </p>
        </div>
      </section>

      {/* 2. Organized Requirements Grid */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {documentGroups.map((group, idx) => (
            <div key={idx} className="space-y-8">
              <h3 className="text-xl font-black text-primary-dark uppercase tracking-tighter border-b border-slate-100 pb-4">
                {group.group}
              </h3>
              <div className="space-y-6">
                {group.items.map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                      <item.icon className="w-5 h-5 text-primary-dark" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-dark text-sm uppercase tracking-tight mb-1">
                        {item.name}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed font-medium">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. International Student Notice */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
          <div className="p-5 bg-accent rounded-full shrink-0">
            <AlertCircle size={40} className="text-primary-dark" />
          </div>
          <div className="space-y-4">
            <h3 className="text-surface text-2xl font-black uppercase tracking-tighter">
              International Applicants
            </h3>
            <p className="text-surface/60 text-sm font-medium leading-relaxed max-w-2xl">
              Students transferring from schools outside Kenya must provide a
              certificate of equivalence from the Kenya National Examinations
              Council (KNEC) and valid student immigration permits where
              applicable.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Downloadable Forms */}
      <section className="px-6 max-w-7xl mx-auto">
        <h3 className="text-center text-primary-dark text-3xl font-black uppercase tracking-tighter mb-12">
          Templates & Downloads
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <button className="flex items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-accent transition-all">
            <div className="text-left">
              <span className="block text-[10px] font-black text-accent uppercase tracking-widest mb-1">
                Standard Form
              </span>
              <span className="font-bold text-primary-dark text-lg uppercase tracking-tight">
                Student Medical Report
              </span>
            </div>
            <Download className="text-slate-300 group-hover:text-accent transition-colors" />
          </button>

          <button className="flex items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-accent transition-all">
            <div className="text-left">
              <span className="block text-[10px] font-black text-accent uppercase tracking-widest mb-1">
                CBC Transition
              </span>
              <span className="font-bold text-primary-dark text-lg uppercase tracking-tight">
                Transfer Request Form
              </span>
            </div>
            <Download className="text-slate-300 group-hover:text-accent transition-colors" />
          </button>
        </div>
      </section>
    </main>
  );
}
