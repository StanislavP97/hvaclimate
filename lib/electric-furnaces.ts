import electricFurnaces from "@/data/hvaclimate-cms-data/electric-furnaces.json";
import type { ServicePage } from "@/types/service-page";

export function getElectricFurnaces(): ServicePage[] {
  return electricFurnaces as ServicePage[];
}

export function getElectricFurnaceBySlug(slug: string): ServicePage | undefined {
  return getElectricFurnaces().find((entry) => entry.slug === slug);
}
