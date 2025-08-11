"use client"

import { useCallback, useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Flame, Images } from "lucide-react"
import Image from "next/image"

type SpiceLevel = "romantisch" | "leidenschaftlich" | "explizit"

export default function CreatePage() {
  const [nameUser, setNameUser] = useState("")
  const [genderUser, setGenderUser] = useState("weiblich")
  const [nameCrush, setNameCrush] = useState("")
  const [genderCrush, setGenderCrush] = useState("männlich")

  const [setting, setSetting] = useState("Büro")
  const [spice, setSpice] = useState<SpiceLevel>("leidenschaftlich")
  const [relationship, setRelationship] = useState("Affäre")
  const [tropes, setTropes] = useState<string[]>([])
  const [lengthType, setLengthType] = useState("Kurzgeschichte")

  const [withImages, setWithImages] = useState(false)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [crushPhoto, setCrushPhoto] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [story, setStory] = useState<string>("")
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const spiceEmoji = useMemo(() => {
    if (spice === "romantisch") return "🌸"
    if (spice === "explizit") return "🔥🔥🔥"
    return "🔥"
  }, [spice])

  const toggleTrope = (value: string) => {
    setTropes((prev) => (prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]))
  }

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>, who: "user" | "crush") => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        if (who === "user") setUserPhoto(reader.result)
        else setCrushPhoto(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }, [])

  const handleFile = (file: File, who: "user" | "crush") => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        if (who === "user") setUserPhoto(reader.result)
        else setCrushPhoto(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const buildPrompt = () => {
    const selectedTropes = tropes.length ? tropes.join(", ") : "keine Präferenz"
    const spiceText = spice === "romantisch" ? "🌸 Romantisch" : spice === "explizit" ? "🔥🔥🔥 Explizit" : "🔥 Leidenschaftlich"
    return [
      "Du bist ein professioneller Romance- und Erotik-Autor, der Bestseller wie \"Fifty Shades of Grey\", \"365 Tage\" oder \"Verity\" schreibt.",
      "Schreibe eine spannende, leidenschaftliche und sexy Geschichte im Stil einer \"Forbidden Romance\", in der der Leser/die Leserin selbst die Hauptfigur ist.",
      "Verwende folgende Parameter:",
      `- Hauptfigur: ${nameUser || "[Name Nutzer]"}, Geschlecht: ${genderUser}`,
      `- Love Interest: ${nameCrush || "[Name Crush]"}, Geschlecht: ${genderCrush}`,
      `- Setting: ${setting}`,
      `- Spice-Level: ${spiceText}`,
      `- Beziehung: ${relationship}`,
      `- Tropes: ${selectedTropes}`,
      `- Länge: ${lengthType}`,
      "Schreibe in der Ich-Perspektive aus Sicht der Hauptfigur.",
      "Erzeuge abwechslungsreiche Dialoge, sinnliche Beschreibungen und eine emotionale Spannungskurve.",
      "Passe den Stil so an, dass es sich wie ein bekannter Romance-Bestseller liest.",
      "Keine Geschichte darf der vorherigen zu sehr ähneln.",
    ].join("\n")
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    setStory("")
    setGeneratedImages([])
    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: buildPrompt(),
          model: "kayra-v1",
          parameters: { max_length: 1000, temperature: 0.85, top_p: 0.9, min_length: 200 },
        }),
      })
      if (!res.ok) throw new Error("Story-Generierung fehlgeschlagen")
      const data = await res.json()
      const storyText = data.story || data.output || data.text || ""
      setStory(storyText)

      if (withImages) {
        const promptImage = `Realistische erotische Szene mit ${nameUser || "der Hauptfigur"} (${genderUser}) und ${nameCrush || "dem Love Interest"} (${genderCrush}) im Setting ${setting}. Stimmung: ${spiceEmoji}.` 
        const imgRes = await fetch("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: promptImage,
            negative_prompt: "unscharf, hässlich, cartoon, verzerrt",
            width: 512,
            height: 768,
            steps: 30,
            inputImages: [userPhoto, crushPhoto].filter(Boolean),
          }),
        })
        if (imgRes.ok) {
          const imgData = await imgRes.json()
          const imgs: string[] = imgData.images || []
          setGeneratedImages(imgs)
        }
      }
    } catch (e: any) {
      setError(e.message || "Unbekannter Fehler")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-10 md:py-14">
      <div className="absolute inset-0 hero-background" />
      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="font-playfair forbidden-text text-4xl md:text-5xl font-bold">Deine Forbidden Romance</h1>
          <p className="text-gray-300">Fülle die Felder aus und erhalte deine persönliche spicy Liebesgeschichte.</p>
        </div>

        <Card className="forbidden-glass">
          <CardContent className="p-4 md:p-6">
            <Tabs defaultValue="characters" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="characters">Charaktere</TabsTrigger>
                <TabsTrigger value="story">Story-Details</TabsTrigger>
                <TabsTrigger value="images">Bilder (optional)</TabsTrigger>
              </TabsList>

              <TabsContent value="characters" className="space-y-6 pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nameUser">Name des Nutzers</Label>
                    <Input id="nameUser" placeholder="Dein Name" value={nameUser} onChange={(e) => setNameUser(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Geschlecht des Nutzers</Label>
                    <Select value={genderUser} onValueChange={setGenderUser}>
                      <SelectTrigger>
                        <SelectValue placeholder="Geschlecht wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weiblich">weiblich</SelectItem>
                        <SelectItem value="männlich">männlich</SelectItem>
                        <SelectItem value="divers">divers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nameCrush">Name des Crush</Label>
                    <Input id="nameCrush" placeholder="Name deines Crush" value={nameCrush} onChange={(e) => setNameCrush(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Geschlecht des Crush</Label>
                    <Select value={genderCrush} onValueChange={setGenderCrush}>
                      <SelectTrigger>
                        <SelectValue placeholder="Geschlecht wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weiblich">weiblich</SelectItem>
                        <SelectItem value="männlich">männlich</SelectItem>
                        <SelectItem value="divers">divers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="story" className="space-y-6 pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Setting</Label>
                    <Select value={setting} onValueChange={setSetting}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ort wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Büro","Strand","Uni","geheim","Urlaub","Club","Hotel","Party","Bibliothek","Penthouse"
                        ].map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Spice-Level</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button type="button" variant={spice === "romantisch" ? "default" : "outline"} onClick={() => setSpice("romantisch")}>
                        🌸 Romantisch
                      </Button>
                      <Button type="button" variant={spice === "leidenschaftlich" ? "default" : "outline"} onClick={() => setSpice("leidenschaftlich")}>
                        🔥 Leidenschaftlich
                      </Button>
                      <Button type="button" variant={spice === "explizit" ? "default" : "outline"} onClick={() => setSpice("explizit")}>
                        🔥🔥🔥 Explizit
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Beziehung</Label>
                    <Select value={relationship} onValueChange={setRelationship}>
                      <SelectTrigger>
                        <SelectValue placeholder="Beziehung wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Affäre","Beziehung","geheime Liebe","Feinde zu Liebenden"
                        ].map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tropes</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Verbotene Liebe",
                        "Chef & Angestellte",
                        "Kindheitsfreunde",
                        "Feinde zu Liebenden",
                        "One Night Stand wird mehr",
                      ].map((t) => (
                        <label key={t} className="flex items-center gap-2 text-sm text-gray-200">
                          <Checkbox checked={tropes.includes(t)} onCheckedChange={() => toggleTrope(t)} />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Länge</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button type="button" variant={lengthType === "Kurzgeschichte" ? "default" : "outline"} onClick={() => setLengthType("Kurzgeschichte")}>
                        Kurzgeschichte
                      </Button>
                      <Button type="button" variant={lengthType === "Roman" ? "default" : "outline"} onClick={() => setLengthType("Roman")}>
                        Roman
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-6 pt-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-gray-200">
                    <input type="checkbox" className="size-4" checked={withImages} onChange={(e) => setWithImages(e.target.checked)} />
                    <span>Bilder zu Story-Szenen erstellen</span>
                  </label>
                  <p className="text-xs text-gray-400">Hinweis: Bilder werden nur zur Generierung verwendet und nicht gespeichert.</p>
                </div>

                {withImages && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {[{key: "user", label: "Dein Foto"}, {key: "crush", label: "Foto deines Crush"}].map((cfg) => (
                      <div key={cfg.key} className="space-y-2">
                        <Label>{cfg.label}</Label>
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => onDrop(e, cfg.key as any)}
                          className="border border-dashed border-gray-600 rounded-lg p-4 text-center text-gray-300 hover:border-forbidden-gold transition-colors"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Images className="w-6 h-6 text-forbidden-gold" />
                            <span>Drag & Drop oder Datei auswählen</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], cfg.key as any)}
                              className="text-xs"
                            />
                          </div>
                        </div>
                        {(cfg.key === "user" ? userPhoto : crushPhoto) ? (
                          <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg">
                            <Image
                              src={(cfg.key === "user" ? userPhoto : crushPhoto) as string}
                              alt="Personalisierte spicy Story"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="pt-6 flex flex-col sm:flex-row gap-3">
              <Button onClick={handleSubmit} disabled={isSubmitting} className="forbidden-button text-base px-6 py-5">
                <Flame className="w-5 h-5 mr-2" />
                {isSubmitting ? "Wird generiert…" : "Jetzt Story generieren"}
              </Button>
              <span className="text-xs text-gray-400 self-center">🔒 Daten werden verschlüsselt und nach 24h automatisch gelöscht.</span>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="forbidden-glass border-red-500/40">
            <CardContent className="p-4 text-red-300 text-sm">{error}</CardContent>
          </Card>
        )}

        {story && (
          <Card className="forbidden-glass">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-playfair forbidden-text text-2xl">Deine Geschichte</h3>
              <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">{story}</div>
            </CardContent>
          </Card>
        )}

        {!!generatedImages.length && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedImages.map((src, i) => (
              <div key={i} className="relative w-full aspect-[2/3] overflow-hidden rounded-lg forbidden-glass">
                <Image src={src} alt="KI Liebesgeschichte Bild" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
 
