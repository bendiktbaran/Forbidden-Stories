"use client"

import type React from "react"
import { Playfair_Display, Inter } from "next/font/google"
import "../app/globals.css" // Corrected path for globals.css
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"
import { useState } from "react"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 forbidden-glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-forbidden-gold pulse-glow" />
            <span className="font-playfair text-2xl font-bold forbidden-text">Forbidden Stories</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/community" className="text-gray-300 hover:text-forbidden-gold transition-colors font-medium">
              Community
            </Link>
            <Link href="/profil" className="text-gray-300 hover:text-forbidden-gold transition-colors font-medium">
              Profil
            </Link>
            <Link href="/story-erstellen">
              <Button className="forbidden-button px-6 py-2">Story erstellen</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu öffnen"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-white/10">
            <Link
              href="/community"
              className="block text-gray-300 hover:text-forbidden-gold transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/profil"
              className="block text-gray-300 hover:text-forbidden-gold transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Profil
            </Link>
            <Link href="/story-erstellen" onClick={() => setIsMenuOpen(false)}>
              <Button className="forbidden-button w-full py-3">Story erstellen</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${playfair.variable} ${inter.variable} min-h-screen font-inter pt-20`}>
      <Navigation />
      {children}
    </div>
  )
}
