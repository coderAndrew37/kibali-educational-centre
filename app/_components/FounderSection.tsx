// components/FounderSection.tsx
export default function FounderSection() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Image with Overlay Card */}
        <div className="relative">
          {/* Main Photo */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border-8 border-background shadow-2xl">
            <img
              src="/founder.avif"
              alt="Founder of Kibali Educational Centre"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Mission Card - Using Accent Constant */}
          <div className="absolute -bottom-10 -right-6 md:right-10 bg-accent p-8 rounded-xl shadow-xl max-w-xs transition-transform hover:-translate-y-2">
            <h4 className="text-primary-dark font-black uppercase tracking-tighter mb-2">
              Our Mission
            </h4>
            <p className="text-primary-dark/90 font-medium leading-tight">
              To provide a nurturing environment where learners discover their
              gifts through CBC excellence.
            </p>
          </div>
        </div>

        {/* Right Column: Text Summary */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">
              Leadership
            </span>
          </div>

          <h2 className="text-primary-dark text-4xl md:text-5xl font-black leading-tight">
            Nurturing Potential Since 2010
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed">
            Welcome to{" "}
            <span className="text-primary font-bold">
              Kibali Educational Centre
            </span>
            . We understand that choosing a school is one of the most
            significant decisions a parent makes. Our approach is centered on
            the child, ensuring that academic rigour meets holistic development.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="border-l-4 border-primary pl-4">
              <h5 className="font-black text-primary-dark">Vision</h5>
              <p className="text-sm text-slate-500">
                To be a global center of academic and character excellence.
              </p>
            </div>
            <div className="border-l-4 border-accent pl-4">
              <h5 className="font-black text-primary-dark">Values</h5>
              <p className="text-sm text-slate-500">
                Integrity, Innovation, and Inclusivity.
              </p>
            </div>
          </div>

          <button className="mt-8 flex items-center gap-3 font-bold text-primary group">
            <span className="border-b-2 border-accent group-hover:border-primary transition-all">
              Read Director's Welcome
            </span>
            <span className="group-hover:translate-x-2 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
