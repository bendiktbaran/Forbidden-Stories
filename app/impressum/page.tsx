import ContentSection from "@/components/ContentSection"

export default function ImpressumPage() {
  return (
    <main className="min-h-screen relative overflow-hidden py-12 md:py-16 px-4">
      <div className="absolute inset-0 hero-background" />
      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <ContentSection
          title="Impressum"
          description="Verantwortlich für den Inhalt: Forbidden Stories. Kontakt: kontakt@forbidden-stories.app"
        />
      </div>
    </main>
  )
}


