import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getGasFurnaces } from "@/lib/gas-furnaces";
import { getElectricFurnaces } from "@/lib/electric-furnaces";
import { getAcRepairs } from "@/lib/ac-repairs";
import { getAcInstallations } from "@/lib/ac-installations";
import { getAcTuneups } from "@/lib/ac-tuneups";
import { getDuctworks } from "@/lib/ductworks";
import { getVentCleanings } from "@/lib/vent-cleanings";
import { getCommercials } from "@/lib/commercials";
import { getServiceAreas } from "@/lib/service-areas";
import { getRebatePrograms } from "@/lib/rebate-programs";
import { getBlogPosts } from "@/lib/blog-posts";
import { getBlogCategories } from "@/lib/blog-categories";

const STATIC_ROUTES = [
  "",
  "/about",
  "/contact",
  "/privacy-policy",
  "/instant-quote",
  "/blog",
  "/heating",
  "/air-conditioning",
  "/ventilation",
  "/commercial",
];

function collectionEntries(
  slugs: string[],
  prefix: string,
): MetadataRoute.Sitemap {
  return slugs.map((slug) => ({
    url: `${SITE_URL}${prefix}/${slug}`,
    lastModified: new Date(),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  return [
    ...staticEntries,
    ...collectionEntries(
      getGasFurnaces().map((e) => e.slug),
      "/heating/gas-furnace",
    ),
    ...collectionEntries(
      getElectricFurnaces().map((e) => e.slug),
      "/heating/electric-furnace",
    ),
    ...collectionEntries(
      getAcRepairs().map((e) => e.slug),
      "/air-conditioner/repair",
    ),
    ...collectionEntries(
      getAcInstallations().map((e) => e.slug),
      "/air-conditioner/installation",
    ),
    ...collectionEntries(
      getAcTuneups().map((e) => e.slug),
      "/air-conditioner/tune-up",
    ),
    ...collectionEntries(
      getDuctworks().map((e) => e.slug),
      "/ventilation/ductwork",
    ),
    ...collectionEntries(
      getVentCleanings().map((e) => e.slug),
      "/ventilation/vent-cleaning",
    ),
    ...collectionEntries(getCommercials().map((e) => e.slug), "/commercial"),
    ...collectionEntries(
      getServiceAreas().map((e) => e.slug),
      "/service-areas",
    ),
    ...collectionEntries(
      getRebatePrograms().map((e) => e.slug),
      "/rebate-programs",
    ),
    ...collectionEntries(
      getBlogPosts().map((e) => e.slug),
      "/blog",
    ),
    ...collectionEntries(
      getBlogCategories().map((e) => e.slug),
      "/blog-post-categories",
    ),
  ];
}
