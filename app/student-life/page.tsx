import { HeartPulse, Music, Rocket, Trophy } from "lucide-react";

export default function StudentLifePage() {
  const categories = [
    {
      title: "Sports & Athletics",
      icon: <Trophy />,
      desc: "From swimming to football, we focus on physical health and teamwork.",
      color: "bg-orange-500",
    },
    {
      title: "The Arts",
      icon: <Music />,
      desc: "Music, dance, and drama are core to our creative expression.",
      color: "bg-purple-500",
    },
    {
      title: "STEM & Robotics",
      icon: <Rocket />,
      desc: "Preparing students for the digital future with coding and tech clubs.",
      color: "bg-blue-500",
    },
    {
      title: "Pastoral Care",
      icon: <HeartPulse />,
      desc: "Ensuring every child's emotional and spiritual well-being is nurtured.",
      color: "bg-rose-500",
    },
  ];

  return (
    <main className="pt-32 bg-surface">
      {/* 1. The "Life" Hero */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-primary-dark rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <img
              src="/student-joy.jpg"
              className="object-cover w-full h-full"
              alt="Happy Students"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-surface text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              Life at <br />
              <span className="text-accent">Kibali.</span>
            </h1>
            <p className="text-surface/80 text-xl leading-relaxed">
              Education is a journey of discovery. Beyond the classroom, we
              provide a rich tapestry of experiences that shape character and
              build lifelong friendships.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Co-Curricular Pillars (KISC Meat) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group p-8 bg-white border border-slate-100 rounded-3xl hover:shadow-2xl transition-all"
            >
              <div
                className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
              >
                {cat.icon}
              </div>
              <h3 className="text-xl font-black text-primary-dark mb-3 uppercase tracking-tight">
                {cat.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Clubs Gallery (Graphics Heavy) */}
      <section className="py-20 px-6 bg-primary-dark text-surface rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">
                Discovery
              </h2>
              <p className="text-4xl md:text-5xl font-black">
                Our Clubs & Societies
              </p>
            </div>
            <p className="text-surface/50 max-w-xs text-sm font-medium mt-4 md:mt-0">
              Weekly sessions designed to uncover hidden talents and develop
              leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Club Card */}
            <div className="md:col-span-2 relative h-[400px] rounded-3xl overflow-hidden group">
              <img
                src="/robotics.jpg"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Robotics"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="bg-accent text-primary-dark px-3 py-1 rounded-full text-[10px] font-black uppercase mb-3 inline-block">
                  New for 2026
                </span>
                <h4 className="text-3xl font-black">Robotics & AI Club</h4>
                <p className="text-surface/70 text-sm max-w-md">
                  Engineering the future one block at a time.
                </p>
              </div>
            </div>

            {/* Smaller Club Cards */}
            <div className="bg-surface/5 border border-surface/10 rounded-3xl p-8 flex flex-col justify-center">
              <h4 className="text-2xl font-black mb-4 uppercase">
                The Music Academy
              </h4>
              <p className="text-surface/60 text-sm mb-6">
                From violin to piano, our students master the language of music.
              </p>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-primary-dark bg-slate-300 overflow-hidden"
                  >
                    <img src={`/student-${i}.jpg`} alt="student" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-primary-dark bg-accent text-primary-dark flex items-center justify-center text-[10px] font-black">
                  +40
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
