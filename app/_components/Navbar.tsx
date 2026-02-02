"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronLeft, Phone, Globe } from "lucide-react";
import { navLinks, NavLinks } from "../data/navLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavLinks | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle hydration to prevent flickering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSection(null);
  };

  if (!mounted) return null; // Or return a skeletal loader

  return (
    <header className="fixed top-0 w-full z-[100]">
      {/* 1. Top Bar - Desktop Only: "hidden lg:block" is key here */}
      <div className="bg-primary-dark text-surface/90 py-2 px-6 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between text-[10px] font-black uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2">
            <Globe size={12} className="text-accent" /> Kibali Educational
            Centre
          </span>
          <div className="flex gap-8 text-surface/70">
            <span className="flex items-center gap-2">
              <Phone size={12} className="text-accent" /> +254 700 000 000
            </span>
            <Link href="/contact" className="hover:text-accent transition">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Nav */}
      <nav className="bg-surface/95 backdrop-blur-md py-4 px-6 border-b border-slate-100 relative z-[101]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-2xl font-black text-primary-dark tracking-tighter"
          >
            KIBALI<span className="text-accent text-4xl">.</span>
          </Link>

          {/* Desktop Navigation: hidden lg:flex */}
          <div className="hidden lg:flex gap-1">
            {navLinks.map((item) => (
              <div key={item.label} className="relative group">
                <button className="px-4 py-2 flex items-center gap-1 font-bold text-primary-dark/70 hover:text-primary-dark transition-all text-[11px] uppercase tracking-widest">
                  {item.label}
                  {item.children && (
                    <ChevronRight
                      size={14}
                      className="rotate-90 transition-transform group-hover:rotate-[270deg]"
                    />
                  )}
                </button>
                {item.children && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all rounded-xl py-3 translate-y-2 group-hover:translate-y-0">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-6 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-accent"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admission"
              className="hidden sm:block bg-accent text-primary-dark px-6 py-3 rounded-full font-black text-[10px] tracking-widest hover:scale-105 transition-transform"
            >
              APPLY NOW
            </Link>
            {/* Mobile Toggle Button: lg:hidden */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-primary-dark"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE SYSTEM: lg:hidden ensures these never show on desktop */}
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-primary-dark/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={closeMenu}
        />

        {/* Sidebar Container */}
        <div
          className={`fixed top-0 right-0 h-full w-[320px] bg-white z-[110] transform transition-transform duration-500 shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Main Sidebar (Layer 1) */}
          <div className="flex flex-col h-full pt-24 px-6 overflow-y-auto">
            <div className="space-y-1">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveSection(item)}
                  className="w-full flex items-center justify-between py-5 border-b border-slate-50 text-primary-dark font-black text-sm uppercase tracking-tighter"
                >
                  {item.label}
                  <ChevronRight size={18} className="text-accent" />
                </button>
              ))}
            </div>

            <div className="mt-auto pb-10 space-y-4 pt-10">
              <Link
                href="/admission"
                onClick={closeMenu}
                className="block w-full bg-primary-dark text-white text-center py-4 rounded-xl font-black text-xs uppercase tracking-widest"
              >
                Apply Now
              </Link>
              <div className="text-center text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                Kibali Educational Centre © 2026
              </div>
            </div>
          </div>

          {/* Sub-menu (Layer 2 - The Drill Down) */}
          <div
            className={`absolute inset-0 bg-white z-[120] p-6 pt-24 transition-transform duration-300 ease-out ${activeSection ? "translate-x-0 shadow-2xl" : "translate-x-full"}`}
          >
            <button
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-[0.2em] mb-10"
            >
              <ChevronLeft size={18} /> Back to Menu
            </button>

            {activeSection && (
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-primary-dark uppercase tracking-tighter mb-8 border-l-4 border-accent pl-4">
                  {activeSection.label}
                </h3>
                {activeSection.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={closeMenu}
                    className="block py-4 border-b border-slate-50 text-slate-600 font-bold text-sm uppercase tracking-tight"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
