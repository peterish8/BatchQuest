"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Swords, Users, Trophy, Star, Clock, Target, Crown, Shield, Flame, Plus, Search, Play } from "lucide-react"

export function QuizBattle() {
  const [activeTab, setActiveTab] = useState<"solo" | "1v1" | "2v2" | "create">("solo")
  const [searchQuery, setSearchQuery] = useState("")

  const friends = [
    { id: 1, name: "Arjun Kumar", avatar: "/placeholder.svg?height=40&width=40", level: 15, xp: 2340, online: true },
    { id: 2, name: "Priya Sharma", avatar: "/placeholder.svg?height=40&width=40", level: 12, xp: 1890, online: true },
    { id: 3, name: "Rohit Singh", avatar: "/placeholder.svg?height=40&width=40", level: 18, xp: 3120, online: false },
    { id: 4, name: "Sneha Patel", avatar: "/placeholder.svg?height=40&width=40", level: 14, xp: 2100, online: true },
  ]

  const recentBattles = [
    { opponent: "Arjun Kumar", result: "won", score: "8/10", xp: "+150", time: "2 hours ago" },
    { opponent: "Priya Sharma", result: "lost", score: "6/10", xp: "+75", time: "1 day ago" },
    { opponent: "Team Alpha", result: "won", score: "15/20", xp: "+200", time: "2 days ago" },
  ]

  const availableQuizzes = [
    { id: 1, title: "Mathematics - Algebra Basics", difficulty: "Easy", questions: 10, time: "5 min", xp: 100 },
    { id: 2, title: "Science - Motion & Force", difficulty: "Medium", questions: 15, time: "8 min", xp: 150 },
    { id: 3, title: "English - Grammar Quiz", difficulty: "Easy", questions: 12, time: "6 min", xp: 120 },
    { id: 4, title: "History - Ancient India", difficulty: "Hard", questions: 20, time: "12 min", xp: 200 },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Quiz Battles</h2>
        <p className="text-gray-300">Challenge yourself and friends in competitive quizzes</p>
      </div>

      {/* Battle Mode Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <Button
          variant={activeTab === "solo" ? "default" : "outline"}
          onClick={() => setActiveTab("solo")}
          className={`flex items-center gap-2 ${activeTab === "solo" ? "neon-button neon-blue" : "glass-dark border-white/20 text-white hover:bg-white/10"}`}
        >
          <Target className="w-4 h-4" />
          Solo Practice
        </Button>
        <Button
          variant={activeTab === "1v1" ? "default" : "outline"}
          onClick={() => setActiveTab("1v1")}
          className={`flex items-center gap-2 ${activeTab === "1v1" ? "neon-button neon-blue" : "glass-dark border-white/20 text-white hover:bg-white/10"}`}
        >
          <Swords className="w-4 h-4" />
          1v1 Battle
        </Button>
        <Button
          variant={activeTab === "2v2" ? "default" : "outline"}
          onClick={() => setActiveTab("2v2")}
          className={`flex items-center gap-2 ${activeTab === "2v2" ? "neon-button neon-blue" : "glass-dark border-white/20 text-white hover:bg-white/10"}`}
        >
          <Users className="w-4 h-4" />
          2v2 Team
        </Button>
        <Button
          variant={activeTab === "create" ? "default" : "outline"}
          onClick={() => setActiveTab("create")}
          className={`flex items-center gap-2 ${activeTab === "create" ? "neon-button neon-blue" : "glass-dark border-white/20 text-white hover:bg-white/10"}`}
        >
          <Plus className="w-4 h-4" />
          Create Quiz
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "solo" && (
            <div className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400 text-glow-blue">
                    <Target className="w-5 h-5" />
                    Solo Practice Quizzes
                  </CardTitle>
                  <CardDescription className="text-gray-300">Practice and earn XP at your own pace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableQuizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="flex items-center justify-between p-4 glass-dark rounded-lg hover:bg-white/5"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{quiz.title}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {quiz.time}
                            </span>
                            <span>{quiz.questions} questions</span>
                            <Badge
                              variant="secondary"
                              className={`glass-dark border-white/20 ${
                                quiz.difficulty === "Easy"
                                  ? "text-green-400"
                                  : quiz.difficulty === "Medium"
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }`}
                            >
                              {quiz.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="w-4 h-4" />
                              <span className="font-medium">{quiz.xp} XP</span>
                            </div>
                          </div>
                          <Button size="sm" className="neon-button neon-blue">
                            <Play className="w-3 h-3 mr-1" />
                            Start
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "1v1" && (
            <div className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400 text-glow-red">
                    <Swords className="w-5 h-5" />
                    1v1 Quiz Battles
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Challenge friends to head-to-head quiz duels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search friends..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 glass-dark border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10"
                      />
                      <Button
                        variant="outline"
                        className="glass-dark border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {friends
                        .filter((friend) => friend.online)
                        .map((friend) => (
                          <div key={friend.id} className="flex items-center justify-between p-4 glass-dark rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {friend.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                              </div>
                              <div>
                                <div className="font-medium text-white">{friend.name}</div>
                                <div className="text-sm text-gray-300">
                                  Level {friend.level} • {friend.xp} XP
                                </div>
                              </div>
                            </div>
                            <Button size="sm" className="neon-button neon-pink">
                              <Swords className="w-3 h-3 mr-1" />
                              Challenge
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "2v2" && (
            <div className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400 text-glow-purple">
                    <Users className="w-5 h-5" />
                    2v2 Team Battles
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Form teams and compete against other pairs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-8 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900/50">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">Form Your Team</h3>
                      <p className="text-gray-300 mb-4">Invite a friend to join your team for 2v2 battles</p>
                      <Button className="neon-button neon-purple">
                        <Plus className="w-4 h-4 mr-2" />
                        Invite Teammate
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 text-white">Active Team Battles</h4>
                      <div className="space-y-3">
                        <div className="p-4 glass-dark rounded-lg border border-purple-400/30">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Shield className="w-5 h-5 text-purple-400" />
                              <span className="font-medium text-white">Team Alpha vs Team Beta</span>
                            </div>
                            <Badge className="bg-purple-500 text-white">Live</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="font-medium text-purple-400">Your Team</div>
                              <div className="text-purple-300">You + Arjun Kumar</div>
                            </div>
                            <div>
                              <div className="font-medium text-purple-400">Opponents</div>
                              <div className="text-purple-300">Priya + Rohit</div>
                            </div>
                          </div>
                          <Button size="sm" className="neon-button neon-purple mt-3">
                            <Play className="w-3 h-3 mr-1" />
                            Join Battle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "create" && (
            <div className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400 text-glow-green">
                    <Plus className="w-5 h-5" />
                    Create Custom Quiz
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Design your own quiz for friends to challenge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Quiz Title</label>
                      <Input
                        placeholder="Enter quiz title..."
                        className="glass-dark border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                        <Input
                          placeholder="Mathematics"
                          className="glass-dark border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Difficulty</label>
                        <Input
                          placeholder="Medium"
                          className="glass-dark border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                      <Input
                        placeholder="Brief description of the quiz..."
                        className="glass-dark border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10"
                      />
                    </div>
                    <Button className="w-full neon-button neon-green">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Battle Stats */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400 text-glow-yellow">
                <Trophy className="w-5 h-5" />
                Battle Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Win Rate</span>
                  <span className="font-bold text-green-400">75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Total Battles</span>
                  <span className="font-bold text-white">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Current Streak</span>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-orange-400">5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Best Score</span>
                  <span className="font-bold text-blue-400">18/20</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Battles */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Recent Battles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBattles.map((battle, index) => (
                  <div key={index} className="flex items-center justify-between p-3 glass-dark rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-white">{battle.opponent}</div>
                      <div className="text-xs text-gray-300">{battle.time}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-medium ${battle.result === "won" ? "text-green-400" : "text-red-400"}`}
                      >
                        {battle.result === "won" ? "Won" : "Lost"}
                      </div>
                      <div className="text-xs text-gray-300">{battle.score}</div>
                    </div>
                    <Badge variant="secondary" className="glass-dark border-white/20 text-gray-300 ml-2">
                      {battle.xp}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400 text-glow-yellow">
                <Crown className="w-5 h-5" />
                Weekly Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Arjun Kumar", xp: 3450, avatar: "/placeholder.svg?height=32&width=32" },
                  { rank: 2, name: "You", xp: 2890, avatar: "/placeholder.svg?height=32&width=32" },
                  { rank: 3, name: "Priya Sharma", xp: 2650, avatar: "/placeholder.svg?height=32&width=32" },
                  { rank: 4, name: "Rohit Singh", xp: 2340, avatar: "/placeholder.svg?height=32&width=32" },
                ].map((player) => (
                  <div key={player.rank} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        player.rank === 1
                          ? "bg-yellow-500 text-white"
                          : player.rank === 2
                            ? "bg-gray-400 text-white"
                            : player.rank === 3
                              ? "bg-orange-500 text-white"
                              : "bg-gray-700 text-gray-300" // Darker background for other ranks
                      }`}
                    >
                      {player.rank}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${player.name === "You" ? "text-blue-400" : "text-white"}`}>
                        {player.name}
                      </div>
                      <div className="text-xs text-gray-300">{player.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
