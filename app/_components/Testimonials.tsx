import { Testimonial } from "@/types";

interface Props {
  data: Testimonial[];
}

export default function Testimonials({ data }: Props) {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs">
            Testimonials
          </h2>
          <p className="text-primary-dark text-4xl md:text-5xl font-black">
            What Our Parents Say
          </p>
          <div className="h-1.5 w-20 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((t, i) => (
            <div
              key={i}
              className="bg-surface p-8 rounded-2xl border border-slate-100 shadow-sm relative group hover:shadow-xl transition-all"
            >
              {/* Quote Icon */}
              <div className="text-accent/20 text-6xl absolute top-4 right-8 font-serif">
                “
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-accent text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-slate-600 italic leading-relaxed mb-8 relative z-10">
                {t.content}
              </p>

              <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 overflow-hidden">
                  {t.imageUrl ? (
                    <img
                      src={t.imageUrl}
                      alt={t.parentName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary font-bold">
                      {t.parentName[0]}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-primary-dark font-bold">
                    {t.parentName}
                  </h4>
                  <p className="text-slate-400 text-xs uppercase tracking-widest">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
