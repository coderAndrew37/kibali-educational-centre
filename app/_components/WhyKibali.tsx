// components/WhyKibali.tsx
export default function WhyKibali() {
  const features = [
    {
      title: "Holistic CBC Integration",
      desc: "We go beyond textbooks, focusing on competency-based learning that identifies and nurtures every child's unique talent.",
      icon: "📚",
    },
    {
      title: "Digital-First Campus",
      desc: "Our students are tech-savvy from a young age, utilizing modern labs and digital tools to prepare for a tech-driven world.",
      icon: "💻",
    },
    {
      title: "Values-Based Education",
      desc: "Character is as important as grades. We instill discipline, integrity, and social responsibility in all our learners.",
      icon: "🌟",
    },
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-black uppercase tracking-[0.2em] mb-4">
            Why Kibali
          </h2>
          <p className="text-primary-dark text-4xl md:text-5xl font-extrabold">
            A Foundation for Success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface p-10 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-6">{f.icon}</div>
              <h3 className="text-primary-dark text-xl font-bold mb-4">
                {f.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
