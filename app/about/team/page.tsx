import Image from "next/image";
export default function TeamPage() {
  const staff = [
    { name: "Mr. John Doe", role: "Head of School", img: "/staff-1.jpg" },
    { name: "Ms. Sarah Koech", role: "CBC Coordinator", img: "/staff-2.jpg" },
    // Add more...
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto pt-40">
      <div className="mb-16">
        <h2 className="text-primary-dark text-5xl font-black">
          Meet Our Educators
        </h2>
        <div className="h-2 w-32 bg-accent mt-4" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {staff.map((member, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-square mb-4 rounded-xl">
              <Image
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                fill
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-lg font-bold text-primary-dark">
              {member.name}
            </h4>
            <p className="text-slate-500 text-sm font-medium">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
