import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { OrganizationJsonLd } from "@/components/seo/StructuredData";
import { siteConfig, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "पंडित सुमित शर्मा जी | उज्जैन में पूजा, अनुष्ठान एवं वैदिक ज्योतिष", template: "%s | पंडित सुमित शर्मा जी" },
  description: siteConfig.description,
  keywords: ["Pandit Sumit Sharma Ji", "Ujjain puja", "Ujjain pandit", "वैदिक ज्योतिष", "पूजा अनुष्ठान"],
  authors: [{ name: siteConfig.name }], creator: siteConfig.name, publisher: siteConfig.name,
  openGraph: { type: "website", locale: "hi_IN", url: "/", siteName: siteConfig.name, title: "पंडित सुमित शर्मा जी | उज्जैन में पूजा, अनुष्ठान एवं वैदिक ज्योतिष", description: siteConfig.description, images: [{ url: "/ujjain-hero-ai.png", width: 1200, height: 630, alt: siteConfig.hindiName }] },
  twitter: { card: "summary_large_image", title: siteConfig.hindiName, description: siteConfig.description, images: ["/ujjain-hero-ai.png"] }, icons: { icon: "/G1.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="hi"><body className="min-h-full"><OrganizationJsonLd /><AppShell>{children}</AppShell></body></html>;
}
