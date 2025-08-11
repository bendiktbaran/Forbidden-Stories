"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Testimonial {
  text: string
  author: string
  rating: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    text: "Meine Geschichte war absolut perfekt! So persönlich und fesselnd.",
    author: "Anna, 29",
    rating: 5,
  },
  {
    text: "Ich bin süchtig! Die Bilder sind unglaublich und die Storys so heiß.",
    author: "Max, 33",
    rating: 5,
  },
  {
    text: "Einfach magisch, wie die Wünsche umgesetzt werden. Ein Muss für Romance-Fans!",
    author: "Lena, 25",
    rating: 5,
  },
  {
    text: "Die Qualität der Geschichten ist erstaunlich. Jedes Mal ein neues Abenteuer!",
    author: "Julia, 30",
    rating: 5,
  },
  {
    text: "Ich liebe die Personalisierung. Es fühlt sich an, als wäre die Geschichte nur für mich geschrieben.",
    author: "Tom, 35",
    rating: 5,
  },
]

export function TestimonialCard() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000) // Change testimonial every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = TESTIMONIALS[currentTestimonialIndex]

  return (
    <Card className="glass-panel fixed bottom-4 right-4 z-40 w-72 md:w-80 lg:w-96 animate-fade-in-delayed">
      <CardContent className="p-4 text-center space-y-2">
        <div className="flex justify-center space-x-1">
          {[...Array(currentTestimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-forbidden-gold text-forbidden-gold" />
          ))}
        </div>
        <p className="text-sm italic text-gray-200 line-clamp-3">"{currentTestimonial.text}"</p>
        <cite className="text-forbidden-gold text-xs font-medium">— {currentTestimonial.author}</cite>
      </CardContent>
    </Card>
  )
}
