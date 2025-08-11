"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Heart, ImageIcon, RefreshCw, Share, Users, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// Removed import { TestimonialCard } from "@/components/testimonial-card"

export default function GeneratedStoryPage() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const totalChapters = 3

  const storyContent = {
    title: "Verbotene Begegnung im Penthouse",
    chapters: [
      {
        title: "Kapitel 1: Der erste Blick",
        content: `Der Aufzug glitt lautlos nach oben, während Sarah nervös an ihrer Clutch spielte. Das Penthouse-Meeting war wichtig für ihre Karriere, aber sie hatte nicht erwartet, dass *er* dort sein würde.

Als sich die Türen öffneten, stand Alexander bereits wartend da. Sein dunkler Anzug betonte seine breiten Schultern, und seine grauen Augen fixierten sie mit einer Intensität, die ihr den Atem raubte.

"Sarah," sagte er mit seiner tiefen, samtigen Stimme. "Ich hatte gehofft, dich hier zu treffen."

Die Spannung zwischen ihnen war greifbar, elektrisch. Drei Jahre waren vergangen seit ihrer letzten Begegnung, aber die Anziehung war stärker denn je.

"Alexander," flüsterte sie, während er näher trat. "Wir sollten nicht..."

"Sollten nicht was?" Seine Hand strich sanft über ihre Wange. "Sollten nicht fühlen, was zwischen uns ist?"

Der Blick aus den bodentiefen Fenstern auf die glitzernde Stadt unter ihnen verschwamm, als er sie in seine Arme zog...`,
        sceneImages: [
          {
            url: "/scene-elevator-meeting.png",
            description: "Sarah und Alexander treffen sich im Penthouse-Aufzug",
            sceneType: "Erste Begegnung",
          },
          {
            url: "/scene-penthouse-tension.png",
            description: "Spannungsgeladener Moment vor den Panoramafenstern",
            sceneType: "Spannungsgeladene Momente",
          },
        ],
      },
      {
        title: "Kapitel 2: Gefährliche Nähe",
        content: `Die Geschäftsbesprechung war längst vergessen. Sarah fand sich auf der luxuriösen Ledercouch wieder, Alexanders Blick brannte auf ihrer Haut.

"Du weißt, dass das kompliziert ist," hauchte sie, während seine Finger durch ihr Haar glitten.

"Das Beste im Leben ist immer kompliziert," antwortete er und küsste sanft ihren Hals. Seine Lippen hinterließen eine Spur aus Feuer auf ihrer Haut.

Die Lichter der Stadt funkelten wie Diamanten, während sie sich in seinen Armen verlor. Jede Berührung war wie ein Versprechen, jeder Kuss wie ein Geheimnis, das nur ihnen gehörte.

"Ich habe dich vermisst," gestand er gegen ihre Lippen. "Jeden einzelnen Tag."

Sarah schloss die Augen und gab sich dem Moment hin. Morgen würde sie sich Gedanken machen. Heute Nacht gehörte nur ihnen...`,
        sceneImages: [
          {
            url: "/scene-couch-intimacy.png",
            description: "Intime Umarmung auf der Ledercouch",
            sceneType: "Intime Umarmungen",
          },
          {
            url: "/scene-passionate-kiss.png",
            description: "Leidenschaftlicher Kuss vor der Stadtkulisse",
            sceneType: "Leidenschaftliche Küsse",
          },
        ],
      },
      {
        title: "Kapitel 3: Für immer",
        content: `Als die ersten Sonnenstrahlen durch die Panoramafenster fielen, lag Sarah in Alexanders Armen. Seine Hand streichelte sanft über ihren Rücken, während sie seinem gleichmäßigen Herzschlag lauschte.

"Bleib," flüsterte er in ihr Haar. "Diesmal bleib bei mir."

Sarah hob den Kopf und sah in seine Augen. Dort fand sie alles, was sie je gesucht hatte - Liebe, Leidenschaft, Zukunft.

"Für immer?" fragte sie leise.

"Für immer," bestätigte er und küsste sie zärtlich.

Die Stadt erwachte unter ihnen, aber in ihrem Penthouse-Paradies war die Zeit stehen geblieben. Sie hatten sich gefunden, und diesmal würden sie sich nie wieder loslassen.

Ihre Liebesgeschichte hatte gerade erst begonnen...`,
        sceneImages: [
          {
            url: "/scene-morning-embrace.png",
            description: "Zärtliche Umarmung im Morgenlicht",
            sceneType: "Zärtliche Berührungen",
          },
          {
            url: "/scene-sunrise-promise.png",
            description: "Emotionaler Höhepunkt bei Sonnenaufgang",
            sceneType: "Emotionale Höhepunkte",
          },
        ],
      },
    ],
    atmosphereImages: [
      {
        url: "/atmosphere-penthouse-night.png",
        description: "Das luxuriöse Penthouse bei Nacht",
        sceneType: "Setting & Atmosphäre",
      },
    ],
  }

  const downloadStory = () => {
    const fullStory = storyContent.chapters
      .map((chapter) => `${chapter.title}\n\n${chapter.content}`)
      .join("\n\n---\n\n")

    const blob = new Blob([fullStory], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${storyContent.title}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const shareStory = async () => {
    if (navigator.share) {
      await navigator.share({
        title: storyContent.title,
        text: "Schau dir meine personalisierte Romance-Story an!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const currentChapterData = storyContent.chapters[currentChapter - 1]
  const allSceneImages = [
    ...currentChapterData.sceneImages,
    ...(currentChapter === 1 ? storyContent.atmosphereImages : []),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-romance-purple to-romance-red">
      <div className="absolute inset-0 bg-[url('/romantic-book-pages.png')] bg-cover bg-center opacity-5" />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/create">
                <Button variant="ghost" size="icon" className="text-romance-gold hover:bg-romance-gold/20">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-playfair text-3xl font-bold gradient-text">{storyContent.title}</h1>
                <p className="text-gray-300">Deine persönliche Romance-Story mit Szenen-Bildern</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={downloadStory}
                variant="outline"
                size="sm"
                className="border-romance-gold text-romance-gold hover:bg-romance-gold/20 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={shareStory}
                variant="outline"
                size="sm"
                className="border-romance-gold text-romance-gold hover:bg-romance-gold/20 bg-transparent"
              >
                <Share className="w-4 h-4 mr-2" />
                Teilen
              </Button>
            </div>
          </div>

          {/* Chapter Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              {Array.from({ length: totalChapters }, (_, i) => i + 1).map((chapter) => (
                <Button
                  key={chapter}
                  variant={currentChapter === chapter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentChapter(chapter)}
                  className={
                    currentChapter === chapter
                      ? "bg-romance-gold text-black"
                      : "border-white/30 text-white hover:bg-white/10"
                  }
                >
                  Kapitel {chapter}
                </Button>
              ))}
            </div>
          </div>

          {/* Story Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Story Text */}
            <div className="lg:col-span-2">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-romance-gold">{currentChapterData.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="story-text whitespace-pre-line">{currentChapterData.content}</div>
                </CardContent>
              </Card>

              {/* Scene Images for current chapter */}
              {allSceneImages.length > 0 && (
                <Card className="glass-panel mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-playfair text-lg text-romance-gold">
                      <Eye className="w-5 h-5" />
                      Szenen aus diesem Kapitel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {allSceneImages.map((image, index) => (
                      <div key={index} className="space-y-3">
                        <div className="relative rounded-lg overflow-hidden">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.description}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-medium text-sm">{image.description}</p>
                                <p className="text-romance-gold text-xs">{image.sceneType}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image Overview */}
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-playfair text-lg text-romance-gold">
                    <ImageIcon className="w-5 h-5" />
                    Alle Story-Bilder
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {storyContent.chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">Kapitel {chapterIndex + 1}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {chapter.sceneImages.map((image, imageIndex) => (
                          <div
                            key={imageIndex}
                            className="relative rounded overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setCurrentChapter(chapterIndex + 1)}
                          >
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={image.description}
                              width={120}
                              height={80}
                              className="w-full h-16 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute bottom-1 left-1 right-1">
                              <p className="text-xs text-white font-medium truncate">{image.sceneType}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Atmosphere Images */}
                  {storyContent.atmosphereImages.length > 0 && (
                    <div className="space-y-2 border-t border-white/10 pt-4">
                      <h4 className="text-sm font-semibold text-white">Atmosphäre</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {storyContent.atmosphereImages.map((image, index) => (
                          <div key={index} className="relative rounded overflow-hidden">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={image.description}
                              width={120}
                              height={80}
                              className="w-full h-16 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute bottom-1 left-1 right-1">
                              <p className="text-xs text-white font-medium truncate">{image.sceneType}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="glass-panel">
                <CardContent className="p-6 space-y-4">
                  <Link href="/create">
                    <Button className="w-full bg-romance-gold text-black hover:bg-romance-gold/90">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Neue Story erstellen
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Mehr Bilder generieren
                  </Button>
                  <Link href="/community">
                    <Button
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Mit Community teilen
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Image Generation Info */}
              <Card className="glass-panel">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-romance-gold mb-2">🎨 Über deine Bilder:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 7 Szenen-Bilder generiert</li>
                    <li>• Basierend auf Story-Inhalt</li>
                    <li>• Fotorealistischer Stil</li>
                    <li>• Romantische Intensität</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Chapter Navigation Bottom */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentChapter(Math.max(1, currentChapter - 1))}
              disabled={currentChapter === 1}
              className="border-white/30 text-white hover:bg-white/10 disabled:opacity-50"
            >
              Vorheriges Kapitel
            </Button>

            <div className="flex items-center gap-2 text-gray-300">
              <Heart className="w-4 h-4 text-romance-gold" />
              <span>
                {currentChapter} von {totalChapters}
              </span>
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentChapter(Math.min(totalChapters, currentChapter + 1))}
              disabled={currentChapter === totalChapters}
              className="border-white/30 text-white hover:bg-white/10 disabled:opacity-50"
            >
              Nächstes Kapitel
            </Button>
          </div>
        </div>
      </div>
      {/* Removed TestimonialCard */}
    </div>
  )
}
