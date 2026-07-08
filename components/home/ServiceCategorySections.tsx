import { ServiceCategoryTabs } from "@/components/home/ServiceCategoryTabs";
import { ServiceCategoryHeader } from "@/components/home/ServiceCategoryHeader";
import { HEATING_SERVICE_CARDS } from "@/app/heating/page";
import { COOLING_SERVICE_CARDS } from "@/app/air-conditioning/page";
import { VENTILATION_SERVICE_CARDS } from "@/app/ventilation/page";
import { COMMERCIAL_SERVICE_CARDS } from "@/app/commercial/page";

const CATEGORIES = [
  { label: "Heating", title: "Heating Services", cards: HEATING_SERVICE_CARDS },
  { label: "Cooling", title: "Cooling Services", cards: COOLING_SERVICE_CARDS },
  {
    label: "Ventilation",
    title: "Ventilation Services",
    cards: VENTILATION_SERVICE_CARDS,
  },
  {
    label: "Commercial",
    title: "Commercial Services",
    cards: COMMERCIAL_SERVICE_CARDS,
  },
];

export function ServiceCategorySections() {
  return (
    <>
      <section className="bg-background pt-24 pb-4 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <ServiceCategoryHeader />
        </div>
      </section>

      <ServiceCategoryTabs categories={CATEGORIES} />
    </>
  );
}
