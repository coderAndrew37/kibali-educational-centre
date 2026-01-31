// components/CTA.tsx
export default function CTA() {
  return (
    <section className="mx-6 my-20">
      <div className="max-w-7xl mx-auto bg-primary rounded-3xl p-12 md:p-20 relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-surface text-3xl md:text-5xl font-bold mb-4">
              Ready to join the Kibali family?
            </h2>
            <p className="text-surface/80 text-lg">
              Admissions for the 2026 Academic Year are now open.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-accent text-primary-dark font-black px-10 py-4 rounded-lg hover:scale-105 transition-transform">
              ENROLL NOW
            </button>
            <button className="border border-surface/30 text-surface font-bold px-10 py-4 rounded-lg hover:bg-surface/10 transition-colors">
              BOOK A TOUR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
