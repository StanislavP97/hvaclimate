import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServiceAreas } from "@/lib/service-areas";

export function OtherServiceAreas({ currentSlug }: { currentSlug: string }) {
  const otherAreas = getServiceAreas().filter(
    (entry) => entry.slug !== currentSlug
  );

  return (
    <section className="bg-navy py-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Other Service Areas
        </h2>
        <Button render={<Link href="/contact" />} nativeButton={false} className="rounded-full px-6">
          Contact Us Today
        </Button>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {otherAreas.map((entry) => (
          <Link
            key={entry.slug}
            href={`/service-areas/${entry.slug}`}
            className="flex flex-col overflow-hidden rounded-2xl bg-background"
          >
            <Image
              src={entry.thumbnail}
              alt={entry.altText}
              width={640}
              height={480}
              className="h-40 w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-bold text-foreground">
                {entry.name.replace(/^HVAC (Contractor )?/, "")}
              </h3>
              <p className="mt-2 flex-1 text-sm text-body">
                {entry.metaDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
