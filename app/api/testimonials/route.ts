import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Using the client with the write token
    const writeClient = client.withConfig({
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
    });

    const doc = {
      _type: "testimonial",
      parentName: body.parentName,
      role: body.role,
      content: body.content,
      rating: body.rating,
    };

    const result = await writeClient.create(doc);
    return NextResponse.json({ message: "Created", id: result._id });
  } catch (error) {
    console.error("Sanity error:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 },
    );
  }
}
