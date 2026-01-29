export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Domus Italínea",
  description: "Móveis planejados que criam projetos de felicidade",
  url: "https://domusitalinea.com.br",
  logo: "https://domusitalinea.com.br/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-11-5011-1524",
    contactType: "customer service",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
  sameAs: [
    "https://www.facebook.com/domusitalinea",
    "https://www.instagram.com/domusitalinea",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://domusitalinea.com.br",
  name: "Domus Italínea",
  description: "Móveis planejados de alto padrão",
  image: "https://domusitalinea.com.br/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Eng. George Corbisier, 802 - Jabaquara - São Paulo",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "04345-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 0,
    longitude: 0,
  },
  telephone: "+55-11-91464-5322",
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Móveis Planejados",
  provider: {
    "@type": "LocalBusiness",
    name: "Domus Italínea",
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de Móveis Planejados",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cozinha Planejada",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dormitório Planejado",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Living Planejado",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Home Office Planejado",
        },
      },
    ],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Domus Italínea",
  url: "https://domusitalinea.com.br",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://domusitalinea.com.br/?s={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};
