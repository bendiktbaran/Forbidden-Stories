import ContentSection from "@/components/ContentSection"

export default function CommunityPage() {
  return (
    <main className="min-h-screen relative overflow-hidden py-12 md:py-16 px-4">
      <div className="absolute inset-0 hero-background" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <ContentSection
          title="Community"
          description="Entdecke Tipps, Inspiration und Beispiele der Forbidden Stories Community."
        />
        <ContentSection
          title="Folge uns"
          description="Bleib auf dem Laufenden – neue Tropes, Beispiele und Features zuerst auf unseren Socials."
        >
          <div className="flex gap-4 text-sm text-gray-300">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-forbidden-gold">📸 Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-forbidden-gold">🎵 TikTok</a>
          </div>
        </ContentSection>
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Share,
  Search,
  TrendingUp,
  Clock,
  Star,
  Users,
  BookOpen,
  Eye,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CommunityStory {
  id: string
  title: string
  author: string
  authorAvatar: string
  excerpt: string
  tags: string[]
  likes: number
  comments: number
  views: number
  rating: number
  isLiked: boolean
  createdAt: string
  coverImage: string
  spiceLevel: "PG-13" | "Fade to Black" | "Explicit"
}

const TRENDING_STORIES: CommunityStory[] = [
  {
    id: "1",
    title: "Midnight in Manhattan",
    author: "RoseWriter",
    authorAvatar: "/user-avatar-1.png",
    excerpt:
      "Als CEO Alexander mich in sein Penthouse einlud, wusste ich nicht, dass diese Nacht mein Leben für immer verändern würde...",
    tags: ["CEO Romance", "Penthouse", "Enemies to Lovers"],
    likes: 1247,
    comments: 89,
    views: 5420,
    rating: 4.8,
    isLiked: false,
    createdAt: "vor 2 Stunden",
    coverImage: "/story-cover-manhattan.png",
    spiceLevel: "Explicit",
  },
  {
    id: "2",
    title: "Verbotene Liebe im Büro",
    author: "PassionQueen",
    authorAvatar: "/user-avatar-2.png",
    excerpt: "Mein neuer Boss war alles, was ich mir gewünscht hatte - und alles, was verboten war...",
    tags: ["Office Romance", "Forbidden Love", "Boss/Employee"],
    likes: 892,
    comments: 156,
    views: 3210,
    rating: 4.6,
    isLiked: true,
    createdAt: "vor 5 Stunden",
    coverImage: "/story-cover-office.png",
    spiceLevel: "Fade to Black",
  },
  {
    id: "3",
    title: "Strandnächte in Santorini",
    author: "SunsetDreamer",
    authorAvatar: "/user-avatar-3.png",
    excerpt: "Der griechische Sommer, das türkisblaue Meer und er - perfekter hätte mein Urlaub nicht werden können...",
    tags: ["Vacation Romance", "Beach", "Slow Burn"],
    likes: 654,
    comments: 73,
    views: 2890,
    rating: 4.9,
    isLiked: false,
    createdAt: "vor 1 Tag",
    coverImage: "/story-cover-santorini.png",
    spiceLevel: "PG-13",
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("trending")
  const [stories, setStories] = useState(TRENDING_STORIES)

  const handleLike = (storyId: string) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? {
              ...story,
              isLiked: !story.isLiked,
              likes: story.isLiked ? story.likes - 1 : story.likes + 1,
            }
          : story,
      ),
    )
  }

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case "PG-13":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Fade to Black":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Explicit":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-romance-purple to-romance-red">
      <div className="absolute inset-0 bg-[url('/community-background.png')] bg-cover bg-center opacity-10" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-romance-gold hover:bg-romance-gold/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-playfair text-3xl font-bold gradient-text">Community</h1>
              <p className="text-gray-300">Entdecke und teile leidenschaftliche Geschichten</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="glass-panel mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Suche nach Geschichten, Autoren oder Tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/30 border-white/20 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedFilter === "trending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("trending")}
                    className={
                      selectedFilter === "trending"
                        ? "bg-romance-gold text-black"
                        : "border-white/30 text-white hover:bg-white/10"
                    }
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </Button>
                  <Button
                    variant={selectedFilter === "newest" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("newest")}
                    className={
                      selectedFilter === "newest"
                        ? "bg-romance-gold text-black"
                        : "border-white/30 text-white hover:bg-white/10"
                    }
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Neueste
                  </Button>
                  <Button
                    variant={selectedFilter === "top" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("top")}
                    className={
                      selectedFilter === "top"
                        ? "bg-romance-gold text-black"
                        : "border-white/30 text-white hover:bg-white/10"
                    }
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Top Rated
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-panel">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-romance-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">12.4K</div>
                <div className="text-sm text-gray-300">Aktive Autoren</div>
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-romance-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">89.2K</div>
                <div className="text-sm text-gray-300">Geschichten</div>
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 text-romance-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2.1M</div>
                <div className="text-sm text-gray-300">Likes</div>
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardContent className="p-4 text-center">
                <Eye className="w-8 h-8 text-romance-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">45.7M</div>
                <div className="text-sm text-gray-300">Views</div>
              </CardContent>
            </Card>
          </div>

          {/* Story Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Card key={story.id} className="glass-panel hover:romantic-glow transition-all duration-300 group">
                <div className="relative">
                  <Image
                    src={story.coverImage || "/placeholder.svg"}
                    alt={story.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-lg" />
                  <Badge className={`absolute top-3 right-3 ${getSpiceLevelColor(story.spiceLevel)}`}>
                    {story.spiceLevel}
                  </Badge>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-playfair text-lg font-semibold text-white mb-1 line-clamp-1">{story.title}</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={story.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{story.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-300">{story.author}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{story.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {story.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-romance-gold/30 text-romance-gold">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {story.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {story.rating}
                      </div>
                    </div>
                    <span>{story.createdAt}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(story.id)}
                        className={`p-2 ${story.isLiked ? "text-red-400" : "text-gray-400"} hover:text-red-400`}
                      >
                        <Heart className={`w-4 h-4 ${story.isLiked ? "fill-current" : ""}`} />
                        <span className="ml-1">{story.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-white">
                        <MessageCircle className="w-4 h-4" />
                        <span className="ml-1">{story.comments}</span>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-romance-gold">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-romance-gold text-romance-gold hover:bg-romance-gold/20 bg-transparent"
            >
              Mehr Geschichten laden
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
