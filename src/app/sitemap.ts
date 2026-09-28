import type { MetadataRoute } from "next";
import { pujaServicePath, pujaServices } from "@/data/puja-services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/puja-services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/online-puja", priority: 0.7, changeFrequency: "monthly" },
    { path: "/book-consultation", priority: 0.7, changeFrequency: "monthly" },
    { path: "/kundali-analysis", priority: 0.7, changeFrequency: "monthly" },
    { path: "/dosh-analyzer", priority: 0.7, changeFrequency: "monthly" },
    { path: "/puja-muhurat", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  ];

  return [
    ...routes.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      changeFrequency,
      priority,
    })),
    ...pujaServices.map((service) => ({
      url: absoluteUrl(pujaServicePath(service)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
