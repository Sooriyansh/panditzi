import type { MetadataRoute } from "next";
import { pujaServices } from "@/data/puja-services";
import { absoluteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/contact",
    "/online-puja",
    "/book-consultation",
    "/puja-services",
    "/kundali-analysis",
    "/dosh-analyzer",
    "/puja-muhurat",
  ];

  return [
    ...routes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.7,
    })),
    ...pujaServices.map((service) => ({
      url: absoluteUrl(`/puja-services/${service.id}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
