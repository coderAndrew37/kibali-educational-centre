"use client";

import { ArrowRight, GraduationCap, Home, Phone } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="max-w-3xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: The "404" Visual */}
          <div className="relative">
            <h1 className="text-[12rem] font-serif font-bold text-white/5 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex flex-col justify-center">
              <h2 className="text-3xl font-serif text-white mb-4">
                Page Not Found<span className="text-[#C5A059]">.</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                The path you are looking for has moved or no longer exists.
                Allow us to guide you back to the right track.
              </p>
            </div>
          </div>

          {/* Right Side: High-Value Conversion Links */}
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-6">
              Suggested Destinations
            </h3>

            <nav className="space-y-3">
              {[
                { label: "Return Home", href: "/", icon: Home },
                {
                  label: "Our Academics",
                  href: "/academics/overview",
                  icon: GraduationCap,
                },
                {
                  label: "Admissions Office",
                  href: "/admission",
                  icon: ArrowRight,
                },
                { label: "Direct Support", href: "/contact", icon: Phone },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <link.icon className="w-4 h-4 text-white/30 group-hover:text-[#C5A059] transition-colors" />
                    <span className="text-sm font-medium text-white/80 group-hover:text-white">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 group-hover:text-[#C5A059] transition-all" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Contact Reference */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] tracking-[0.2em] text-white/20 uppercase font-bold">
            Need immediate assistance?{" "}
            <a
              href="tel:+254700000000"
              className="text-[#C5A059] hover:underline"
            >
              Call Admissions
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
