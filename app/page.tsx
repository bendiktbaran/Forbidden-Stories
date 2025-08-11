"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sparkles, Download, Eye, Flame, Crown, Lock, Shield, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// Removed import { TestimonialCard } from "@/components/testimonial-card"

export default function HomePage() {
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      text: "Diese Story hat mich völlig mitgerissen... Ich konnte nicht aufhören zu lesen! 🔥",
      author: "Sarah, 28",
      rating: 5,
    },
    {
      text: "Endlich eine Plattform, die meine geheimsten Fantasien zum Leben erweckt.",
      author: "Lisa, 24",
      rating: 5,
    },
    {
      text: "Die Geschichten sind perfekt auf mich zugeschnitten. Jede Geschichte ist einzigartig!",
      author: "Emma, 31",
      rating: 5,
    },
  ]

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setIsInstallable(false)
      }
      setDeferredPrompt(null)
    }
  }

  return (
    <>
      {/* Install prompt */}
      <div className="absolute top-4 left-4 right-4 z-50">
        {isInstallable && (
          <Card className="forbidden-glass border-forbidden-gold/30 slide-up">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-forbidden-gold" />
                <span className="text-sm">Installiere die App für das ultimative Erlebnis</span>
              </div>
              <Button onClick={handleInstall} size="sm" className="forbidden-button">
                Installieren
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="min-h-screen relative overflow-hidden">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 hero-background" />
        <div className="absolute inset-0 floating-hearts" />

        {/* Mysterious silhouettes overlay */}
        <div className="absolute inset-0 opacity-5">
          <Image src="/mysterious-silhouettes.png" alt="Forbidden Romance" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            {/* Hero Section */}
            <div className="space-y-8 slide-up">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Crown className="w-10 h-10 text-forbidden-gold pulse-glow" />
                <h1 className="font-playfair text-5xl md:text-7xl font-bold forbidden-text">Forbidden Stories</h1>
                <Lock className="w-10 h-10 text-forbidden-gold pulse-glow" />
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl text-white font-light leading-tight">
                  Deine geheimste <span className="font-playfair font-semibold forbidden-text">Liebesgeschichte</span>
                  <br />
                  wird Realität
                </h2>

                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
                  Lass dir deine ganz persönliche{" "}
                  <span className="text-forbidden-gold font-semibold">spicy Romance</span> schreiben – mit dir und
                  deinem Crush in der Hauptrolle. Verboten. Leidenschaftlich. Unvergesslich.
                </p>
              </div>

              {/* Primary CTA */}
              <div className="space-y-4">
                <Link href="/create">
                  <Button size="lg" className="forbidden-button text-xl px-12 py-6 pulse-glow">
                    <Flame className="w-6 h-6 mr-3" />
                    Jetzt Story erstellen
                  </Button>
                </Link>
                <p className="text-sm text-gray-400">✨ Kostenlos • 🔒 Anonym • 🔥 Personalisiert</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 my-16 fade-in-delayed">
              <Card className="forbidden-glass hover:passion-glow transition-all duration-500 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="relative">
                    <Heart className="w-16 h-16 text-forbidden-gold mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-forbidden-gold rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-forbidden-black" />
                    </div>
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-white">Du bist die Königin</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Personalisiert mit deinem Namen, Aussehen und Traumpartner.
                    <span className="text-forbidden-gold font-medium"> Du stehst im Mittelpunkt.</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="forbidden-glass hover:passion-glow transition-all duration-500 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="relative">
                    <Flame className="w-16 h-16 text-forbidden-gold mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">🔥</span>
                    </div>
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-white">Deine Fantasie</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Wähle Setting, Spice-Level und Intensität.
                    <span className="text-forbidden-gold font-medium"> Von romantisch bis explizit.</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="forbidden-glass hover:passion-glow transition-all duration-500 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="relative">
                    <Eye className="w-16 h-16 text-forbidden-gold mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-forbidden-gold" />
                    </div>
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-white">Visuelle Magie</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Passende Bilder zu deinen intimsten Szenen.
                    <span className="text-forbidden-gold font-medium"> Sieh deine Geschichte.</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Spice Level Preview */}
            <div className="space-y-8 fade-in-delayed">
              <h3 className="font-playfair text-3xl font-semibold text-white">
                Wähle deine <span className="forbidden-text">Intensität</span>
              </h3>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="forbidden-glass border-pink-500/30 hover:border-pink-500/60 transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="text-4xl">🌸</div>
                    <h4 className="font-semibold text-pink-400">Romantisch</h4>
                    <p className="text-sm text-gray-300">Zärtliche Berührungen, süße Küsse</p>
                  </CardContent>
                </Card>

                <Card className="forbidden-glass border-orange-500/30 hover:border-orange-500/60 transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="text-4xl">🔥</div>
                    <h4 className="font-semibold text-orange-400">Leidenschaftlich</h4>
                    <p className="text-sm text-gray-300">Intensive Momente, heiße Szenen</p>
                  </CardContent>
                </Card>

                <Card className="forbidden-glass border-red-500/30 hover:border-red-500/60 transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="text-4xl">🔥🔥🔥</div>
                    <h4 className="font-semibold text-red-500">Explizit</h4>
                    <p className="text-sm text-gray-300">Ungezügelte Leidenschaft, alle Details</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-8 fade-in-delayed">
              <h3 className="font-playfair text-3xl font-semibold text-white">
                Was unsere <span className="forbidden-text">Leserinnen</span> sagen
              </h3>

              <Card className="forbidden-glass max-w-2xl mx-auto">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-forbidden-gold text-forbidden-gold" />
                    ))}
                  </div>

                  <blockquote className="text-xl italic text-gray-200 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  <cite className="text-forbidden-gold font-medium">— {testimonials[currentTestimonial].author}</cite>
                </CardContent>
              </Card>
            </div>

            {/* Age Verification */}
            <Card id="age-verification" className="forbidden-glass max-w-lg mx-auto pulse-glow">
              <CardContent className="p-10 text-center space-y-8">
                <div className="space-y-4">
                  <Shield className="w-20 h-20 text-forbidden-gold mx-auto" />
                  <h2 className="font-playfair text-3xl font-semibold text-white">Altersverifikation</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Diese Plattform enthält explizite Inhalte für Erwachsene.
                    <br />
                    <span className="text-forbidden-gold font-medium">Bist du 18 Jahre oder älter?</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-gray-500 text-gray-300 hover:bg-gray-800 bg-transparent py-3"
                    >
                      Nein - Zurück zur Startseite
                    </Button>
                  </Link>
                  <Link href="/create" className="flex-1">
                    <Button className="w-full forbidden-button py-3 text-lg font-semibold">
                      <Flame className="w-5 h-5 mr-2" />
                      Ja - Story erstellen
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Footer Info */}
            <div className="text-center text-gray-400 text-sm space-y-3 mt-16 fade-in-delayed">
              <div className="flex justify-center items-center space-x-6 text-xs">
                <span>🔒 SSL-verschlüsselt</span>
                <span>🗑️ Auto-Löschung nach 24h</span>
                <span>📱 PWA für alle Geräte</span>
              </div>
              <p className="max-w-2xl mx-auto leading-relaxed">
                DSGVO-Hinweis: Alle Daten werden verschlüsselt und nach 24h automatisch gelöscht.
              </p>
              <div className="flex justify-center space-x-4 text-xs">
                <Link href="/datenschutz" className="hover:text-forbidden-gold transition-colors">
                  Datenschutz
                </Link>
                <Link href="/impressum" className="hover:text-forbidden-gold transition-colors">
                  Impressum
                </Link>
                <Link href="/kontakt" className="hover:text-forbidden-gold transition-colors">
                  Kontakt
                </Link>
                <Link href="/agb" className="hover:text-forbidden-gold transition-colors">
                  AGB
                </Link>
              </div>
              <div className="flex justify-center space-x-4 text-xs">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-forbidden-gold transition-colors" aria-label="Instagram">
                  📸 Instagram
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-forbidden-gold transition-colors" aria-label="TikTok">
                  🎵 TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Removed TestimonialCard */}
    </>
  )
}
