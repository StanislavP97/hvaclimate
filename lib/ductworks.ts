import ductworks from "@/data/hvaclimate-cms-data/ductworks.json";
import type { ServicePage } from "@/types/service-page";

export function getDuctworks(): ServicePage[] {
  return ductworks as ServicePage[];
}

export function getDuctworkBySlug(slug: string): ServicePage | undefined {
  return getDuctworks().find((entry) => entry.slug === slug);
}
