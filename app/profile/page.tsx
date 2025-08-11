"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, BookmarkPlus, Settings, Edit, BookOpen, Eye, Star, ArrowLeft, Camera, Save } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface UserStory {
  id: string
  title: string
  excerpt: string
  coverImage: string
  likes: number
  views: number
  comments: number
  rating: number
  createdAt: string
  isPublic: boolean
}

interface BookmarkedStory {
  id: string
  title: string
  author: string
  coverImage: string
  rating: number
  createdAt: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Sarah Romance",
    bio: "Leidenschaftliche Leserin und Autorin von Romance-Geschichten. Liebe es, in andere Welten einzutauchen und intensive Charaktere zu erschaffen.",
    avatar: "/user-profile-avatar.png",
    followers: 1247,
    following: 892,
    storiesCount: 23,
    totalLikes: 15420,
  })

  const [userStories] = useState<UserStory[]>([
    {
      id: "1",
      title: "Meine Nacht mit dem CEO",
      excerpt: "Eine leidenschaftliche Begegnung, die alles veränderte...",
      coverImage: "/user-story-1.png",
      likes: 342,
      views: 1250,
      comments: 28,
      rating: 4.7,
      createdAt: "vor 3 Tagen",
      isPublic: true,
    },
    {
      id: "2",
      title: "Verbotene Liebe am Strand",
      excerpt: "Santorini, Sonnenuntergang und er...",
      coverImage: "/user-story-2.png",
      likes: 189,
      views: 890,
      comments: 15,
      rating: 4.5,
      createdAt: "vor 1 Woche",
      isPublic: false,
    },
  ])

  const [bookmarkedStories] = useState<BookmarkedStory[]>([
    {
      id: "1",
      title: "Midnight in Manhattan",
      author: "RoseWriter",
      coverImage: "/story-cover-manhattan.png",
      rating: 4.8,
      createdAt: "vor 2 Stunden",
    },
    {
      id: "2",
      title: "Verbotene Liebe im Büro",
      author: "PassionQueen",
      coverImage: "/story-cover-office.png",
      rating: 4.6,
      createdAt: "vor 5 Stunden",
    },
  ])

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile changes
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-romance-purple to-romance-red">
      <div className="absolute inset-0 bg-[url('/profile-background.png')] bg-cover bg-center opacity-10" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/community">
              <Button variant="ghost" size="icon" className="text-romance-gold hover:bg-romance-gold/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="font-playfair text-3xl font-bold gradient-text">Mein Profil</h1>
              <p className="text-gray-300">Verwalte deine Geschichten und Einstellungen</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="border-romance-gold text-romance-gold hover:bg-romance-gold/20 bg-transparent"
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? "Speichern" : "Bearbeiten"}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="space-y-6">
              <Card className="glass-panel">
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-romance-gold text-black hover:bg-romance-gold/90"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-black/30 border-white/20 text-white text-center"
                      />
                      <Textarea
                        value={profile.bio}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        className="bg-black/30 border-white/20 text-white"
                        rows={4}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-playfair text-2xl font-bold text-white mb-2">{profile.name}</h2>
                      <p className="text-gray-300 text-sm mb-4">{profile.bio}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-romance-gold">{profile.followers.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Follower</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-romance-gold">{profile.following.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Folge ich</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-playfair text-lg text-romance-gold">Statistiken</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-romance-gold" />
                      <span className="text-white">Geschichten</span>
                    </div>
                    <span className="font-semibold text-white">{profile.storiesCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-romance-gold" />
                      <span className="text-white">Gesamt Likes</span>
                    </div>
                    <span className="font-semibold text-white">{profile.totalLikes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-romance-gold" />
                      <span className="text-white">Gesamt Views</span>
                    </div>
                    <span className="font-semibold text-white">45.2K</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-panel">
                <CardContent className="p-4 space-y-3">
                  <Link href="/create">
                    <Button className="w-full bg-romance-gold text-black hover:bg-romance-gold/90">
                      Neue Story erstellen
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Einstellungen
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="stories" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-black/30">
                  <TabsTrigger
                    value="stories"
                    className="data-[state=active]:bg-romance-gold data-[state=active]:text-black"
                  >
                    Meine Geschichten
                  </TabsTrigger>
                  <TabsTrigger
                    value="bookmarks"
                    className="data-[state=active]:bg-romance-gold data-[state=active]:text-black"
                  >
                    Gespeichert
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="data-[state=active]:bg-romance-gold data-[state=active]:text-black"
                  >
                    Aktivität
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stories" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {userStories.map((story) => (
                      <Card key={story.id} className="glass-panel hover:romantic-glow transition-all duration-300">
                        <div className="relative">
                          <Image
                            src={story.coverImage || "/placeholder.svg"}
                            alt={story.title}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-lg" />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <Badge
                              className={
                                story.isPublic ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                              }
                            >
                              {story.isPublic ? "Öffentlich" : "Privat"}
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="font-playfair text-lg font-semibold text-white mb-1">{story.title}</h3>
                          </div>
                        </div>

                        <CardContent className="p-4">
                          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{story.excerpt}</p>

                          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {story.views}
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
                              <div className="flex items-center gap-1 text-gray-400">
                                <Heart className="w-4 h-4" />
                                {story.likes}
                              </div>
                              <div className="flex items-center gap-1 text-gray-400">
                                <BookmarkPlus className="w-4 h-4" />
                                {story.comments}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-romance-gold">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="bookmarks" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {bookmarkedStories.map((story) => (
                      <Card key={story.id} className="glass-panel hover:romantic-glow transition-all duration-300">
                        <div className="flex gap-4 p-4">
                          <Image
                            src={story.coverImage || "/placeholder.svg"}
                            alt={story.title}
                            width={80}
                            height={120}
                            className="w-20 h-30 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-playfair text-lg font-semibold text-white mb-1">{story.title}</h3>
                            <p className="text-gray-400 text-sm mb-2">von {story.author}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400" />
                                {story.rating}
                              </div>
                              <span>{story.createdAt}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-romance-gold text-black hover:bg-romance-gold/90">
                                Lesen
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                              >
                                Entfernen
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <Card className="glass-panel">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-romance-gold rounded-full mt-2"></div>
                          <div>
                            <p className="text-white">
                              Du hast <span className="text-romance-gold">Midnight in Manhattan</span> geliked
                            </p>
                            <p className="text-sm text-gray-400">vor 2 Stunden</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-romance-gold rounded-full mt-2"></div>
                          <div>
                            <p className="text-white">
                              Du folgst jetzt <span className="text-romance-gold">RoseWriter</span>
                            </p>
                            <p className="text-sm text-gray-400">vor 5 Stunden</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-romance-gold rounded-full mt-2"></div>
                          <div>
                            <p className="text-white">
                              Deine Geschichte <span className="text-romance-gold">Meine Nacht mit dem CEO</span> hat 50
                              neue Likes erhalten
                            </p>
                            <p className="text-sm text-gray-400">vor 1 Tag</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
