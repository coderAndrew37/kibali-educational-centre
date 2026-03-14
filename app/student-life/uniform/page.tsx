import PageHero from "@/app/_components/PageHero";
import { ShoppingBag, Ruler, CheckCircle2, Info } from "lucide-react";
import Image from "next/image";

const uniformSets = [
  {
    level: "Kindergarten",
    items: [
      "Kibali Polo Shirt",
      "Navy Blue Shorts/Skort",
      "Branded Pullover",
      "White Socks",
      "Black Leather Shoes",
    ],
    image: "/uniform-kinder.jpg",
  },
  {
    level: "Primary School",
    items: [
      "Light Blue Shirt/Blouse",
      "School Tie",
      "Grey Trousers/Pinafore",
      "Navy Blazer",
      "Grey Woolen Socks",
    ],
    image: "/uniform-primary.jpg",
  },
  {
    level: "Junior Secondary",
    items: [
      "White Oxford Shirt",
      "Senior Tie",
      "Navy Blue Blazer (Gold Trim)",
      "Trousers/Skirt",
      "Black Leather Shoes",
    ],
    image: "/uniform-jss.jpg",
  },
];

const houses = [
  { name: "Eagle", color: "bg-blue-500" },
  { name: "Lion", color: "bg-amber-500" },
  { name: "Rhino", color: "bg-slate-500" },
  { name: "Shark", color: "bg-teal-500" },
];

export default function UniformPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        image="/campus-1.jpg"
        eyebrow="Identity"
        title="The Kibali Standard"
        accentWord="Kibali"
        tagline="Our uniform is a symbol of belonging and equality — preparing students for a professional world while fostering a sense of shared pride."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Student Life", href: "/student-life" },
          { label: "Uniform", href: "#" },
        ]}
        overlayOpacity={0.68}
        minHeight="55vh"
      />

      {/* ── Uniform Collections ──────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        {/* Section eyebrow */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <div className="h-1 w-10 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
          <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
            Uniform Collections
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {uniformSets.map((set, i) => (
            <div key={i} className="group">
              {/* Image card */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 mb-6 shadow-xl">
                <Image
                  src={set.image}
                  alt={set.level}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/20 to-transparent" />

                {/* Level label — pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="inline-block px-4 py-1.5 bg-accent/10 border-y border-accent/30 mb-3">
                    <span className="text-accent font-black tracking-[0.3em] text-[10px] uppercase">
                      {set.level}
                    </span>
                  </div>
                  <h3 className="text-surface text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">
                    Uniform Set
                  </h3>
                </div>
              </div>

              {/* Items list */}
              <ul className="space-y-2.5 px-1">
                {set.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm font-bold text-slate-600 uppercase tracking-tight"
                  >
                    <CheckCircle2 size={15} className="text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sports & PE Kit ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 max-w-7xl mx-auto">
        <div className="relative bg-primary-dark overflow-hidden">
          {/* Texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/10 blur-[80px]" />

          <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16">
              {/* Copy */}
              <div className="w-full lg:w-1/2 space-y-7">
                {/* Eyebrow */}
                <div className="inline-block px-5 py-2 bg-accent/10 border-y border-accent/30">
                  <span className="text-accent font-black tracking-[0.3em] text-[10px] uppercase">
                    Sports & PE
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-surface uppercase tracking-tighter leading-[1.05]">
                  Sports & <span className="text-accent">House Kit</span>
                </h2>

                <p className="text-surface/60 text-base md:text-lg leading-relaxed border-l-2 border-accent/40 pl-5">
                  Every student is assigned to one of our four houses. House
                  t-shirts are worn during internal competitions and Friday
                  sports sessions.
                </p>

                {/* Houses */}
                <div className="flex flex-wrap gap-3">
                  {houses.map((h) => (
                    <div
                      key={h.name}
                      className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5"
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${h.color}`} />
                      <span className="text-surface font-black text-[10px] uppercase tracking-widest">
                        {h.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Kit items */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { label: "Tracksuit", sub: "Branded Navy/Gold" },
                    { label: "Swim Kit", sub: "Professional Grade" },
                  ].map((k) => (
                    <div
                      key={k.label}
                      className="p-5 md:p-6 bg-white/5 border border-white/10"
                    >
                      <span className="block text-xl md:text-2xl font-black text-surface mb-1">
                        {k.label}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                        {k.sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-square overflow-hidden shadow-2xl">
                <Image
                  src="/sports-kit-group.jpg"
                  alt="Kibali Sports Kit"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Procurement ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10 md:mb-12">
          <div className="h-1 w-10 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
          <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
            Getting Your Uniform
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {/* Official suppliers */}
          <div className="flex flex-col justify-between p-8 md:p-10 bg-surface border border-slate-100 hover:border-accent/30 transition-colors duration-300">
            <div>
              <div className="w-11 h-11 bg-accent flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
                <ShoppingBag size={20} className="text-primary-dark" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-primary-dark uppercase tracking-tighter mb-4">
                Official Suppliers
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
                To maintain colour consistency and fabric quality, uniforms are
                exclusively available through our on-campus shop and authorised
                distributors.
              </p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <p className="font-black text-sm text-primary-dark uppercase tracking-tight">
                Kibali School Shop — Main Campus
              </p>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Mon – Fri: 8:00 AM – 4:00 PM
              </p>
            </div>
          </div>

          {/* Grooming policy */}
          <div className="flex flex-col justify-between p-8 md:p-10 bg-surface border border-slate-100 hover:border-accent/30 transition-colors duration-300">
            <div>
              <div className="w-11 h-11 bg-primary-dark flex items-center justify-center mb-8">
                <Ruler size={20} className="text-accent" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-primary-dark uppercase tracking-tighter mb-4">
                Grooming Policy
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
                Uniforms must be clean and well-pressed. We encourage students
                to take personal responsibility for their appearance as part of
                our leadership training.
              </p>
            </div>
            <button className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary-dark hover:text-accent transition-colors">
              Read Full Grooming Guidelines
              <Info size={14} className="shrink-0" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
