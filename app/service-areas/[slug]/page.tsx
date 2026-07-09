import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServiceAreaBySlug,
  getServiceAreas,
} from "@/lib/service-areas";
import { ServiceDetailLayout } from "@/components/services/ServiceDetailLayout";
import { OtherServiceAreas } from "@/components/services/OtherServiceAreas";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getServiceAreas().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getServiceAreaBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.titleTag,
    description: entry.metaDescription,
  };
}

export default async function ServiceAreaSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getServiceAreaBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <ServiceDetailLayout
      entry={entry}
      eyebrow="SERVICE AREAS"
      breadcrumb={[
        { label: "Service Areas", href: "/service-areas" },
        { label: entry.name, href: `/service-areas/${entry.slug}` },
      ]}
      relatedServices={getServiceAreas()
        .filter((item) => item.slug !== entry.slug)
        .slice(0, 3)
        .map((item) => ({
          icon: "📍",
          title: item.name,
          desc: item.metaDescription,
          href: `/service-areas/${item.slug}`,
        }))}
      extraSection={<OtherServiceAreas currentSlug={entry.slug} />}
    />
  );
}
