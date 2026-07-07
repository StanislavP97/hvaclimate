import acInstallations from "@/data/hvaclimate-cms-data/ac-installations.json";
import type { ServicePage } from "@/types/service-page";

export function getAcInstallations(): ServicePage[] {
  return acInstallations as ServicePage[];
}

export function getAcInstallationBySlug(slug: string): ServicePage | undefined {
  return getAcInstallations().find((entry) => entry.slug === slug);
}
