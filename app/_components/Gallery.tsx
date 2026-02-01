"use client";

import { GalleryItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface GalleryProps {
  items: GalleryItem[];
  limit?: number; // Used for homepage to show a subset
  showViewAll?: boolean;
}

export default function Gallery({
  items,
  limit,
  showViewAll = true,
}: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // 1. Determine which albums exist in the provided data
  const albums = [
    "all",
    ...Array.from(new Set(items.map((item) => item.album))),
  ];

  // 2. Filter logic
  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.album === activeFilter);

  // 3. Slice logic for Homepage use
  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  // --- Lightbox Logic ---
  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const showNext = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev !== null && prev < displayedItems.length - 1 ? prev + 1 : 0,
    );
  }, [displayedItems.length]);

  const showPrev = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : displayedItems.length - 1,
    );
  }, [displayedItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, showNext, showPrev]);

  useEffect(() => {
    document.body.style.overflow =
      selectedImageIndex !== null ? "hidden" : "unset";
  }, [selectedImageIndex]);

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-surface via-white to-surface/30">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
              Life at <span className="text-accent">Kibali</span>
            </h2>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2" role="tablist">
            {albums.map((album) => (
              <button
                key={album}
                role="tab"
                aria-selected={activeFilter === album}
                onClick={() => {
                  setActiveFilter(album);
                  closeLightbox();
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${
                  activeFilter === album
                    ? "bg-accent text-white shadow-lg"
                    : "bg-white text-primary-dark border border-primary/10 hover:bg-primary/5"
                }`}
              >
                {album === "all" ? "All Albums" : album}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[240px] md:auto-rows-[280px]">
          {displayedItems.map((item, i) => (
            <article
              key={`${item.src}-${i}`}
              onClick={() => openLightbox(i)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && openLightbox(i)
              }
              tabIndex={0}
              className={`relative group overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:scale-[1.02] ${item.size}`}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <p className="text-accent text-xs font-bold uppercase mb-2">
                  {item.album}
                </p>
                <h3 className="text-xl font-bold text-white">{item.label}</h3>
              </div>
            </article>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-dark/95 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            <button
              aria-label="close lightbox"
              className="absolute top-6 right-6 text-white z-[110]"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <button
              aria-label="previous image"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 p-4 text-white hover:bg-white/10 rounded-full z-[110]"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayedItems[selectedImageIndex].src}
                alt="Full view"
                fill
                className="object-contain"
              />
            </div>

            <button
              aria-label="next image"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 p-4 text-white hover:bg-white/10 rounded-full z-[110]"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Conditional View All Button */}
        {showViewAll && limit && (
          <div className="flex justify-center mt-16">
            <Link
              href="/gallery"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent rounded-full text-white font-semibold text-lg hover:shadow-xl hover:shadow-accent/25 transition-all"
            >
              <span>Explore All Memories</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
