import { HeroSlide } from "@/types"; // Create a types file for your interfaces
import { client } from "../sanity/client";

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const query = `*[_type == "hero"][0].slides[] {
    title,
    sub,
    "imageUrl": image.asset->url,
    primaryLink,
    secondaryLink,
    primaryCtaText
  }`;

  // Next.js Cache optimization
  return client.fetch(
    query,
    {},
    {
      next: {
        revalidate: 3600, // Background revalidation every hour
        tags: ["hero"], // Tag for instant manual revalidation via webhooks
      },
    },
  );
}
