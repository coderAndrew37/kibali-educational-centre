import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 shadow-md">
      {/* Top Bar - Using primary-dark constant */}
      <div className="bg-primary-dark text-surface/90 py-2 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between text-xs font-medium uppercase tracking-widest">
          <span>Kibali Educational Centre — Nurturing Potential</span>
          <span>Contact: +254 700 000 000</span>
        </div>
      </div>

      {/* Main Nav - Using surface and primary constants */}
      <nav className="bg-surface py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black text-primary tracking-tighter">
            KIBALI<span className="text-accent">.</span>
          </div>

          <div className="hidden lg:flex gap-8 font-bold text-primary/80">
            <Link href="#" className="hover:text-primary transition">
              About
            </Link>
            <Link href="#" className="hover:text-primary transition">
              Academics
            </Link>
            <Link href="#" className="hover:text-primary transition">
              Admissions
            </Link>
          </div>

          {/* Button - Using accent and primary-dark constants */}
          <button className="bg-accent text-primary-dark px-6 py-2.5 rounded-sm font-bold hover:bg-primary hover:text-surface transition-colors">
            APPLY NOW
          </button>
        </div>
      </nav>
    </header>
  );
}
