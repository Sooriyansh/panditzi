import type { Metadata } from "next";
import type { ReactNode } from "react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "ज्योतिष एवं पूजा परामर्श बुक करें | उज्जैन",
  description: "कुंडली, पूजा, अनुष्ठान या सामान्य मार्गदर्शन के लिए पंडित सुमित शर्मा जी से परामर्श का अनुरोध भेजें।",
  path: "/book-consultation",
});

export default function BookConsultationLayout({ children }: { children: ReactNode }) {
  return children;
}
