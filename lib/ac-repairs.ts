import acRepairs from "@/data/hvaclimate-cms-data/ac-repairs.json";
import type { ServicePage } from "@/types/service-page";

export function getAcRepairs(): ServicePage[] {
  return acRepairs as ServicePage[];
}

export function getAcRepairBySlug(slug: string): ServicePage | undefined {
  return getAcRepairs().find((entry) => entry.slug === slug);
}
