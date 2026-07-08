import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AnimatedImage } from "@/components/about/AnimatedImage";
import { ValuesSection } from "@/components/about/ValuesSection";
import { MissionSection } from "@/components/about/MissionSection";
import { GoalsSection } from "@/components/about/GoalsSection";

export const metadata: Metadata = {
  title: "About Us | HVA Climate Control",
  description:
    "Over 10+ years of HVAC experience serving Vancouver WA and Portland OR. Licensed, bonded, and insured heating and cooling experts.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AnimatedImage label="Ductwork installation" className="h-96 w-full" />
      <ValuesSection />
      <MissionSection />
      <GoalsSection />
    </>
  );
}
