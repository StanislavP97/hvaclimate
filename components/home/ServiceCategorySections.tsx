import { ServiceCardGrid } from "@/components/services/ServiceCardGrid";
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
      <section className="bg-background pt-24 pb-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-4xl font-extrabold text-foreground">
            We offer a wide range of HVAC services
          </h2>
          <p className="mt-4 text-body">
            We provide anything from heat pump repair to vent cleaning.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category) => (
              <span
                key={category.label}
                className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground"
              >
                {category.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {CATEGORIES.map((category) => (
        <section key={category.label} className="bg-background pb-16">
          <h3 className="mx-auto max-w-7xl px-6 text-center text-3xl font-extrabold text-foreground">
            {category.title}
          </h3>
          <div className="mt-8">
            <ServiceCardGrid cards={category.cards} />
          </div>
        </section>
      ))}
    </>
  );
}
