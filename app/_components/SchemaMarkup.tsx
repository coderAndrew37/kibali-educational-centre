export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "School",
    name: "Kibali Educational Centre",
    url: "https://kibali.ac.ke",
    logo: "https://kibali.ac.ke/logo.png",
    image: "https://kibali.ac.ke/og-image.jpg",
    description:
      "A premier international-standard school in Nairobi, specializing in CBC curriculum and holistic child development.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lang'ata Road, Karen South",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.332,
      longitude: 36.788,
    },
    telephone: "+254700000000",
    openingHours: "Mo-Fr 08:00-17:00",
    priceRange: "$$$",
    sameAs: [
      "https://facebook.com/kibali",
      "https://instagram.com/kibali",
      "https://linkedin.com/school/kibali",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
