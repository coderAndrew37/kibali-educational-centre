import Image from "next/image";
export function AcademicCard({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl h-80 cursor-pointer">
      <Image
        alt={title}
        src={image}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        fill
      />
      <div className="absolute inset-0 bg-linear-to-t from-primary-dark to-transparent opacity-80" />
      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <span className="text-accent font-semibold flex items-center gap-2">
          Explore{" "}
          <span className="group-hover:translate-x-2 transition-transform">
            →
          </span>
        </span>
      </div>
    </div>
  );
}
