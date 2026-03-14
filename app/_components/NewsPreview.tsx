// app/(website)/_components/NewsPreview.tsx
// Homepage section — shows latest 3 posts, links to /news

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNewsPosts } from "@/lib/services/news";

const categoryColor: Record<string, string> = {
  Academic: "bg-blue-50 text-blue-700 border-blue-100",
  Sports: "bg-amber-50 text-amber-700 border-amber-100",
  Arts: "bg-pink-50 text-pink-700 border-pink-100",
  Community: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export default async function NewsPreview() {
  const posts = await getNewsPosts();
  const preview = posts.slice(0, 3);

  if (!preview.length) return null;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
              <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                Newsroom
              </span>
            </div>
            <h2
              className="text-primary-dark font-black uppercase tracking-tighter leading-[1.0]
              text-3xl sm:text-4xl md:text-5xl"
            >
              Latest from <span className="text-accent">Kibali</span>
            </h2>
          </div>

          <Link
            href="/news"
            className="shrink-0 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-dark hover:text-accent transition-colors group"
          >
            All Stories
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {preview.map((post) => (
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
              <h3 className="font-black text-primary-dark uppercase tracking-tight leading-snug text-base md:text-lg group-hover:text-accent transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
