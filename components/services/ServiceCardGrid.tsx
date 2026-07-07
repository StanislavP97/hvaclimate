import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export interface ServiceCardData {
  title: string;
  description: string;
  href: string;
  imageLabel: string;
}

export function ServiceCardGrid({ cards }: { cards: ServiceCardData[] }) {
  return (
    <section className="bg-navy py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col overflow-hidden rounded-2xl bg-background"
          >
            <ImagePlaceholder label={card.imageLabel} className="h-40 w-full" />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-bold text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-body">
                {card.description}
              </p>
              <Link
                href={card.href}
                className={buttonVariants({
                  className: "mt-4 w-full rounded-full",
                })}
              >
                View services
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
