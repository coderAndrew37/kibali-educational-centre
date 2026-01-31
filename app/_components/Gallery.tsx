// components/Gallery.tsx
export default function Gallery() {
  const items = [
    {
      src: "/gal-1.jpg",
      size: "md:col-span-2 md:row-span-2",
      label: "Science Fair",
    },
    { src: "/gal-2.jpg", size: "col-span-1", label: "Music Class" },
    { src: "/gal-3.jpg", size: "col-span-1", label: "Graduation" },
    { src: "/gal-4.jpg", size: "md:col-span-2", label: "Sports Day" },
  ];

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-primary font-black uppercase tracking-widest mb-2">
              Life at Kibali
            </h2>
            <p className="text-primary-dark text-4xl font-extrabold">
              Captured Moments
            </p>
          </div>
          <button className="text-primary font-bold border-b-2 border-accent pb-1 hover:text-accent transition">
            View All Albums
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative group overflow-hidden rounded-2xl ${item.size}`}
            >
              <img
                src={item.src}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={item.label}
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-surface font-bold text-lg">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
