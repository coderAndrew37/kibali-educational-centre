"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  /** Full-bleed background image path */
  image: string;
  /** Small uppercase label above the title */
  eyebrow?: string;
  /** Main heading — supports a highlighted word via `accentWord` */
  title: string;
  /** Word inside `title` to render in accent colour. Must match exactly. */
  accentWord?: string;
  /** Subheading / tagline shown below the title */
  tagline?: string;
  /** Breadcrumb trail rendered at the bottom-left */
  breadcrumbs?: Breadcrumb[];
  /** Overlay opacity 0–1. Default 0.65 */
  overlayOpacity?: number;
  /** Where to position the background image. Default "center" */
  imagePosition?: string;
  /** Minimum section height. Default "100vh" */
  minHeight?: string;
}

/**
 * PageHero
 * --------
 * Full-bleed hero with a background image, dark overlay, and the Kibali
 * design-system typography (eyebrow pill → giant uppercase title → tagline
 * with left-accent-border → breadcrumbs). Drop-in replacement for any
 * page-level hero across the site.
 *
 * Usage:
 *   <PageHero
 *     image="/student-life-hero.jpg"
 *     eyebrow="Student Life"
 *     title="Boarding Life"
 *     accentWord="Boarding"
 *     tagline="A home away from home…"
 *     breadcrumbs={[
 *       { label: "Home", href: "/" },
 *       { label: "Student Life", href: "/student-life" },
 *       { label: "Boarding", href: "#" },
 *     ]}
 *   />
 */
export default function PageHero({
  image,
  eyebrow,
  title,
  accentWord,
  tagline,
  breadcrumbs,
  overlayOpacity = 0.65,
  imagePosition = "center",
  minHeight = "100vh",
}: PageHeroProps) {
  // Split title so we can colour one word without dangerouslySetInnerHTML
  const renderTitle = () => {
    if (!accentWord) return title;
    const parts = title.split(new RegExp(`(${accentWord})`, "i"));
    return parts.map((part, i) =>
      part.toLowerCase() === accentWord.toLowerCase() ? (
        <span key={i} className="text-accent">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight }}
    >
      {/* ── Background image ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: imagePosition,
        }}
      />

      {/* ── Overlay ───────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] bg-primary-dark"
        style={{ opacity: overlayOpacity }}
      />

      {/* Radial vignette — matches HeroSlider */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(circle, transparent 20%, var(--color-primary-dark) 120%)",
          opacity: 0.5,
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-7 max-w-4xl"
        >
          {/* Eyebrow — matches HeroSlider pill */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-block px-6 py-2 bg-accent/10 border-y border-accent/30 backdrop-blur-sm"
            >
              <span className="text-accent font-black tracking-[0.3em] text-xs uppercase">
                {eyebrow}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-surface text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.0] drop-shadow-2xl"
          >
            {renderTitle()}
          </motion.h1>

          {/* Tagline — left accent border matches ServicePage */}
          {tagline && (
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-surface/80 text-lg md:text-xl font-medium border-l-2 border-accent pl-6 max-w-2xl leading-relaxed"
            >
              {tagline}
            </motion.p>
          )}

          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-surface/40 text-xs font-black uppercase tracking-widest pt-4"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-2">
                  {i < breadcrumbs.length - 1 ? (
                    <>
                      <Link
                        href={crumb.href}
                        className="hover:text-accent transition-colors duration-200"
                      >
                        {crumb.label}
                      </Link>
                      <span className="text-surface/20">/</span>
                    </>
                  ) : (
                    <span className="text-accent">{crumb.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}
        </motion.div>
      </div>

      {/* ── Bottom fade into page body ─────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[5] bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
