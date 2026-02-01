/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://kibali.ac.ke", // Replace with your domain
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/server-sitemap.xml", "/api/*"], // Exclude private routes
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://kibali.ac.ke/server-sitemap.xml", // If you have dynamic Sanity routes
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api"],
      },
    ],
  },
};
