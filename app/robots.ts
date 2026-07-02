import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/api/"],
      },
    ],
    sitemap: "https://greenerynetworks.com/sitemap.xml",
    host: "https://greenerynetworks.com",
  };
}
