export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://venkatverse.vercel.app";

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Venkatesan D",
    jobTitle: "Lead Application Developer",
    url: siteUrl,
    image: `${siteUrl}/profile.png`,
    email: "mailto:venkatvs131@gmail.com",
    telephone: "+91-96882-13541",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/Venkatesandk",
      "https://linkedin.com/in/venkatesan-devaraj",
      "https://www.instagram.com/_s_i_n_g_l_e_b_o_i",
    ],
    knowsAbout: [
      "PHP",
      "CodeIgniter",
      "MySQL",
      "JavaScript",
      "Next.js",
      "ERP",
      "AWS",
      "AI Integration",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Venkatverse",
    url: siteUrl,
    description:
      "Portfolio of Venkatesan D — Lead Application Developer specializing in PHP, CodeIgniter, ERP & AI.",
    author: { "@type": "Person", name: "Venkatesan D" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
