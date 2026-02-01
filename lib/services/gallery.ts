import { client } from "@/lib/sanity/client";

export async function getGalleryItems(start = 0, end = 5) {
  const query = `*[_type == "gallery"] | order(year desc) [${start}...${end}] {
    label,
    album,
    year,
    "src": image.asset->url,
    "size": select(
      isFeatured == true => "md:col-span-2 md:row-span-2",
      "col-span-1"
    )
  }`;
  return await client.fetch(query);
}
