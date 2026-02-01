import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { testimonialSchema } from "@/lib/validation/testimonial";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Server-side Zod validation
    const validation = testimonialSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // 2. HONEYPOT CHECK
    // If the hidden field has any value, it's a bot.
    if (body.hp_field && body.hp_field.length > 0) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    const writeClient = client.withConfig({
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
    });

    const result = await writeClient.create({
      _type: "testimonial",
      parentName: body.parentName,
      role: body.role,
      content: body.content,
      rating: body.rating,
      isApproved: false, // Force manual approval
    });

    return NextResponse.json({ message: "Success", id: result._id });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
