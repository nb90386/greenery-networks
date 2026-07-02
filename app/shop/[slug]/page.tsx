import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Sprout,
  Truck,
  Leaf,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { PDPGallery } from "@/components/shop/PDPGallery";
import { CareBlock } from "@/components/shop/CareBlock";
import { RelatedRow } from "@/components/shop/RelatedRow";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { FavoriteButton } from "@/components/shop/FavoriteButton";
import { StickyAddToCartBar } from "@/components/shop/StickyAddToCartBar";
import { PDPReviews } from "@/components/reviews/PDPReviews";
import {
  byColor,
  getProduct,
  products,
  TYPE_LABEL,
  PATTERN_LABEL,
  COLOR_LABEL,
} from "@/data/products";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Plant not found" };
  return {
    title: `${p.displayName} · ${TYPE_LABEL[p.type]}`,
    description: p.description,
    openGraph: {
      title: `${p.displayName} · Greenery Networks`,
      description: p.description,
      images: [{ url: p.image, width: 1200, height: 1500, alt: p.name }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const gallery = [product.image, ...(product.gallery ?? [])];

  const related = byColor(product.color)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const lowStockCopy =
    product.stock <= 3
      ? `Only ${product.stock} left. Once they're gone, they're gone for this round.`
      : `${product.stock} in stock for this round.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://greenerynetworks.com/shop/${product.slug}#product`,
        name: product.displayName,
        description: product.description,
        sku: `GN-${product.id}`,
        brand: { "@type": "Brand", name: "Greenery Networks" },
        category: TYPE_LABEL[product.type],
        image: [`https://greenerynetworks.com${product.image}`],
        offers: {
          "@type": "Offer",
          url: `https://greenerynetworks.com/shop/${product.slug}`,
          priceCurrency: "USD",
          price: String(product.price),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@type": "Organization", name: "Greenery Networks" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Shop",
            item: "https://greenerynetworks.com/shop",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: COLOR_LABEL[product.color],
            item: `https://greenerynetworks.com/collections/${product.color}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.displayName,
            item: `https://greenerynetworks.com/shop/${product.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-site">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[0.82rem] text-forest/60 mb-8"
        >
          <Link href="/shop" className="hover:text-forest">Shop</Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.6} />
          <Link
            href={`/collections/${product.color}`}
            className="hover:text-forest"
          >
            {COLOR_LABEL[product.color]}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.6} />
          <span className="text-forest/80 truncate">{product.name}</span>
        </nav>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <PDPGallery images={gallery} alt={product.name} />

          {/* Info */}
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-sage-deep">
              Nº {product.id} · {TYPE_LABEL[product.type]}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.04] text-balance">
              {product.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-[2rem] text-forest tabular-nums">
                ${product.price}
              </span>
              <span className="text-forest/55 text-sm">/ 4-inch starter</span>
            </div>

            <p className="mt-5 text-[1.02rem] leading-relaxed text-forest/75 max-w-prose">
              {product.description}
            </p>

            {/* Stock urgency */}
            <div
              className="mt-6 flex items-center gap-3 rounded-2xl bg-blush/45 border border-blush-deep/20 px-4 py-3"
              role="status"
            >
              <span className="grid place-items-center h-8 w-8 rounded-full bg-blush text-blush-deep shrink-0">
                <Sprout className="h-4 w-4" strokeWidth={1.7} />
              </span>
              <p className="text-[0.92rem] text-forest leading-snug">
                <span className="font-medium">{lowStockCopy}</span>{" "}
                <span className="text-forest/60">
                  We grow small batches and ship fresh.
                </span>
              </p>
            </div>

            {/* Attribute chips */}
            <ul className="mt-6 flex flex-wrap gap-1.5">
              <Chip>{PATTERN_LABEL[product.pattern]}</Chip>
              <Chip>{COLOR_LABEL[product.color]}</Chip>
              <Chip>Ships from California</Chip>
              {product.flags.map((f) => (
                <Chip key={f}>
                  {f === "beginnerFriendly" && "Beginner friendly"}
                  {f === "pollinatorFriendly" && "Pollinator friendly"}
                  {f === "patioFriendly" && "Patio friendly"}
                  {f === "lowMaintenance" && "Low maintenance"}
                </Chip>
              ))}
            </ul>

            {/* Add to cart */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AddToCartButton product={product} />
              <FavoriteButton productId={product.id} size="large" />
              <Link
                href="/shop"
                className="press inline-flex items-center gap-2 rounded-full bg-paper text-forest border border-forest/15 px-5 py-3.5 text-[0.9rem] font-medium hover:bg-mist transition-colors"
              >
                Keep browsing
              </Link>
            </div>

            {/* Honest trust signals */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Guarantee
                icon={HeartHandshake}
                title="Hand packed"
                body="Boxed by the person who grew it."
              />
              <Guarantee
                icon={Truck}
                title="Ships from California"
                body="USPS, actual postage, no fluff."
              />
              <Guarantee
                icon={Leaf}
                title="Picked fresh"
                body="Pulled from the greenhouse the day it ships."
              />
            </ul>
          </div>
        </div>

        {/* Care */}
        <div className="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start">
          <div className="max-w-md">
            <p className="eyebrow text-sage-deep">Live with it</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.06] text-balance">
              Everything we know about{" "}
              <span className="italic font-light text-sage-deep">{product.name}.</span>
            </h2>
            <p className="mt-5 text-forest/70 leading-relaxed">
              Each box ships with a hand-written care card. If something looks
              off in the first 14 days, email us. We&apos;ll help you turn it
              around.
            </p>
          </div>
          <CareBlock care={product.care} />
        </div>

        {/* Reviews */}
        <PDPReviews plantId={product.id} />

        {/* You may also like */}
        <RelatedRow items={related} />
      </div>

      {/* Sticky mobile Add to Cart bar */}
      <StickyAddToCartBar product={product} />
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center rounded-full bg-mist text-forest text-[0.78rem] px-3 py-1.5 border border-forest/8">
      {children}
    </li>
  );
}

function Guarantee({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-2xl bg-paper border border-line p-4">
      <span className="grid place-items-center h-9 w-9 rounded-full bg-mist text-forest shrink-0">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </span>
      <div>
        <p className="text-[0.88rem] text-forest font-medium leading-snug flex items-center gap-1">
          {title}
          <CheckCircle2 className="h-3.5 w-3.5 text-sage-deep" strokeWidth={1.8} />
        </p>
        <p className="mt-0.5 text-[0.78rem] text-forest/60 leading-snug">{body}</p>
      </div>
    </li>
  );
}
