// app/gallery/page.tsx
"use client";

import { useState, useEffect } from "react";
import Gallery from "@/app/_components/Gallery";
import { getGalleryItems } from "@/lib/services/gallery";
import { GalleryItem } from "@/types";

export default function FullGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_BATCH = 6;

  const loadMoreItems = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const start = page * ITEMS_PER_BATCH;
    const end = start + ITEMS_PER_BATCH - 1;

    const newItems = await getGalleryItems(start, end);

    if (newItems.length < ITEMS_PER_BATCH) {
      setHasMore(false);
    }

    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    loadMoreItems();
  }, []);

  return (
    <main className="pt-20">
      <Gallery items={items} showViewAll={false} />

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div className="flex justify-center pb-20">
          <button
            onClick={loadMoreItems}
            disabled={loading}
            className="px-8 py-3 bg-primary text-white rounded-full disabled:opacity-50"
          >
            {loading ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
    </main>
  );
}
