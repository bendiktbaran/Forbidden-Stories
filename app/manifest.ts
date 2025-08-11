import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Forbidden Stories - Deine persönliche Liebesgeschichte",
    short_name: "Forbidden Stories",
    description:
      "Erstelle deine persönliche spicy Liebesgeschichte – mit dir und deinem Crush in der Hauptrolle, optional mit passenden Bildern.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0D0D",
    theme_color: "#610017",
    orientation: "portrait",
    categories: ["entertainment", "books", "lifestyle", "personalization"],
    lang: "de",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  }
}
