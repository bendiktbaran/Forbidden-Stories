import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://forbidden-stories.app"
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/create`, lastModified: new Date() },
    { url: `${base}/story-erstellen`, lastModified: new Date() },
    { url: `${base}/community`, lastModified: new Date() },
    { url: `${base}/beispiele`, lastModified: new Date() },
  ]
}


