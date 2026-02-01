import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://kibali.ac.ke";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/", // If you have a Sanity Studio embedded
        "/*?*", // Disallow search result pages to prevent duplicate content
      ],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`, // The static pages (Home, About, Contact)
      `${baseUrl}/server-sitemap.xml`, // The dynamic Sanity content (Gallery, News)
    ],
  };
}
