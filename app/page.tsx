import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ExperienceBanner } from "@/components/home/ExperienceBanner";
import { ServiceCategorySections } from "@/components/home/ServiceCategorySections";
import { BlogTeaser } from "@/components/home/BlogTeaser";

export const metadata: Metadata = {
  title: "HVA Climate Control | HVAC Contractor in Vancouver, WA",
  description:
    "Licensed, bonded, and insured HVAC contractor serving Vancouver WA and Portland OR. Heating, cooling, ventilation, and commercial services.",
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <ReviewsSection />
      <ExperienceBanner />
      <ServiceCategorySections />
      <BlogTeaser />
    </>
  );
}
