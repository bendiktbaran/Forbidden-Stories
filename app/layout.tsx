import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

import "./globals.css"
import StructuredData from "./structured-data"

export const metadata: Metadata = {
  title: "Forbidden Stories - Deine persönliche Liebesgeschichte | Spicy Romance Stories",
  description:
    "Erstelle deine persönliche spicy Liebesgeschichte – mit dir und deinem Crush in der Hauptrolle, optional mit passenden Bildern. Forbidden Romance Generator.",
  keywords:
    "Liebesgeschichte, Forbidden Romance, Spicy Story Generator, Romance, Erotische Geschichten, Personalisierte Liebesgeschichten",
  authors: [{ name: "Forbidden Stories" }],
  creator: "Forbidden Stories",
  publisher: "Forbidden Stories",
  manifest: "/manifest.json",
  themeColor: "#610017",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Forbidden Stories",
    startupImage: ["/icon-192x192.png"],
  },
  formatDetection: { telephone: false },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://forbidden-stories.app",
    title: "Forbidden Stories - Deine persönliche Liebesgeschichte",
    description: "Erstelle deine persönliche spicy Liebesgeschichte – mit dir und deinem Crush in der Hauptrolle.",
    siteName: "Forbidden Stories",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forbidden Stories - Deine persönliche Liebesgeschichte",
    description: "Erstelle deine persönliche spicy Liebesgeschichte – mit dir und deinem Crush in der Hauptrolle.",
  },
  alternates: { canonical: "https://forbidden-stories.app" },
  icons: { apple: "/icon-192x192.png" },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <ClientLayout attribute="class" defaultTheme="system" enableSystem>
          <StructuredData />
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
