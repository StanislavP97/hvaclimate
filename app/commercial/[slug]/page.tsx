import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCommercialBySlug,
  getCommercials,
} from "@/lib/commercials";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCommercials().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCommercialBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.titleTag,
    description: entry.metaDescription,
  };
}

export default async function CommercialSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getCommercialBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="COMMERCIAL HVAC"
      breadcrumb={[
        { label: "Commercial", href: "/commercial" },
        { label: entry.name, href: `/commercial/${entry.slug}` },
      ]}
      relatedServices={getCommercials()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "🏢",
          title: item.name,
          desc: item.metaDescription,
          href: `/commercial/${item.slug}`,
        }))}
    />
  );
}
