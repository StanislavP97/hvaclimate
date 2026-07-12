import {
  SITE_URL,
  BUSINESS_NAME,
  BUSINESS_PHONE_TEL,
  BUSINESS_ADDRESS,
  BUSINESS_AREA_SERVED,
} from "@/lib/site";

export function LocalBusinessJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    areaServed: BUSINESS_AREA_SERVED.map((name) => ({
      "@type": "City",
      name,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
