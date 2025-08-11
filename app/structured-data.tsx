export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Forbidden Stories",
    description:
      "Erstelle deine persönliche spicy Liebesgeschichte mit KI – mit dir und deinem Crush in der Hauptrolle, optional mit passenden Bildern.",
    url: "https://forbidden-stories.app",
    inLanguage: "de",
    genre: ["Romance", "Erotik", "Forbidden Romance"],
    publisher: {
      "@type": "Organization",
      name: "Forbidden Stories",
    },
    author: {
      "@type": "Organization",
      name: "Forbidden Stories",
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}


