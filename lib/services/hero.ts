// lib/services/hero.ts
import { client } from "../sanity/client";
import { HeroSlide } from "@/types";
import { HERO_QUERY } from "../sanity/queries/hero";

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const data = await client.fetch<HeroSlide[]>(
      HERO_QUERY,
      {},
      {
        next: {
          revalidate: 3600, // Cache for 1 hour, then background refresh
          tags: ["hero"], // Key for instant revalidation
        },
      },
    );
    return data || [];
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return []; // Return empty array so the component falls back to defaults
  }
}
