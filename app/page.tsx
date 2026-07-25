import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { GoogleReviews } from "@/components/GoogleReviews";
import { ServiceCategorySections } from "@/components/home/ServiceCategorySections";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export const metadata: Metadata = {
  title: "HVA Climate Control | HVAC Contractor in Vancouver, WA",
  description:
    "Licensed, bonded, and insured HVAC contractor serving Vancouver WA and Portland OR. Heating, cooling, ventilation, and commercial services.",
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustBar />
      <ServiceCategorySections />
      <WhyChooseUs />
      <GoogleReviews />
      <BlogTeaser />
    </>
  );
}
