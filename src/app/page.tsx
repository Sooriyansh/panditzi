
import { generatePageMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import ClientReviews from "@/components/ReviewClients";
import FAQSection from "@/components/FAQ";
import LandingAnimation from "@/components/LandingPage";

export const metadata = generatePageMetadata({
  title: "उज्जैन में पूजा, अनुष्ठान एवं वैदिक ज्योतिष",
  description: "पंडित सुमित शर्मा जी से उज्जैन में पूजा, वैदिक अनुष्ठान और ज्योतिषीय मार्गदर्शन की जानकारी पाएँ।",
  path: "/",
});

export default function Home() {
  return (
    <>
      <LandingAnimation />
      <Hero />
      <HomeAbout />
      <ServicesSection />
      <GallerySection />
      <ClientReviews />
      <FAQSection />
    </>
  );
}
