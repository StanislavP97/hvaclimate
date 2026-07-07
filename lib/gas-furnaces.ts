import gasFurnaces from "@/data/hvaclimate-cms-data/gas-furnaces.json";
import type { ServicePage } from "@/types/service-page";

export function getGasFurnaces(): ServicePage[] {
  return gasFurnaces as ServicePage[];
}

export function getGasFurnaceBySlug(slug: string): ServicePage | undefined {
  return getGasFurnaces().find((entry) => entry.slug === slug);
}
