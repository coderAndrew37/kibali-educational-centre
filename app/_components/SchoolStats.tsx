export function SchoolStats() {
  const stats = [
    { label: "Transition Rate", value: "100%" },
    { label: "Student-Teacher Ratio", value: "15:1" },
    { label: "Extra-Curriculars", value: "25+" },
    { label: "Founded", value: "2010" },
  ];

  return (
    <section className="bg-primary py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center border-r border-surface/10 last:border-0"
          >
            <h3 className="text-4xl md:text-5xl font-black text-accent mb-2">
              {stat.value}
            </h3>
            <p className="text-surface/70 uppercase tracking-widest text-xs font-bold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
