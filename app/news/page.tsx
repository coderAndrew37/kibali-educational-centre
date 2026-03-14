// app/news/page.tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getNewsPosts } from "@/lib/services/news";
import PageHero from "../_components/PageHero";

const categoryColor: Record<string, string> = {
  Academic: "bg-blue-50 text-blue-700 border-blue-100",
  Sports: "bg-amber-50 text-amber-700 border-amber-100",
  Arts: "bg-pink-50 text-pink-700 border-pink-100",
  Community: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

// async — fetches from Sanity, falls back to static data if unavailable
export default async function NewsCenter() {
  const posts = await getNewsPosts();
  const featured = posts.find((p) => p.featured);
  const regular = posts.filter((p) => !p.featured);

  return (
    <main className="bg-surface min-h-screen overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        image="/campus-1.jpg"
        eyebrow="Newsroom"
        title="Inside Kibali"
        accentWord="Kibali"
        tagline="Stories, milestones, and updates from across our campuses."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "#" },
        ]}
        overlayOpacity={0.65}
        minHeight="45vh"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Featured article ─────────────────────────────────────────────── */}
        {featured && (
          <Link
            href={`/news/${featured.slug}`}
            className="group grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20 md:mb-28"
          >
            {/* Image */}
            <div className="relative h-64 sm:h-80 md:h-[420px] overflow-hidden bg-slate-100">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-5 left-5 z-10 inline-block px-4 py-2 bg-accent/10 border-y border-accent/30 backdrop-blur-sm">
                <span className="text-accent font-black tracking-[0.3em] text-[10px] uppercase">
                  Featured
                </span>
              </div>
            </div>

            {/* Copy */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border ${categoryColor[featured.category] || ""}`}
                >
                  {featured.category}
                </span>
                <span className="text-slate-400 text-xs font-bold">
                  {featured.date}
                </span>
              </div>

              <h2
                className="text-primary-dark font-black uppercase tracking-tighter leading-[1.0] group-hover:text-accent transition-colors
                text-2xl sm:text-3xl md:text-4xl"
              >
                {featured.title}
              </h2>

              <p className="text-slate-500 leading-relaxed text-base md:text-lg border-l-2 border-accent pl-4">
                {featured.excerpt}
              </p>

              <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-primary-dark group-hover:text-accent transition-colors pt-2">
                Read Full Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        )}

        {/* Divider */}
        {featured && regular.length > 0 && (
          <div className="flex items-center gap-4 mb-14">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              More Stories
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>
        )}

        {/* ── Regular grid ─────────────────────────────────────────────────── */}
        {regular.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {regular.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 mb-5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 border ${categoryColor[post.category] || ""}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">
                    {post.date}
                  </span>
                </div>

                <h3
                  className="font-black text-primary-dark uppercase tracking-tight leading-snug
                  text-base md:text-lg group-hover:text-accent transition-colors"
                >
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        )}

        {/* ── Newsletter ───────────────────────────────────────────────────── */}
        <section className="mt-20 md:mt-28 relative bg-primary-dark overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-accent/10 blur-[80px]" />

          <div className="relative z-10 px-8 sm:px-12 md:px-16 py-12 md:py-14 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div>
              <div className="inline-block px-5 py-2 bg-accent/10 border-y border-accent/30 mb-4">
                <span className="text-accent font-black tracking-[0.3em] text-[10px] uppercase">
                  Kibali Weekly
                </span>
              </div>
              <p className="text-surface/55 text-sm leading-relaxed max-w-xs">
                Subscribe for curriculum updates, campus milestones, and event
                announcements.
              </p>
            </div>

            <form className="flex w-full sm:w-auto gap-px shrink-0">
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full sm:w-56 bg-white/5 border border-white/10 px-4 py-3 text-sm text-surface placeholder:text-surface/30 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="shrink-0 bg-accent text-primary-dark px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-surface transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
