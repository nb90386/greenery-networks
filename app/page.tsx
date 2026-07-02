import dynamic from "next/dynamic";
import { HomeHero } from "@/components/home/hero/HomeHero";
import { TrustBar } from "@/components/home/TrustBar";

/* Below-the-fold sections are dynamically imported to keep the initial bundle
   lean. Each is a client component that animates in via ScrollTrigger. */
const ShopByColor      = dynamic(() => import("@/components/home/ShopByColor").then((m) => m.ShopByColor));
const FeaturedPlants   = dynamic(() => import("@/components/home/FeaturedPlants").then((m) => m.FeaturedPlants));
const DoorstepToBloom  = dynamic(() => import("@/components/home/DoorstepToBloom").then((m) => m.DoorstepToBloom));
const SeeItInBloom     = dynamic(() => import("@/components/home/SeeItInBloom").then((m) => m.SeeItInBloom));
const FinderTeaser     = dynamic(() => import("@/components/home/FinderTeaser").then((m) => m.FinderTeaser));
const CarePromise      = dynamic(() => import("@/components/home/CarePromise").then((m) => m.CarePromise));
const HomeReviews      = dynamic(() => import("@/components/home/HomeReviews").then((m) => m.HomeReviews));
const NewsletterCTA    = dynamic(() => import("@/components/home/NewsletterCTA").then((m) => m.NewsletterCTA));

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustBar />
      <ShopByColor />
      <FeaturedPlants />
      <DoorstepToBloom />
      <SeeItInBloom />
      <FinderTeaser />
      <CarePromise />
      <HomeReviews />
      <NewsletterCTA />
    </>
  );
}
