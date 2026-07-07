import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getVentCleaningBySlug,
  getVentCleanings,
} from "@/lib/vent-cleanings";
import { ServiceContentSidebar } from "@/components/services/ServiceContentSidebar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getVentCleanings().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getVentCleaningBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.titleTag,
    description: entry.metaDescription,
  };
}

export default async function VentCleaningPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getVentCleaningBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <>
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary-accent uppercase">
            Vent Cleaning
          </p>
          <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">
            {entry.name}
          </h1>
        </div>
        <Image
          src={entry.featuredImage}
          alt={entry.altText}
          width={640}
          height={480}
          className="h-72 w-full rounded-2xl object-cover lg:h-96"
        />
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-16 lg:grid-cols-[1fr_360px]">
        <div
          className="max-w-none space-y-4 text-body [&_a]:text-primary-accent [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />
        <ServiceContentSidebar />
      </section>
    </>
  );
}
