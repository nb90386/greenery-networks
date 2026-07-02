import type { MetadataRoute } from "next";
import { products, COLLECTIONS } from "@/data/products";

const SITE = "https://greenerynetworks.com";

const STATIC_ROUTES = [
  "/",
  "/shop",
  "/cart",
  "/care",
  "/about",
  "/shipping",
  "/contact",
  "/faq",
  "/blog",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/shop" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/shop" ? 0.9 : 0.6,
  }));

  const collectionPages: MetadataRoute.Sitemap = COLLECTIONS.map((c) => ({
    url: `${SITE}/collections/${c.key}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...collectionPages, ...productPages];
}
