import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SmoothScrollProvider } from "@/components/site/SmoothScrollProvider";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FavoritesProvider } from "@/components/shop/FavoritesContext";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://greenerynetworks.com"),
  title: {
    default: "Greenery Networks · Live Flowering Starter Plants",
    template: "%s · Greenery Networks",
  },
  description:
    "A family run online garden. 117 live flowering starter plants in 4 inch pots, hand grown and shipped USPS from California. Spreading the joy with colorful flowers.",
  applicationName: "Greenery Networks",
  keywords: [
    "flowering plants",
    "starter plants",
    "geranium",
    "pelargonium",
    "barleria",
    "online plant nursery",
    "family run nursery",
    "USPS plant shipping",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Greenery Networks",
    title: "Greenery Networks · Live Flowering Starter Plants",
    description:
      "Colorful flowering starter plants in 4 inch pots, hand grown and shipped USPS from California.",
    url: "https://greenerynetworks.com",
    locale: "en_US",
    /* The dynamic OG card at app/opengraph-image.tsx is picked up
       automatically. Keeping a static fallback for platforms that skip
       the dynamic image. */
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenery Networks · Live Flowering Starter Plants",
    description:
      "Colorful flowering starter plants in 4 inch pots, hand grown and shipped USPS from California.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://greenerynetworks.com/#organization",
      name: "Greenery Networks",
      url: "https://greenerynetworks.com",
      logo: "https://greenerynetworks.com/logo.png",
      email: "greenerynetworks@gmail.com",
      description:
        "A curated online garden. Live flowering starter plants in 4-inch pots, hand-grown and shipped USPS across the USA.",
      sameAs: [],
    },
    {
      "@type": "OnlineStore",
      "@id": "https://greenerynetworks.com/#store",
      name: "Greenery Networks",
      url: "https://greenerynetworks.com",
      email: "greenerynetworks@gmail.com",
      areaServed: { "@type": "Country", name: "United States" },
      currenciesAccepted: "USD",
      paymentAccepted: "Credit Card",
      parentOrganization: { "@id": "https://greenerynetworks.com/#organization" },
    },
    {
      "@type": "WebSite",
      "@id": "https://greenerynetworks.com/#website",
      url: "https://greenerynetworks.com",
      name: "Greenery Networks",
      publisher: { "@id": "https://greenerynetworks.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://greenerynetworks.com/shop?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:text-paper focus:px-4 focus:py-2 focus:shadow-soft"
        >
          Skip to content
        </a>
        <CartProvider>
          <FavoritesProvider>
            <SmoothScrollProvider>
              <AnnouncementBar />
              <SiteHeader />
              <main id="main" className="relative">
                {children}
              </main>
              <SiteFooter />
            </SmoothScrollProvider>
            <CartDrawer />
          </FavoritesProvider>
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
      </body>
    </html>
  );
}
