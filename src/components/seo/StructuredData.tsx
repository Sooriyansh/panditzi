import { absoluteUrl, siteConfig } from "@/lib/seo";
import { pujaServicePath, type PujaService } from "@/data/puja-services";

function JsonLd({ data }: { data: Record<string, unknown> }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />; }

export function OrganizationJsonLd() { return <JsonLd data={{ "@context": "https://schema.org", "@type": "LocalBusiness", "@id": `${siteConfig.url}/#business`, name: siteConfig.name, alternateName: siteConfig.hindiName, url: siteConfig.url, image: absoluteUrl("/ujjain-hero-ai.png"), telephone: siteConfig.phone, email: siteConfig.email, areaServed: { "@type": "City", name: "Ujjain" }, address: { "@type": "PostalAddress", addressLocality: "Ujjain", addressRegion: "Madhya Pradesh", addressCountry: "IN" }, sameAs: [siteConfig.instagram] }} />; }

export function ServiceJsonLd({ service }: { service: PujaService }) {
  const path = pujaServicePath(service);
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.overview, image: absoluteUrl(service.image), url: absoluteUrl(path), provider: { "@id": `${siteConfig.url}/#business` }, areaServed: { "@type": "City", name: "Ujjain" } }} /><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "होम", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "पूजा सेवाएँ", item: absoluteUrl("/puja-services") }, { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(path) }] }} /><JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} /></>;
}
