import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAcTuneupBySlug,
  getAcTuneups,
} from "@/lib/ac-tuneups";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";
import { pageMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAcTuneups().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getAcTuneupBySlug(slug);

  if (!entry) {
    return {};
  }

  return pageMetadata({
    title: entry.titleTag,
    description: entry.metaDescription,
    path: `/air-conditioner/tune-up/${entry.slug}`,
  });
}

export default async function AcTuneupPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getAcTuneupBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="AC TUNE-UP"
      breadcrumb={[
        { label: "Air Conditioner", href: "/air-conditioner" },
        { label: "Tune-up", href: "/air-conditioner/tune-up" },
        { label: entry.name, href: `/air-conditioner/tune-up/${entry.slug}` },
      ]}
      relatedServices={getAcTuneups()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "✦",
          title: item.name,
          desc: item.metaDescription,
          href: `/air-conditioner/tune-up/${item.slug}`,
        }))}
    />
  );
}
