import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAcRepairBySlug, getAcRepairs } from "@/lib/ac-repairs";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAcRepairs().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getAcRepairBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.titleTag,
    description: entry.metaDescription,
  };
}

export default async function AcRepairPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getAcRepairBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="AC REPAIR SERVICES"
      breadcrumb={[
        { label: "Air Conditioner", href: "/air-conditioner" },
        { label: "Repair", href: "/air-conditioner/repair" },
        { label: entry.name, href: `/air-conditioner/repair/${entry.slug}` },
      ]}
      relatedServices={getAcRepairs()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "❄",
          title: item.name,
          desc: item.metaDescription,
          href: `/air-conditioner/repair/${item.slug}`,
        }))}
    />
  );
}
