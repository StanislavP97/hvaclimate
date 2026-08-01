import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getVentCleaningBySlug,
  getVentCleanings,
} from "@/lib/vent-cleanings";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";
import { pageMetadata } from "@/lib/metadata";

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

  return pageMetadata({
    title: entry.titleTag,
    description: entry.metaDescription,
    path: `/ventilation/vent-cleaning/${entry.slug}`,
  });
}

export default async function VentCleaningPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getVentCleaningBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="VENT CLEANING"
      breadcrumb={[
        { label: "Ventilation", href: "/ventilation" },
        { label: "Vent Cleaning", href: "/ventilation/vent-cleaning" },
        {
          label: entry.name,
          href: `/ventilation/vent-cleaning/${entry.slug}`,
        },
      ]}
      relatedServices={getVentCleanings()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "✦",
          title: item.name,
          desc: item.metaDescription,
          href: `/ventilation/vent-cleaning/${item.slug}`,
        }))}
    />
  );
}
