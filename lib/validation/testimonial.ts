// lib/validation/testimonial.ts
import * as z from "zod";

export const testimonialSchema = z.object({
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Please provide your role"),
  content: z
    .string()
    .min(10, "Testimonial must be at least 10 characters")
    .max(500),
  rating: z.number().min(1).max(5),
  // The Honeypot field - optional because humans won't fill it
  hp_field: z.string().optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
