import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAcInstallationBySlug,
  getAcInstallations,
} from "@/lib/ac-installations";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAcInstallations().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getAcInstallationBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.titleTag,
    description: entry.metaDescription,
  };
}

export default async function AcInstallationPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getAcInstallationBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="AC INSTALLATION"
      breadcrumb={[
        { label: "Air Conditioner", href: "/air-conditioner" },
        { label: "Installation", href: "/air-conditioner/installation" },
        {
          label: entry.name,
          href: `/air-conditioner/installation/${entry.slug}`,
        },
      ]}
      relatedServices={getAcInstallations()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "❄",
          title: item.name,
          desc: item.metaDescription,
          href: `/air-conditioner/installation/${item.slug}`,
        }))}
    />
  );
}
