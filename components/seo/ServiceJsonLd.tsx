import { SITE_URL, BUSINESS_NAME, BUSINESS_AREA_SERVED } from "@/lib/site";

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    areaServed: BUSINESS_AREA_SERVED.map((areaName) => ({
      "@type": "City",
      name: areaName,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
