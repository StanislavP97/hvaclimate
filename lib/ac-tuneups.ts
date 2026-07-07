import acTuneups from "@/data/hvaclimate-cms-data/ac-tuneups.json";
import type { ServicePage } from "@/types/service-page";

export function getAcTuneups(): ServicePage[] {
  return acTuneups as ServicePage[];
}

export function getAcTuneupBySlug(slug: string): ServicePage | undefined {
  return getAcTuneups().find((entry) => entry.slug === slug);
}
