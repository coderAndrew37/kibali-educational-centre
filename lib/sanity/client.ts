import { createClient } from "next-sanity";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
};

// 1. PUBLIC READ CLIENT (For the Website)
export const client = createClient({
  ...config,
  useCdn: true, // Uses global edge cache (Fast)
});

// 2. PRIVATE WRITE CLIENT (For the Management System)
// This will be used in your Next.js API Routes / Server Actions
export const writeClient = createClient({
  ...config,
  useCdn: false, // Bypasses cache to ensure fresh data
  token: process.env.SANITY_WRITE_TOKEN, // Secure token from Sanity dashboard
});
