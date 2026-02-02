"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronLeft, Phone, Globe } from "lucide-react";

interface NavLinks {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navLinks: NavLinks[] = [
  {
    label: "About Us",
    children: [
      { label: "Our Story", href: "/about/story" },
      { label: "Director's Message", href: "/about/director" },
      { label: "Our Team", href: "/about/team" },
      { label: "Policies", href: "/about/policies" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Overview", href: "/academics/overview" },
      { label: "Kindergarten", href: "/academics/kindergarten" },
      { label: "Primary School", href: "/academics/primary" },
      { label: "Junior Secondary", href: "/academics/jss" },
    ],
  },
  {
    label: "Admissions",

    children: [
      { label: "Overview", href: "/admission" },
      { label: "Enrollment Process", href: "/admission/process" },
      { label: "Fees & Investment", href: "/admission/fees" },
      { label: "Required Documents", href: "/admission/requirements" },
    ],
  },

  {
    label: "Student Life",
    children: [
      { label: "Overview", href: "/student-life" },
      { label: "Boarding Life", href: "/student-life/boarding-school-life" },
      {
        label: "Counseling & Wellness",
        href: "/student-life/counselling-department",
      },
      { label: "Sanatorium", href: "/student-life/school-sanatorium" },
      { label: "Transport", href: "/student-life/transport-services" },
      { label: "Uniform", href: "/student-life/uniform" },
    ],
  },
  {
    label: "Portals",
    children: [
      { label: "Parent Portal", href: "/portals/parents/sign-in" },
      { label: "Staff Portal", href: "/portals/staff/sign-in" },
      { label: "Student Portal", href: "/portals/student/sign-in" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavLinks | null>(null);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSection(null);
  };

  return (
    <header className="fixed top-0 w-full z-[100]">
      {/* Top Bar - Desktop Only */}
      <div className="bg-primary-dark text-surface/90 py-2 px-6 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between text-[10px] font-black uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2">
            <Globe size={12} className="text-accent" /> Kibali Educational
            Centre — Excellence & Character
          </span>
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <Phone size={12} className="text-accent" /> +254 700 000 000
            </span>
            <Link href="/contact" className="hover:text-accent transition">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-surface/95 backdrop-blur-md py-4 px-6 border-b border-slate-100 relative z-[101]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-2xl font-black text-primary-dark tracking-tighter flex items-center gap-1"
          >
            KIBALI<span className="text-accent text-4xl">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-1">
            {navLinks.map((item) => (
              <div key={item.label} className="relative group">
                <button className="px-4 py-2 flex items-center gap-1 font-bold text-primary-dark/70 hover:text-primary-dark transition-all text-[11px] uppercase tracking-widest">
                  {item.label}
                  {item.children && (
                    <ChevronRight
                      size={14}
                      className="rotate-90 group-hover:rotate-[270deg] transition-transform"
                    />
                  )}
                </button>
                {item.children && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 rounded-xl overflow-hidden py-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-6 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-accent transition-all"
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
              className="hidden sm:block bg-accent text-primary-dark px-6 py-3 rounded-full font-black text-[10px] hover:bg-primary-dark hover:text-white transition-all shadow-xl tracking-widest"
            >
              APPLY NOW
            </Link>
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-primary-dark"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR SYSTEM */}
      <div
        className={`fixed inset-0 bg-primary-dark/60 backdrop-blur-sm z-[90] transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white z-[110] transform transition-transform duration-500 ease-in-out lg:hidden shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Layer 1: Main Sections */}
        <div className="flex flex-col h-full pt-24 px-6">
          <div className="space-y-2">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveSection(item)}
                className="w-full flex items-center justify-between py-4 border-b border-slate-50 text-primary-dark font-black text-sm uppercase tracking-tighter"
              >
                {item.label}
                <ChevronRight size={18} className="text-accent" />
              </button>
            ))}
          </div>

          <div className="mt-auto pb-10 space-y-4">
            <Link
              href="/admission"
              onClick={closeMenu}
              className="block w-full bg-primary-dark text-white text-center py-4 rounded-xl font-black text-xs uppercase tracking-widest"
            >
              Apply Now
            </Link>
            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
              © 2026 Kibali Educational Centre
            </p>
          </div>
        </div>

        {/* Layer 2: Sub-sections (Drill-down) */}
        <div
          className={`absolute inset-0 bg-white z-10 p-6 pt-24 transition-transform duration-300 ${activeSection ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest mb-8"
          >
            <ChevronLeft size={18} /> Back
          </button>

          {activeSection && (
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-primary-dark uppercase tracking-tighter mb-6">
                {activeSection.label}
              </h2>
              {activeSection.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  onClick={closeMenu}
                  className="block py-4 border-b border-slate-50 text-slate-500 font-bold text-sm uppercase tracking-tight hover:text-accent"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
