// app/news/[slug]/page.tsx
import { getNewsPost, getRelatedPosts } from "@/lib/services/news";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";

// ─── Portable text components ─────────────────────────────────────────────────

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-slate-600 text-lg leading-[1.85] mb-7">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-black text-primary-dark uppercase tracking-tight leading-tight mt-14 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-black text-primary-dark uppercase tracking-tight leading-tight mt-10 mb-4">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-accent pl-6 my-10">
        <p className="text-primary-dark text-xl md:text-2xl font-medium italic leading-relaxed">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="space-y-2 mb-7 pl-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="space-y-2 mb-7 pl-2 list-decimal list-inside">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3 text-slate-600 text-base leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-slate-600 text-base leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-black text-primary-dark">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-primary-dark/80">{children}</em>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent font-bold border-b border-accent/30 hover:border-accent transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-12 -mx-4 sm:mx-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={value.asset?.url || "/placeholder.jpg"}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-xs text-slate-400 font-medium uppercase tracking-wider mt-3">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    callout: ({ value }: any) => (
      <div className="my-10 p-7 bg-accent/5 border-l-2 border-accent">
        <p className="text-primary-dark font-bold text-base leading-relaxed">
          {value.text}
        </p>
      </div>
    ),
  },
};

// ─── Category colours ─────────────────────────────────────────────────────────

const categoryColor: Record<string, string> = {
  Academic: "bg-blue-50 text-blue-700 border-blue-100",
  Sports: "bg-amber-50 text-amber-700 border-amber-100",
  Arts: "bg-pink-50 text-pink-700 border-pink-100",
  Community: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) return {};
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.category, slug);
  const readTime = "4 min read"; // Sanity can compute this from body word count later

  return (
    <main className="bg-surface min-h-screen overflow-x-hidden">
      {/* ── Hero image ───────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[16/7] md:aspect-[16/6] bg-slate-100 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
      </div>

      {/* ── Article ──────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-12 relative z-10 pb-20 md:pb-28">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest hover:text-accent transition-colors mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All News
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-7">
          <span
            className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border ${categoryColor[post.category] || "bg-slate-50 text-slate-600 border-slate-100"}`}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
            <Clock className="w-3.5 h-3.5" />
            {readTime}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-primary-dark font-black uppercase tracking-tighter leading-[1.0] mb-8
          text-3xl sm:text-4xl md:text-5xl"
        >
          {post.title}
        </h1>

        {/* Standfirst */}
        <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium border-l-2 border-accent pl-5 mb-12">
          {post.excerpt}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-accent text-lg">✦</span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        {/* Body — Sanity portable text when available, excerpt fallback otherwise */}
        <article>
          {post.body ? (
            <PortableText value={post.body} components={ptComponents} />
          ) : (
            <p className="text-slate-600 text-lg leading-[1.85] mb-7">
              {post.excerpt}
            </p>
          )}
        </article>

        {/* Footer meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-14 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span
              className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border ${categoryColor[post.category] || "bg-slate-50 text-slate-600 border-slate-100"}`}
            >
              {post.category}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            {post.date}
          </span>
        </div>
      </div>

      {/* ── Related ──────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-slate-100 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-1 w-8 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
              <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                Related Stories
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/news/${p.slug}`}
                  className="group flex gap-5 items-start"
                >
                  <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-slate-100">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`inline-block text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 border mb-2 ${categoryColor[p.category] || ""}`}
                    >
                      {p.category}
                    </span>
                    <h4 className="font-black text-primary-dark text-sm uppercase tracking-tight leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                    <p className="text-slate-400 text-xs mt-1.5">{p.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-100 py-14 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-5">
          Kibali Educational Centre · Newsroom
        </p>
        <Link
          href="/news"
          className="inline-flex items-center gap-3 bg-primary-dark text-surface font-black text-xs uppercase tracking-widest px-10 py-4 rounded-sm hover:bg-accent hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All News
        </Link>
      </section>
    </main>
  );
}
