import type { Metadata } from "next";
import { BUSINESS_NAME } from "@/lib/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: BUSINESS_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
