import { developer, services } from "@/data/portfolio";
import { getExperiencePlusLabel } from "@/lib/experience";

export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? developer.siteUrl;
  const expPlus = getExperiencePlusLabel();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: developer.name,
    jobTitle: developer.role,
    url: siteUrl,
    image: `${siteUrl}/profile.png`,
    email: `mailto:${developer.email}`,
    telephone: "+91-96882-13541",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    worksFor: {
      "@type": "Organization",
      name: "eNova Software and Hardware Solutions Pvt. Ltd.",
    },
    sameAs: [
      developer.social.github,
      developer.social.linkedin,
      developer.social.instagram,
    ],
    knowsAbout: [
      "PHP 7/8",
      "CodeIgniter 3/4",
      "MySQL",
      "Enterprise ERP Architecture",
      "REST API Development",
      "LMS Integration",
      "HRMS & Payroll",
      "Biometric Attendance Integration",
      "React",
      "Next.js",
      "Python",
      "Ollama",
      "vLLM",
      "AWS EC2 & S3",
    ],
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${developer.name} — Enterprise PHP, ERP & AI Engineering`,
    url: siteUrl,
    image: `${siteUrl}/profile.png`,
    email: developer.email,
    telephone: "+91-96882-13541",
    areaServed: ["India", "Remote Worldwide"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    provider: {
      "@type": "Person",
      name: developer.name,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering Services",
      itemListElement: services.slice(0, 6).map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Venkatverse",
    url: siteUrl,
    description: `Portfolio of ${developer.name} — ${developer.role} with ${expPlus} experience in PHP, CodeIgniter, enterprise ERP, LMS, HRMS & private AI (Ollama / vLLM).`,
    author: { "@type": "Person", name: developer.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalService).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
