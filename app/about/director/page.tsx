export default function DirectorMessage() {
  return (
    <main className="pt-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-5 gap-12">
        {/* Profile Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-[3/4] rounded-sm border-b-8 border-accent overflow-hidden grayscale hover:grayscale-0 transition-all">
            <img
              src="/director.jpg"
              className="w-full h-full object-cover"
              alt="Director"
            />
          </div>
          <div>
            <h3 className="text-2xl font-black text-primary-dark">
              Dr. Jane Kibali
            </h3>
            <p className="text-accent font-bold uppercase text-xs">
              Founder & Director
            </p>
          </div>
        </div>

        {/* The Message */}
        <div className="lg:col-span-3 prose prose-lg text-slate-700 max-w-none">
          <h2 className="text-primary text-4xl font-black mb-8 leading-tight">
            Empowering the Next Generation of Global Leaders
          </h2>
          <p>Dear Parents and Guardians,</p>
          <p>
            It is an honour to welcome you to Kibali. Our educational philosophy
            is rooted in the belief that children thrive when they are
            challenged intellectually and supported emotionally...
          </p>
          <div className="mt-12">
            <img
              src="/signature.png"
              alt="Signature"
              className="h-20 opacity-70"
            />
            <p className="font-bold text-primary-dark">Dr. Jane Kibali</p>
          </div>
        </div>
      </div>
    </main>
  );
}
