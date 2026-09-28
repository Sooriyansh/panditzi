
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import ClientReviews from "@/components/ReviewClients";
import FAQSection from "@/components/FAQ";
import LandingAnimation from "@/components/LandingPage";

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
