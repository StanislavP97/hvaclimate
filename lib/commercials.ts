import commercials from "@/data/hvaclimate-cms-data/commercials.json";
import type { ServicePage } from "@/types/service-page";

export function getCommercials(): ServicePage[] {
  return commercials as ServicePage[];
}

export function getCommercialBySlug(slug: string): ServicePage | undefined {
  return getCommercials().find((entry) => entry.slug === slug);
}
