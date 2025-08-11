"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, BookmarkPlus, Flag, ArrowLeft, Send, Star, Eye, ThumbsUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Comment {
  id: string
  author: string
  authorAvatar: string
  content: string
  likes: number
  createdAt: string
  isLiked: boolean
}

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "LoveReader23",
      authorAvatar: "/user-avatar-4.png",
      content:
        "Wow, diese Geschichte hat mich völlig mitgerissen! Die Spannung zwischen den Charakteren ist so authentisch geschrieben. Mehr davon! 🔥❤️",
      likes: 24,
      createdAt: "vor 3 Stunden",
      isLiked: false,
    },
    {
      id: "2",
      author: "RomanceAddict",
      authorAvatar: "/user-avatar-5.png",
      content:
        "Ich liebe es, wie du die Emotionen beschreibst. Man kann förmlich die Chemie zwischen ihnen spüren. Wann kommt das nächste Kapitel?",
      likes: 18,
      createdAt: "vor 5 Stunden",
      isLiked: true,
    },
    {
      id: "3",
      author: "StoryLover",
      authorAvatar: "/user-avatar-6.png",
      content:
        "Das Setting ist perfekt gewählt! Manhattan bei Nacht als Kulisse für diese intensive Begegnung - einfach magisch. Danke für diese wunderbare Geschichte!",
      likes: 31,
      createdAt: "vor 1 Tag",
      isLiked: false,
    },
  ])

  const story = {
    id: params.id,
    title: "Midnight in Manhattan",
    author: "RoseWriter",
    authorAvatar: "/user-avatar-1.png",
    authorBio:
      "Leidenschaftliche Autorin von Dark Romance Geschichten. Liebe es, intensive Charaktere und verbotene Begegnungen zu erschaffen.",
    followers: 2847,
    coverImage: "/story-cover-manhattan.png",
    tags: ["CEO Romance", "Penthouse", "Enemies to Lovers", "Manhattan", "Dark Romance"],
    likes: 1247,
    comments: comments.length,
    views: 5420,
    rating: 4.8,
    spiceLevel: "Explicit" as const,
    createdAt: "vor 2 Stunden",
    chapters: 3,
    content: `Als CEO Alexander mich in sein Penthouse einlud, wusste ich nicht, dass diese Nacht mein Leben für immer verändern würde...

Die Aufzugtüren öffneten sich mit einem leisen Ding, und ich betrat das luxuriöse Penthouse. Die Lichter von Manhattan funkelten wie Diamanten durch die bodentiefen Fenster, aber meine Aufmerksamkeit galt nur ihm.

Alexander stand mit dem Rücken zu mir, ein Glas Whiskey in der Hand, seine breiten Schultern unter dem maßgeschneiderten Anzug gespannt. Als er sich umdrehte, trafen seine stahlgrauen Augen die meinen, und ich spürte, wie mein Herz einen Schlag aussetzte.

"Du bist gekommen," sagte er mit seiner tiefen, samtigen Stimme, die mir eine Gänsehaut über die Arme jagte.

"Du hast mich eingeladen," antwortete ich, überrascht von der Festigkeit meiner eigenen Stimme.

Er lächelte - ein gefährliches, verführerisches Lächeln, das meine Knie weich werden ließ. "Das habe ich. Aber ich war mir nicht sicher, ob du den Mut haben würdest zu kommen."

"Mut?" Ich hob eine Augenbraue. "Oder Dummheit?"

Sein Lachen war dunkel und sexy. "Vielleicht beides."

Er kam näher, und mit jedem Schritt stieg die Spannung zwischen uns. Die Luft knisterte förmlich vor Elektrizität...`,
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment,
      ),
    )
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "Du",
        authorAvatar: "/user-avatar-default.png",
        content: newComment,
        likes: 0,
        createdAt: "gerade eben",
        isLiked: false,
      }
      setComments((prev) => [comment, ...prev])
      setNewComment("")
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: story.title,
        text: `Schau dir diese großartige Romance-Story an: ${story.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Show toast notification
    }
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
      <div className="absolute inset-0 bg-[url('/story-detail-background.png')] bg-cover bg-center opacity-10" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/community">
              <Button variant="ghost" size="icon" className="text-romance-gold hover:bg-romance-gold/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="font-playfair text-3xl font-bold gradient-text">{story.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={story.authorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{story.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-300">{story.author}</span>
                </div>
                <Badge className={getSpiceLevelColor(story.spiceLevel)}>{story.spiceLevel}</Badge>
                <span className="text-gray-400 text-sm">{story.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Story Cover & Stats */}
              <Card className="glass-panel">
                <div className="relative">
                  <Image
                    src={story.coverImage || "/placeholder.svg"}
                    alt={story.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-lg" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {story.views.toLocaleString()} Views
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {story.rating} Rating
                      </div>
                      <div className="flex items-center gap-1">
                        <BookmarkPlus className="w-4 h-4" />
                        {story.chapters} Kapitel
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-romance-gold/30 text-romance-gold">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        onClick={handleLike}
                        className={`${isLiked ? "text-red-400" : "text-gray-400"} hover:text-red-400`}
                      >
                        <Heart className={`w-5 h-5 mr-2 ${isLiked ? "fill-current" : ""}`} />
                        {story.likes + (isLiked ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" className="text-gray-400 hover:text-white">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {story.comments}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        onClick={handleBookmark}
                        className={`${isBookmarked ? "text-romance-gold" : "text-gray-400"} hover:text-romance-gold`}
                      >
                        <BookmarkPlus className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="ghost" onClick={handleShare} className="text-gray-400 hover:text-romance-gold">
                        <Share className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" className="text-gray-400 hover:text-red-400">
                        <Flag className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Story Content */}
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-romance-gold">Kapitel 1: Die Einladung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="story-text whitespace-pre-line">{story.content}</div>
                  <div className="mt-6 p-4 bg-romance-gold/10 border border-romance-gold/30 rounded-lg">
                    <p className="text-sm text-gray-300 text-center">
                      📖 Dies ist nur ein Auszug.{" "}
                      <Link href="/create" className="text-romance-gold hover:underline">
                        Erstelle deine eigene personalisierte Version
                      </Link>{" "}
                      dieser Geschichte!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-romance-gold">
                    Kommentare ({comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Comment */}
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Schreibe einen Kommentar..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-black/30 border-white/20 text-white min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                        className="bg-romance-gold text-black hover:bg-romance-gold/90"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Kommentar senden
                      </Button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-black/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-white">{comment.author}</span>
                              <span className="text-sm text-gray-400">{comment.createdAt}</span>
                            </div>
                            <p className="text-gray-300 mb-3">{comment.content}</p>
                            <div className="flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCommentLike(comment.id)}
                                className={`p-1 ${comment.isLiked ? "text-romance-gold" : "text-gray-400"} hover:text-romance-gold`}
                              >
                                <ThumbsUp className={`w-4 h-4 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                                {comment.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="p-1 text-gray-400 hover:text-white">
                                Antworten
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Info */}
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-playfair text-lg text-romance-gold">Über die Autorin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={story.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{story.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{story.author}</h3>
                      <p className="text-sm text-gray-400">{story.followers.toLocaleString()} Follower</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{story.authorBio}</p>
                  <Button className="w-full bg-romance-gold text-black hover:bg-romance-gold/90">Folgen</Button>
                </CardContent>
              </Card>

              {/* Related Stories */}
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-playfair text-lg text-romance-gold">Ähnliche Geschichten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <Image
                        src={`/related-story-${i}.png`}
                        alt={`Related story ${i}`}
                        width={60}
                        height={80}
                        className="w-15 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm line-clamp-2">Verbotene Nächte im Büro</h4>
                        <p className="text-xs text-gray-400 mt-1">von PassionQueen</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-red-400" />
                            <span className="text-xs text-gray-400">892</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-gray-400">4.6</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-panel">
                <CardContent className="p-4 space-y-3">
                  <Link href="/create">
                    <Button className="w-full bg-romance-gold text-black hover:bg-romance-gold/90">
                      Eigene Story erstellen
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    Story-Sammlung erstellen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
