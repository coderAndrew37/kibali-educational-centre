import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { newsPosts } from "../data/news";

export default function NewsCenter() {
  const featured = newsPosts.find((p) => p.featured);
  const regularPosts = newsPosts.filter((p) => !p.featured);

  return (
    <main className="bg-[var(--kibali-bg)] pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-[var(--kibali-amber)] font-bold mb-4">
            Newsroom
          </h2>
          <h1 className="text-5xl md:text-6xl font-serif text-[var(--kibali-navy)]">
            Inside <span className="italic text-slate-400">Kibali</span>
          </h1>
        </header>

        {/* 1. Featured Article (Editorial Hero) */}
        {featured && (
          <Link
            href={`/news/${featured.slug}`}
            className="group relative grid lg:grid-cols-2 gap-12 mb-24 items-center"
          >
            <div className="relative h-[400px] md:h-[500px] bg-slate-200 overflow-hidden">
              <div className="absolute inset-0 bg-[var(--kibali-navy)]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <div className="h-full w-full bg-slate-300 flex items-center justify-center text-slate-400">
                Image: {featured.title}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-[var(--kibali-amber)]">
                <span>{featured.category}</span>
                <span className="w-8 h-px bg-slate-200" />
                <span className="text-slate-400">{featured.date}</span>
              </div>
              <h3 className="text-4xl font-serif text-[var(--kibali-navy)] group-hover:text-[var(--kibali-amber)] transition-colors duration-300 leading-tight">
                {featured.title}
              </h3>
              <p className="text-slate-600 font-light leading-relaxed text-lg">
                {featured.excerpt}
              </p>
              <div className="pt-4 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[var(--kibali-navy)]">
                Read Full Story{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        )}

        {/* 2. Regular News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {regularPosts.map((post) => (
            <Link
              key={`${post.id}-${post.slug}`}
              href={`/news/${post.slug}`}
              className="group space-y-6"
            >
              <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-[var(--kibali-navy)]/5 group-hover:bg-transparent transition-colors z-10" />
                <div className="h-full w-full bg-slate-300 flex items-center justify-center text-slate-400 text-xs">
                  Thumbnail
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[9px] uppercase font-bold tracking-widest">
                  <span className="text-[var(--kibali-amber)]">
                    {post.category}
                  </span>
                  <span className="text-slate-400">{post.date}</span>
                </div>
                <h4 className="text-xl font-serif text-[var(--kibali-navy)] leading-snug group-hover:underline underline-offset-4 decoration-slate-200">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        {/* 3. Newsletter / Press Subscription */}
        <section className="mt-32 p-12 bg-[var(--kibali-navy)] text-white text-center">
          <h3 className="text-2xl font-serif mb-4 text-[var(--kibali-amber)]">
            Join the Kibali Weekly
          </h3>
          <p className="text-white/60 font-light text-sm mb-8 max-w-lg mx-auto italic">
            Subscribe to receive internal announcements, curriculum updates, and
            institutional milestones.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="email@kibali.ac.ke"
              className="flex-1 bg-white/10 border-b border-white/20 px-4 text-sm focus:outline-none"
            />
            <button className="px-8 py-3 bg-[var(--kibali-amber)] text-[var(--kibali-dark)] text-[10px] font-bold uppercase tracking-widest">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
