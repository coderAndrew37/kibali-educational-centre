// lib/validation/visitForm.ts
import { z } from "zod";

export const VisitSchema = z.object({
  parentName: z.string().min(2, "Parent / Guardian name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),

  childLevel: z.enum(["kindergarten", "primary", "jss"], {
    message: "Please select an interest level",
  }),

  visitDate: z.string().min(1, "Preferred visit date is required"),

  visitorCount: z
    .number()
    .int()
    .min(1, "At least 1 visitor is required")
    .max(20, "Maximum allowed visitors is 20"),

  message: z.string().max(500, "Message is too long").optional(),
});

export type VisitFormValues = z.infer<typeof VisitSchema>;
