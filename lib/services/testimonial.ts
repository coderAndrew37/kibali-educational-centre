import { client } from "../sanity/client";
import { TESTIMONIAL_QUERY } from "../sanity/queries/testimonial";
import { Testimonial } from "@/types";

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await client.fetch<Testimonial[]>(
    TESTIMONIAL_QUERY,
    {},
    {
      // During development, you might want to lower this or use 0
      next: {
        revalidate: process.env.NODE_ENV === "development" ? 0 : 86400,
        tags: ["testimonial"],
      },
    },
  );

  return data || [];
}
