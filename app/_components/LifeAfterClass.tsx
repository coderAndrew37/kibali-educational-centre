import { Rocket, CalendarDays, MessageSquareQuote } from "lucide-react";

export default function LifeAfterClass() {
  const sections = [
    {
      title: "Clubs & Societies",
      icon: <Rocket className="text-accent" />,
      items: [
        "Coding & Robotics",
        "Music & Orchestral",
        "Chess Club",
        "Debate & Public Speaking",
      ],
      description:
        "Nurturing talents beyond the curriculum every Tuesday and Thursday afternoon.",
    },
    {
      title: "Assessment Calendar",
      icon: <CalendarDays className="text-accent" />,
      items: [
        "Termly Formative Exams",
        "Monthly Progress Checks",
        "End of Year Summative",
      ],
      description:
        "A predictable and stress-free evaluation cycle aligned with CBC standards.",
    },
    {
      title: "Communication",
      icon: <MessageSquareQuote className="text-accent" />,
      items: [
        "Real-time Portal Updates",
        "Bi-termly Parent Meetings",
        "Direct Teacher Access",
      ],
      description:
        "Stay in the loop with our digital ecosystem designed for transparent feedback.",
    },
  ];

  return (
    <section className="py-20 bg-primary-dark text-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 border-l-4 border-accent pl-6">
          <h3 className="text-3xl font-black uppercase tracking-tighter">
            Life After Class
          </h3>
          <p className="text-surface/60 font-medium">
            Developing character and competence beyond the books.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6 group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface/10 rounded-xl group-hover:bg-accent group-hover:text-primary-dark transition-colors">
                  {section.icon}
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight">
                  {section.title}
                </h4>
              </div>

              <p className="text-surface/70 leading-relaxed text-sm">
                {section.description}
              </p>

              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm font-semibold text-accent/90"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
