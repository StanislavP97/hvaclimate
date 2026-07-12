import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getRebateProgramBySlug,
  getRebatePrograms,
} from "@/lib/rebate-programs";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";
import { RelatedRebatePrograms } from "@/components/services/RelatedRebatePrograms";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getRebatePrograms().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getRebateProgramBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.titleTag,
    description: entry.metaDescription,
  };
}

export default async function RebateProgramSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getRebateProgramBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="REBATE PROGRAMS"
      breadcrumb={[
        { label: "Rebate Programs", href: "/rebate-programs" },
        { label: entry.name, href: `/rebate-programs/${entry.slug}` },
      ]}
      relatedServices={getRebatePrograms()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "🏷",
          title: item.name,
          desc: item.metaDescription,
          href: `/rebate-programs/${item.slug}`,
        }))}
      extraSection={<RelatedRebatePrograms currentSlug={entry.slug} />}
    />
  );
}
