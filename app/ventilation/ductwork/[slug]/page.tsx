import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDuctworkBySlug,
  getDuctworks,
} from "@/lib/ductworks";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getDuctworks().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getDuctworkBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.titleTag,
    description: entry.metaDescription,
  };
}

export default async function DuctworkPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getDuctworkBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="DUCTWORK SERVICES"
      breadcrumb={[
        { label: "Ventilation", href: "/ventilation" },
        { label: "Ductwork", href: "/ventilation/ductwork" },
        { label: entry.name, href: `/ventilation/ductwork/${entry.slug}` },
      ]}
      relatedServices={getDuctworks()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "▤",
          title: item.name,
          desc: item.metaDescription,
          href: `/ventilation/ductwork/${item.slug}`,
        }))}
    />
  );
}
