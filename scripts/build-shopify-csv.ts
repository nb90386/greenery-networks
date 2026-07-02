/**
 * Regenerate shopify_products_import.csv from data/plant-catalog.json.
 *
 * Run with:  npx tsx scripts/build-shopify-csv.ts
 *
 * The CSV uses Shopify's standard "Products - Import" template columns.
 * Every plant is $12, quantity 5, ships from California. No hardiness zone.
 * No arrival guarantees anywhere in the copy.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import catalog from "../data/plant-catalog.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* Duplicated tiny helpers so the script has no external deps. */
type Raw = { id: string; name: string };
type TypeKey = "pelargonium" | "barleria" | "scented";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function typeFor(name: string): TypeKey {
  const n = name.toLowerCase();
  if (n.includes("barleria") || n.includes("barcleria")) return "barleria";
  if (n.includes("citronella") || n.includes("scented")) return "scented";
  return "pelargonium";
}

function colorTag(name: string): string {
  const n = name.toLowerCase();
  if (/(burgundy|garnet|wine|dark red|maroon)/.test(n)) return "burgundy";
  if (/(salmon|coral|apricot|peach)/.test(n)) return "salmon";
  if (/(lavender|violet|orchid)/.test(n)) return "lavender";
  if (/(purple|plum|mauve)/.test(n)) return "purple";
  if (/(pink|blush|rose|candy|magenta|fuschia|fuchsia)/.test(n)) return "pink";
  if (/(white|pale|cream)/.test(n)) return "white";
  if (/red/.test(n)) return "red";
  if (n.includes("barleria") || n.includes("barcleria")) return "barleria";
  if (n.includes("citronella") || n.includes("scented")) return "scented";
  return "other";
}

function description(name: string, type: TypeKey): string {
  if (type === "barleria") {
    return `A Philippine violet (Barleria). Hand grown into a 4 inch starter and ready to settle into a bright shade corner or a container. Ships from California, hand packed with care.`;
  }
  if (type === "scented") {
    return `A fragrant pelargonium with aromatic foliage. Brush past it and the scent lifts. Hand grown into a 4 inch starter and ready for a sunny patio. Ships from California, hand packed with care.`;
  }
  return `A regal or zonal pelargonium. Hand grown into a 4 inch starter, shipped with healthy roots and a flush of buds, and ready to plant the day it arrives. Ships from California, hand packed with care.`;
}

function typeLabel(type: TypeKey): string {
  if (type === "barleria") return "Philippine Violet";
  if (type === "scented") return "Scented Geranium";
  return "Pelargonium";
}

function csvEscape(s: string): string {
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

const HEADERS = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Product Category",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "SEO Title",
  "SEO Description",
  "Status",
];

const rows: string[][] = [HEADERS];

const items = catalog as Raw[];
for (const p of items) {
  const type = typeFor(p.name);
  const handle = slugify(`${p.id}-${p.name}`);
  const title = `Nº ${p.id} · ${p.name}`;
  const bodyHtml = `<p>${description(p.name, type)}</p>`;
  const tags = [
    "starter-plant",
    typeLabel(type).toLowerCase().replace(/\s+/g, "-"),
    `color-${colorTag(p.name)}`,
    "4-inch-pot",
    "ships-from-california",
    "hand-packed",
  ].join(", ");
  const sku = `GN-${p.id}`;
  const imageUrl = `https://greenerynetworks.com/images/plants/${p.id}.jpg`;
  const imageAlt = `${title} flowering starter plant`;

  rows.push([
    handle,
    title,
    bodyHtml,
    "Greenery Networks",
    "Home & Garden > Plants",
    typeLabel(type),
    tags,
    "TRUE",
    "Size",
    "4 inch starter",
    sku,
    "300", // grams: 300g estimate for a 4 inch pot with soil
    "shopify",
    "5",
    "deny",
    "manual",
    "12.00",
    "",
    "TRUE",
    "TRUE",
    imageUrl,
    "1",
    imageAlt,
    `${title} · Greenery Networks`,
    `A live 4 inch flowering starter plant. $12. Ships USPS from California, hand packed with care.`,
    "active",
  ]);
}

const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n") + "\n";
const outPath = path.join(__dirname, "..", "shopify_products_import.csv");
fs.writeFileSync(outPath, csv, "utf-8");
console.log(`Wrote ${outPath} with ${rows.length - 1} products.`);
