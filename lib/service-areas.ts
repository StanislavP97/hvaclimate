import serviceAreas from "@/data/hvaclimate-cms-data/service-areas.json";
import type { ServicePage } from "@/types/service-page";

export function getServiceAreas(): ServicePage[] {
  return serviceAreas as ServicePage[];
}

export function getServiceAreaBySlug(slug: string): ServicePage | undefined {
  return getServiceAreas().find((entry) => entry.slug === slug);
}
