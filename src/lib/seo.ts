import type { Metadata } from "next";
import { pujaServicePath, type PujaService } from "@/data/puja-services";

export const siteConfig = {
  name: "Pandit Sumit Sharma Ji", hindiName: "पंडित सुमित शर्मा जी",
  description: "उज्जैन से वैदिक ज्योतिष, पूजा, अनुष्ठान और ऑनलाइन पूजा बुकिंग की जानकारी।",
  location: "Ujjain, Madhya Pradesh, India", phone: "+918871928175", phoneDisplay: "8871928175",
  email: "panditsumitsharmaji1@gmail.com", instagram: "https://www.instagram.com/astrologer_.sumit_.sharma/",
  url: "https://www.pujaujjain.in",
} as const;

export const siteUrl = new URL(siteConfig.url);
export const absoluteUrl = (path = "/") => {
  const url = new URL(path, siteUrl);
  return url.pathname === "/" && !url.search && !url.hash ? siteConfig.url : url.toString();
};

type PageMetadataInput = { title: string; description: string; path: string; image?: string; noIndex?: boolean };
function canonicalPath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0].replace(/\/+$/, "");
  return pathname || "/";
}

export function generatePageMetadata({ title, description, path, image = "/ujjain-hero-ai.png", noIndex = false }: PageMetadataInput): Metadata {
  const canonical = canonicalPath(path);
  return { title, description, alternates: { canonical }, robots: noIndex ? { index: false, follow: false } : { index: true, follow: true }, openGraph: { type: "website", locale: "hi_IN", url: canonical, siteName: siteConfig.name, title, description, images: [{ url: image, width: 1200, height: 630, alt: siteConfig.hindiName }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export function generateServiceMetadata(service: PujaService): Metadata {
  return generatePageMetadata({ title: `${service.title} | उज्जैन`, description: `${service.overview} उज्जैन में पंडित सुमित शर्मा जी से संपर्क और बुकिंग की जानकारी पाएँ।`, path: pujaServicePath(service), image: service.image });
}
