"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const footerLinks = {
    institute: [
      { name: "Our Story", path: "/about/story" },
      { name: "The Director", path: "/about/director" },
      { name: "Academic Team", path: "/about/team" },
      { name: "Careers", path: "/careers" },
    ],
    admissions: [
      { name: "Enrollment", path: "/admission" },
      { name: "School Calendar", path: "/calendar" },
      { name: "FAQ", path: "/frequently-asked-questions" },
      { name: "Gallery", path: "/gallery" },
    ],
    portals: [
      { name: "Parent Portal", path: "/portals/parents/sign-in" },
      { name: "Staff Portal", path: "/portals/staff/sign-in" },
      { name: "Student Portal", path: "/portals/student/sign-in" },
    ],
  };

  return (
    <footer className="bg-[var(--kibali-bg)] text-[var(--kibali-navy)] border-t border-slate-200">
      {/* 1. Newsletter - Solid Dark Section */}
      <div className="bg-[var(--kibali-dark)] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[var(--kibali-amber)] font-bold mb-2">
              Institutional Updates
            </h3>
            <p className="text-slate-400 text-sm font-light italic">
              Join our community for academic insights and school news.
            </p>
          </div>
          <form className="flex w-full lg:w-auto gap-px bg-white/10 p-1 border border-white/10 rounded-sm">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent px-4 py-2 text-sm focus:outline-none w-full lg:w-64 text-white placeholder:text-slate-500"
            />
            <button className="bg-[var(--kibali-amber)] hover:bg-white text-slate-900 px-6 py-2 text-xs font-bold transition-all uppercase tracking-widest">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-serif tracking-tight text-slate-900 mb-4 uppercase">
                Kibali{" "}
                <span className="text-[var(--kibali-amber)]">
                  Educational Centre
                </span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm font-light">
                Registered by the Ministry of Education. Providing world-class
                CBC education with a focus on leadership and integrity.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-[var(--kibali-amber)]" />
                <span className="text-xs text-slate-600">
                  Lang'ata Road, Karen South, Nairobi
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-[var(--kibali-amber)]" />
                <span className="text-xs text-slate-600">+254 712 345 678</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-[var(--kibali-amber)]" />
                <span className="text-xs text-slate-600 border-b border-amber-200">
                  info@kibali.ac.ke
                </span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold border-b border-slate-100 pb-2">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm text-slate-500 hover:text-[var(--kibali-amber)] transition-colors"
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

      {/* 3. Bottom Bar with Padding */}
      <div className="border-t border-slate-100 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
              © {new Date().getFullYear()} Kibali Educational Centre
            </div>

            <div className="flex items-center gap-6">
              <span className="text-[9px] tracking-[0.2em] font-bold text-slate-300 border border-slate-200 px-3 py-1 rounded-full">
                MOE ACCREDITED
              </span>
              <span className="text-[9px] tracking-[0.2em] font-bold text-slate-300 border border-slate-200 px-3 py-1 rounded-full">
                TSC REGISTERED
              </span>
            </div>

            <div className="flex gap-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-slate-300 hover:text-[var(--kibali-amber)] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
