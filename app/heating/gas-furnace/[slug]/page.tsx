import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGasFurnaceBySlug, getGasFurnaces } from "@/lib/gas-furnaces";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getGasFurnaces().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGasFurnaceBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.titleTag,
    description: entry.metaDescription,
  };
}

export default async function GasFurnacePage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getGasFurnaceBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="GAS FURNACE SERVICES"
      breadcrumb={[
        { label: "Heating", href: "/heating" },
        { label: "Gas Furnace", href: "/heating/gas-furnace" },
        { label: entry.name, href: `/heating/gas-furnace/${entry.slug}` },
      ]}
      relatedServices={getGasFurnaces()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "⚙",
          title: item.name,
          desc: item.metaDescription,
          href: `/heating/gas-furnace/${item.slug}`,
        }))}
    />
  );
}
