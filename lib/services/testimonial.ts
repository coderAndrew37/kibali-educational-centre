import { client } from "../sanity/client";
import { TESTIMONIAL_QUERY } from "../sanity/queries/testimonial";
import { Testimonial } from "@/types";

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch<Testimonial[]>(
    TESTIMONIAL_QUERY,
    {},
    {
      next: { revalidate: 86400, tags: ["testimonial"] }, // Cache for 24 hours
    },
  );
}
