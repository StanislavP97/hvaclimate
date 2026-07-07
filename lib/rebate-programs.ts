import rebatePrograms from "@/data/hvaclimate-cms-data/rebate-programs.json";
import type { ServicePage } from "@/types/service-page";

export function getRebatePrograms(): ServicePage[] {
  return rebatePrograms as ServicePage[];
}

export function getRebateProgramBySlug(slug: string): ServicePage | undefined {
  return getRebatePrograms().find((entry) => entry.slug === slug);
}
