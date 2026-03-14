import { client } from "../sanity/client";
import {
  NEWS_LIST_QUERY,
  NEWS_DETAIL_QUERY,
  NEWS_RELATED_QUERY,
} from "../sanity/queries/news";
import { newsPosts, NewsPost } from "@/app/data/news";

export type SanityNewsPost = NewsPost & {
  body?: any[]; // Portable text blocks — populated on detail page only
  seo?: { metaTitle?: string; metaDescription?: string };
};

const revalidate = process.env.NODE_ENV === "development" ? 0 : 3600; // 1 hr for news

// List — used by NewsCenter page
export async function getNewsPosts(): Promise<SanityNewsPost[]> {
  try {
    const data = await client.fetch<SanityNewsPost[]>(
      NEWS_LIST_QUERY,
      {},
      { next: { revalidate, tags: ["newsPost"] } },
    );
    return data?.length ? data : (newsPosts as SanityNewsPost[]);
  } catch {
    // Sanity unreachable — fall back to static data
    return newsPosts as SanityNewsPost[];
  }
}

// Detail — used by [slug] page
export async function getNewsPost(
  slug: string,
): Promise<SanityNewsPost | null> {
  try {
    const data = await client.fetch<SanityNewsPost | null>(
      NEWS_DETAIL_QUERY,
      { slug },
      { next: { revalidate, tags: ["newsPost"] } },
    );
    if (data) return data;
    // Sanity returned null — check static fallback
    return (newsPosts.find((p) => p.slug === slug) as SanityNewsPost) ?? null;
  } catch {
    return (newsPosts.find((p) => p.slug === slug) as SanityNewsPost) ?? null;
  }
}

// Related — used by [slug] page sidebar
export async function getRelatedPosts(
  category: string,
  slug: string,
): Promise<SanityNewsPost[]> {
  try {
    const data = await client.fetch<SanityNewsPost[]>(
      NEWS_RELATED_QUERY,
      { category, slug },
      { next: { revalidate, tags: ["newsPost"] } },
    );
    if (data?.length) return data;
    return newsPosts
      .filter((p) => p.category === category && p.slug !== slug)
      .slice(0, 2) as SanityNewsPost[];
  } catch {
    return newsPosts
      .filter((p) => p.category === category && p.slug !== slug)
      .slice(0, 2) as SanityNewsPost[];
  }
}
