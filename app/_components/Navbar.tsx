"use client";
import { label } from "framer-motion/client";
import Link from "next/link";

const navLinks = [
  {
    label: "About Us",
    children: [
      { label: "Our Story", href: "/about/story" },
      { label: "Director's Message", href: "/about/director" },
      { label: "Our Team", href: "/about/team" },
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
  { label: "Admissions", href: "/admission" },

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
  return (
    <header className="fixed top-0 w-full z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary-dark text-surface/90 py-2 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
          <span>Kibali Educational Centre — Excellence & Character</span>
          <div className="flex gap-6">
            <span>Contact: +254 700 000 000</span>
            <Link href="/contact" className="hover:text-accent transition">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-surface/95 backdrop-blur-md py-4 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black text-primary tracking-tighter flex items-center gap-1"
          >
            KIBALI<span className="text-accent text-4xl">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-2">
            {navLinks.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button className="px-4 py-2 flex items-center gap-1 font-bold text-primary-dark/80 hover:text-primary transition-all text-sm uppercase tracking-wider">
                      {item.label}
                      <svg
                        className="w-4 h-4 transition-transform group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-0 w-56 bg-surface border border-slate-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 rounded-b-md overflow-hidden">
                      <div className="py-2 flex flex-col">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary hover:pl-8 transition-all"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="px-4 py-2 font-bold text-primary-dark/80 hover:text-primary transition-all text-sm uppercase tracking-wider"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Portal Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/admission"
              className="bg-accent text-primary-dark px-6 py-3 rounded-sm font-black text-xs hover:bg-primary hover:text-surface transition-all shadow-lg tracking-tighter"
            >
              APPLY NOW
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
