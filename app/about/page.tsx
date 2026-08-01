import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { AboutHero } from "@/components/about/AboutHero";
import { AnimatedImage } from "@/components/about/AnimatedImage";
import { ValuesSection } from "@/components/about/ValuesSection";
import { MissionSection } from "@/components/about/MissionSection";
import { GoalsSection } from "@/components/about/GoalsSection";

export const metadata: Metadata = pageMetadata({
  title: "About Us | HVA Climate Control",
  description:
    "Over 10+ years of HVAC experience serving Vancouver WA and Portland OR. Licensed, bonded, and insured heating and cooling experts.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AnimatedImage
        src="/images/about/ductwork-pipes.jpg"
        label="Ductwork installation"
        className="h-96 w-full"
      />
      <ValuesSection />
      <MissionSection />
      <GoalsSection />
    </>
  );
}
