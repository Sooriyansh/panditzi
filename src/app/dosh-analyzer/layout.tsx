import type { Metadata } from "next";
import type { ReactNode } from "react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "दोष विश्लेषक | वैदिक ज्योतिष मार्गदर्शन",
  description: "जन्म विवरण के आधार पर पारंपरिक ज्योतिषीय दोषों की प्रारंभिक जानकारी प्राप्त करें और आगे के मार्गदर्शन के लिए परामर्श लें।",
  path: "/dosh-analyzer",
});

export default function DoshAnalyzerLayout({ children }: { children: ReactNode }) {
  return children;
}
