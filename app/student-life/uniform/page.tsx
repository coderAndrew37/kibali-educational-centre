import { ShoppingBag, Ruler, CheckCircle2, Info } from "lucide-react";
import Image from "next/image";

export default function UniformPage() {
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

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      {/* 1. HEADER */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="max-w-3xl">
          <h2 className="text-accent text-xs font-black uppercase tracking-[0.4em] mb-4">
            Identity
          </h2>
          <h1 className="text-primary-dark text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            The Kibali <br />{" "}
            <span className="italic text-slate-300">Standard.</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium leading-relaxed border-l-4 border-accent pl-8">
            Our uniform is a symbol of belonging and equality. It prepares
            students for a professional world while fostering a sense of shared
            pride.
          </p>
        </div>
      </section>

      {/* 2. UNIFORM COLLECTIONS */}
      <section className="px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
        {uniformSets.map((set, i) => (
          <div key={i} className="group">
            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-slate-100 mb-8 shadow-xl">
              <Image
                src={set.image}
                alt={set.level}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-surface text-3xl font-black uppercase tracking-tighter">
                  {set.level}
                </h3>
              </div>
            </div>

            <ul className="space-y-3 px-4">
              {set.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-sm font-bold text-slate-600 uppercase tracking-tight"
                >
                  <CheckCircle2 size={16} className="text-accent" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 3. SPORTS & PE KIT (The Action Set) */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="bg-primary-dark rounded-[4rem] p-12 md:p-20 text-surface flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Sports & <br />
              <span className="text-accent">House Kit.</span>
            </h2>
            <p className="text-surface/60 text-lg leading-relaxed">
              Every student is assigned to one of our four houses (Eagle, Lion,
              Rhino, Shark). House t-shirts are worn during internal
              competitions and Friday sports sessions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                <span className="block text-2xl font-black mb-1">
                  Tracksuit
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent italic">
                  Branded Navy/Gold
                </span>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                <span className="block text-2xl font-black mb-1">Swim Kit</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent italic">
                  Professional Grade
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[400px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src="/sports-kit-group.jpg"
              alt="Kibali Sports Kit"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. PROCUREMENT (Where to buy) */}
      <section className="px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col justify-center">
          <ShoppingBag className="text-accent mb-6" size={40} />
          <h3 className="text-2xl font-black text-primary-dark uppercase tracking-tighter mb-4">
            Official Suppliers
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            To maintain color consistency and fabric quality, uniforms are
            exclusively available through our on-campus shop and authorized
            distributors.
          </p>
          <div className="space-y-4">
            <div className="font-bold text-sm text-primary-dark uppercase border-l-2 border-accent pl-4">
              Kibali School Shop (Main Campus)
              <span className="block text-xs text-slate-400 font-medium">
                Mon - Fri: 8:00 AM - 4:00 PM
              </span>
            </div>
          </div>
        </div>

        <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col justify-center">
          <Ruler className="text-accent mb-6" size={40} />
          <h3 className="text-2xl font-black text-primary-dark uppercase tracking-tighter mb-4">
            Grooming Policy
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            Uniforms must be clean and well-pressed. We encourage students to
            take personal responsibility for their appearance as part of our
            leadership training.
          </p>
          <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary-dark hover:text-accent transition-colors">
            Read Full Grooming Guidelines <Info size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
