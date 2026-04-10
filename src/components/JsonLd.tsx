export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AskBodhi",
    url: "https://askbodhi.com",
    logo: "https://askbodhi.com/logo.svg",
    description:
      "AI-led growth consultancy specializing in SEO, Generative Engine Optimization (GEO), custom AI engines, and digital diagnostics.",
    founder: {
      "@type": "Person",
      name: "Rajul",
      jobTitle: "Founder & Lead Consultant",
    },
    areaServed: [
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Place", name: "Global" },
    ],
    knowsAbout: [
      "Search Engine Optimization",
      "Generative Engine Optimization",
      "Artificial Intelligence",
      "AI Consulting",
      "Digital Marketing",
      "Content Strategy",
    ],
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@knowesg.com",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AskBodhi",
    url: "https://askbodhi.com",
    description:
      "AI-Led Growth for Forward-Thinking Companies. SEO & GEO optimization, custom AI engines, digital diagnostics, and growth strategy.",
    publisher: {
      "@type": "Organization",
      name: "AskBodhi",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AskBodhi",
    url: "https://askbodhi.com",
    description:
      "AI-led growth consultancy offering SEO & GEO optimization, custom AI engine development, digital diagnostics, and growth strategy.",
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Growth Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & GEO Optimization",
            description:
              "Technical SEO audits, content strategy, and Generative Engine Optimization to get cited by ChatGPT, Perplexity, and Google AI Overviews.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom AI Engines",
            description:
              "Domain-specific AI engines for product recommendations, content generation, and performance optimization.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Diagnostics",
            description:
              "Comprehensive traffic architecture breakdowns revealing what percentage of organic traffic drives revenue.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Growth Strategy",
            description:
              "Content strategy, conversion optimization, paid search advisory, and competitive analysis.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
