"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const footerLinks = {
  Institute: [
    { name: "Our Story", path: "/about/story" },
    { name: "The Director", path: "/about/director" },
    { name: "Academic Team", path: "/about/team" },
    { name: "Careers", path: "/careers" },
  ],
  Admissions: [
    { name: "Enroll Now", path: "/admission" },
    { name: "School Calendar", path: "/calendar" },
    { name: "FAQ", path: "/frequently-asked-questions" },
    { name: "Gallery", path: "/gallery" },
  ],
  Portals: [
    { name: "Parent Portal", path: "/portals/parents/sign-in" },
    { name: "Staff Portal", path: "/portals/staff/sign-in" },
    { name: "Student Portal", path: "/portals/student/sign-in" },
  ],
};

const socials = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-primary-dark overflow-hidden">
      {/* ── Newsletter band ──────────────────────────────────────────────── */}
      <div className="relative border-b border-white/10 overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/10 blur-[80px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-7">
            <div>
              <div className="inline-block px-5 py-2 bg-accent/10 border-y border-accent/30 mb-4">
                <span className="text-accent font-black tracking-[0.3em] text-[10px] uppercase">
                  Institutional Updates
                </span>
              </div>
              <p className="text-surface/50 text-sm leading-relaxed max-w-xs">
                Join our community for academic insights and school news.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full sm:w-auto gap-px"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full sm:w-64 bg-white/5 border border-white/10 px-4 py-3 text-sm text-surface placeholder:text-surface/30 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="shrink-0 bg-accent text-primary-dark px-5 py-3 font-black text-xs uppercase tracking-widest hover:bg-surface transition-colors flex items-center gap-2"
              >
                {subscribed ? (
                  <span>Done ✓</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Subscribe</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main body ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-8">
            {/* Logo mark */}
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black text-surface tracking-tighter">
                KIBALI
                <span className="text-accent text-4xl leading-none">.</span>
              </span>
            </Link>

            <p className="text-surface/45 text-sm leading-relaxed max-w-xs">
              Registered by the Ministry of Education. Providing world-class CBC
              education with a focus on leadership and integrity.
            </p>

            {/* Contact details */}
            <ul className="space-y-3.5">
              {[
                { Icon: MapPin, text: "Lang'ata Road, Karen South, Nairobi" },
                { Icon: Phone, text: "+254 712 345 678" },
                { Icon: Mail, text: "info@kibali.ac.ke" },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-xs text-surface/50 leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent border-b border-white/10 pb-3">
                {title}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-xs font-bold text-surface/45 hover:text-accent transition-colors duration-200 uppercase tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-7">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Copyright */}
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-surface/30 order-3 sm:order-1">
              © {new Date().getFullYear()} Kibali Educational Centre
            </p>

            {/* Accreditation badges */}
            <div className="flex items-center gap-3 order-1 sm:order-2">
              {["MOE Accredited", "TSC Registered"].map((badge) => (
                <span
                  key={badge}
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-surface/30 border border-white/10 px-3 py-1.5"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 order-2 sm:order-3">
              {socials.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-accent hover:bg-accent/10 transition-colors duration-200 group"
                >
                  <Icon className="w-3.5 h-3.5 text-surface/30 group-hover:text-accent transition-colors duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
