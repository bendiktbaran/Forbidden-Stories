import ContentSection from "@/components/ContentSection"

export default function BeispielePage() {
  return (
    <main className="min-h-screen relative overflow-hidden py-12 md:py-16 px-4">
      <div className="absolute inset-0 hero-background" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <ContentSection
          title="Beispiele"
          description="Kleine Kostproben – so klingen personalisierte Forbidden Romance Stories unterschiedlicher Intensitäten."
        />
        <ContentSection
          title="Romantisch (🌸)"
          description="Zärtliche, gefühlvolle Szenen mit Fokus auf Emotion und Nähe."
        />
        <ContentSection
          title="Leidenschaftlich (🔥)"
          description="Intensive Momente, prickelnde Spannung und spürbare Chemie."
        />
        <ContentSection
          title="Explizit (🔥🔥🔥)"
          description="Ungezügelte Leidenschaft und sinnliche Details – wenn du es willst."
        />
      </div>
    </main>
  )
}


