"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  src: string;
  size: string;
  label: string;
  album: string;
  year: number;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const items: GalleryItem[] = [
    {
      src: "/gal-1.jpg",
      size: "md:col-span-2 md:row-span-2",
      label: "Science Fair Winners",
      album: "Academic Excellence",
      year: 2024,
    },
    {
      src: "/gal-2.jpg",
      size: "col-span-1",
      label: "Orchestra Performance",
      album: "Arts & Music",
      year: 2024,
    },
    {
      src: "/gal-3.jpg",
      size: "col-span-1",
      label: "Graduation Ceremony",
      album: "Milestones",
      year: 2024,
    },
    {
      src: "/gal-4.jpg",
      size: "md:col-span-2",
      label: "Championship Victory",
      album: "Sports & Athletics",
      year: 2023,
    },
    {
      src: "/gal-5.jpg",
      size: "col-span-1",
      label: "Community Outreach",
      album: "Service Learning",
      year: 2023,
    },
    {
      src: "/gal-6.jpg",
      size: "col-span-1",
      label: "Robotics Lab",
      album: "Academic Excellence",
      year: 2024,
    },
  ];

  const albums = [
    "all",
    "Academic Excellence",
    "Arts & Music",
    "Sports & Athletics",
    "Service Learning",
  ];

  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.album === activeFilter);

  return (
    <section
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-surface via-white to-surface/30"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Visual Journey
              </span>
            </div>
            <div>
              <h2
                id="gallery-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 tracking-tight"
              >
                Life at <span className="text-accent">Kibali</span>
              </h2>
              <p className="text-xl md:text-2xl text-primary-dark/70 font-medium">
                Where every moment tells a story of growth and achievement
              </p>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary-dark uppercase tracking-wider">
                Filter by Album
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Gallery filter options"
              >
                {albums.map((album) => (
                  <button
                    aria-label={`Filter by album: ${album}`}
                    key={album}
                    onClick={() => setActiveFilter(album)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveFilter(album);
                      }
                    }}
                    role="tab"
                    aria-selected={activeFilter === album ? "true" : "false"}
                    aria-controls={`gallery-content-${album}`}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent
                      ${
                        activeFilter === album
                          ? "bg-accent text-white shadow-lg shadow-accent/20"
                          : "bg-white text-primary-dark hover:bg-primary/5 border border-primary/10"
                      }
                    `}
                  >
                    {album === "all" ? "All Albums" : album}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[240px] md:auto-rows-[280px]"
          role="region"
          aria-label="Photo gallery"
          id={`gallery-content-${activeFilter}`}
        >
          {filteredItems.map((item, i) => (
            <article
              key={i}
              className={`
                relative group overflow-hidden rounded-3xl
                transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
                focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-4
                ${item.size}
                ${focusedIndex === i ? "ring-2 ring-accent ring-offset-4" : ""}
              `}
              tabIndex={0}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Handle image expansion/modal opening
                  e.currentTarget.click();
                }
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={`${item.label} - ${item.album} ${item.year}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={i < 2}
                />

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/30 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {/* Album Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        {item.album}
                      </span>
                    </span>
                  </div>

                  {/* Title & Year */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {item.label}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white/80">
                        {item.year}
                      </span>
                      {/* Expand Button */}
                      <button
                        aria-label={`Expand ${item.label} image`}
                        className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                        w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                        transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Loading State */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 animate-pulse" />
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <button
            aria-label="View all photo albums"
            className="group relative inline-flex items-center gap-3 px-8 py-4 
            bg-gradient-to-r from-accent to-accent-dark rounded-full
            text-white font-semibold text-lg tracking-wide
            transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-1
            focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-accent"
          >
            <span>Explore All Memories</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>

            {/* Animated border */}
            <span className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping-slow" />
          </button>
        </div>

        {/* Accessibility Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-primary-dark/50">
            <strong>Accessibility note:</strong> Navigate using Tab. Press Enter
            to expand images. Use arrow keys for gallery navigation.
          </p>
        </div>
      </div>
    </section>
  );
}
