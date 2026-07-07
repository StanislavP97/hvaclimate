import ventCleanings from "@/data/hvaclimate-cms-data/vent-cleanings.json";
import type { ServicePage } from "@/types/service-page";

export function getVentCleanings(): ServicePage[] {
  return ventCleanings as ServicePage[];
}

export function getVentCleaningBySlug(slug: string): ServicePage | undefined {
  return getVentCleanings().find((entry) => entry.slug === slug);
}
