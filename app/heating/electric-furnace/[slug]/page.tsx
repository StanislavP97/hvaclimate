import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getElectricFurnaceBySlug,
  getElectricFurnaces,
} from "@/lib/electric-furnaces";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getElectricFurnaces().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getElectricFurnaceBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.titleTag,
    description: entry.metaDescription,
  };
}

export default async function ElectricFurnacePage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getElectricFurnaceBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="ELECTRIC FURNACE SERVICES"
      breadcrumb={[
        { label: "Heating", href: "/heating" },
        { label: "Electric Furnace", href: "/heating/electric-furnace" },
        { label: entry.name, href: `/heating/electric-furnace/${entry.slug}` },
      ]}
      relatedServices={getElectricFurnaces()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "⚡",
          title: item.name,
          desc: item.metaDescription,
          href: `/heating/electric-furnace/${item.slug}`,
        }))}
    />
  );
}
