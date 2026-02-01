import { getServerSideSitemap } from "next-sitemap";
import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";

export async function GET(request: Request) {
  // 1. Fetch slugs from Sanity for Gallery and News
  const query = groq`*[_type in ["gallery", "post"]] {
    "slug": slug.current,
    "type": _type,
    "_updatedAt": _updatedAt
  }`;

  const entries = await client.fetch(query);

  // 2. Map them to sitemap fields
  const fields = entries.map((item: any) => ({
    loc: `https://kibali.ac.ke/${item.type === "post" ? "news" : "gallery"}/${item.slug}`,
    lastmod: new Date(item._updatedAt).toISOString(),
    changefreq: "daily",
    priority: 0.7,
  }));

  return getServerSideSitemap(fields);
}
