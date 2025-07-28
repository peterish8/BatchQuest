"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Flame, Zap, Target, Clock, BookOpen, Calendar, TrendingUp, Users, Edit } from "lucide-react"

interface ProfilePageProps {
  userStats: {
    xp: number
    level: number
    streak: number
    completedTopics: number
    totalTopics: number
    studyTime: string
    quizzesCompleted: number
    rank: number
  }
}

export function ProfilePage({ userStats }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first topic",
      icon: Target,
      unlocked: true,
      xp: 25,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "Complete 25 quizzes",
      icon: Trophy,
      unlocked: true,
      xp: 100,
      date: "2024-02-20",
    },
    {
      id: 3,
      title: "Week Warrior",
      description: "Maintain a 7-day study streak",
      icon: Flame,
      unlocked: true,
      xp: 150,
      date: "2024-03-01",
    },
    {
      id: 4,
      title: "Speed Demon",
      description: "Complete a quiz in under 2 minutes",
      icon: Zap,
      unlocked: false,
      xp: 75,
      date: null,
    },
    {
      id: 5,
      title: "Social Butterfly",
      description: "Win 10 quiz battles",
      icon: Users,
      unlocked: false,
      xp: 200,
      date: null,
    },
  ]

  const pets = [
    {
      id: 1,
      name: "Study Dragon",
      type: "Dragon",
      unlocked: true,
      level: 5,
      xpToNext: 200,
      currentXP: 150,
      emoji: "🐉",
    },
    {
      id: 2,
      name: "Wisdom Owl",
      type: "Owl",
      unlocked: true,
      level: 3,
      xpToNext: 100,
      currentXP: 75,
      emoji: "🦉",
    },
    {
      id: 3,
      name: "Lightning Cat",
      type: "Cat",
      unlocked: false,
      level: 1,
      xpToNext: 500,
      currentXP: 0,
      emoji: "⚡🐱",
    },
  ]

  const characters = [
    {
      id: 1,
      name: "Astro Explorer",
      type: "Humanoid",
      unlocked: true,
      level: 10,
      xpToNext: 300,
      currentXP: 250,
      emoji: "🧑‍🚀",
    },
    {
      id: 2,
      name: "Cyber Ninja",
      type: "Humanoid",
      unlocked: false,
      level: 1,
      xpToNext: 400,
      currentXP: 0,
      emoji: "🥷",
    },
    {
      id: 3,
      name: "Mystic Mage",
      type: "Humanoid",
      unlocked: true,
      level: 7,
      xpToNext: 250,
      currentXP: 180,
      emoji: "🧙",
    },
  ]

  const studyHistory = [
    { date: "2024-03-15", subject: "Mathematics", time: "45 min", xp: 75 },
    { date: "2024-03-14", subject: "Science", time: "30 min", xp: 50 },
    { date: "2024-03-13", subject: "English", time: "60 min", xp: 100 },
    { date: "2024-03-12", subject: "Mathematics", time: "25 min", xp: 40 },
    { date: "2024-03-11", subject: "Social Science", time: "35 min", xp: 60 },
  ]

  const xpToNextLevel = userStats.level * 200 - (userStats.xp % (userStats.level * 200))
  const levelProgress = ((userStats.xp % (userStats.level * 200)) / (userStats.level * 200)) * 100

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="text-2xl">PD</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{userStats.level}</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <h1 className="text-2xl font-bold text-white">Prathick Dhanes</h1>
                <Button
                  size="sm"
                  variant="outline"
                  className="glass-dark border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </div>
              <p className="text-gray-300 mb-4">Grade 10 CBSE Student • Rank #{userStats.rank}</p>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Level {userStats.level} Progress</span>
                  <span className="text-sm font-medium text-white">{xpToNextLevel} XP to next level</span>
                </div>
                <Progress value={levelProgress} className="h-3" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="font-bold text-yellow-400">{userStats.xp}</span>
                  </div>
                  <div className="text-xs text-gray-300">Total XP</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-orange-400">{userStats.streak}</span>
                  </div>
                  <div className="text-xs text-gray-300">Day Streak</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-purple-400">{achievements.filter((a) => a.unlocked).length}</span>
                  </div>
                  <div className="text-xs text-gray-300">Achievements</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 glass-dark p-2 rounded-full">
          <TabsTrigger
            value="overview"
            className={`neon-button ${activeTab === "overview" ? "neon-blue" : "glass-dark border-white/20 text-white hover:bg-white/10"}`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className={`neon-button ${activeTab === "achievements" ? "neon-blue" : "glass-dark border-white/20 text-white hover:bg-white/10"}`}
          >
            Achievements
          </TabsTrigger>
          <TabsTrigger
            value="pets"
            className={`neon-button ${activeTab === "pets" ? "neon-blue" : "glass-dark border-white/20 text-white hover:bg-white/10"}`}
          >
            Pets & Items
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className={`neon-button ${activeTab === "history" ? "neon-blue" : "glass-dark border-white/20 text-white hover:bg-white/10"}`}
          >
            Study History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400 text-glow-blue">{userStats.studyTime}</div>
                <div className="text-sm text-gray-300">Study Time</div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400 text-glow-green">{userStats.completedTopics}</div>
                <div className="text-sm text-gray-300">Topics Done</div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">{userStats.quizzesCompleted}</div>
                <div className="text-sm text-gray-300">Quizzes</div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400 text-glow-purple">
                  {Math.round((userStats.completedTopics / userStats.totalTopics) * 100)}%
                </div>
                <div className="text-sm text-gray-300">Completion</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-300">Your latest study sessions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyHistory.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 glass-dark rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{activity.subject}</div>
                        <div className="text-sm text-gray-300">{activity.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">{activity.time}</div>
                      <div className="text-sm text-yellow-400">+{activity.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <Card
                  key={achievement.id}
                  className={`glass-card ${achievement.unlocked ? "border-green-400/30" : "border-gray-700 opacity-60"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.unlocked ? "bg-green-900" : "bg-gray-800"
                        }`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${achievement.unlocked ? "text-green-400" : "text-gray-400"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white">{achievement.title}</h3>
                          {achievement.unlocked && <Badge className="bg-green-500 text-white">Unlocked</Badge>}
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-sm font-medium text-yellow-400">{achievement.xp} XP</span>
                          </div>
                          {achievement.unlocked && achievement.date && (
                            <span className="text-xs text-gray-400">
                              Unlocked {new Date(achievement.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="pets" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Your Companions</CardTitle>
              <CardDescription className="text-gray-300">Pets and characters you've collected</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium text-white mb-4">Pets</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {pets.map((pet) => (
                  <Card
                    key={pet.id}
                    className={`glass-card ${pet.unlocked ? "border-blue-400/30" : "border-gray-700 opacity-60"}`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-3">{pet.emoji}</div>
                      <h3 className="font-medium text-white mb-1">{pet.name}</h3>
                      <p className="text-sm text-gray-300 mb-3">{pet.type}</p>

                      {pet.unlocked ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white">Level {pet.level}</span>
                            <span className="text-gray-300">
                              {pet.currentXP}/{pet.xpToNext} XP
                            </span>
                          </div>
                          <Progress value={(pet.currentXP / pet.xpToNext) * 100} className="h-2" />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Badge variant="outline" className="glass-dark border-white/20 text-gray-300">
                            Locked
                          </Badge>
                          <p className="text-xs text-gray-400">Earn {pet.xpToNext} XP to unlock</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="font-medium text-white mb-4">Characters</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <Card
                    key={character.id}
                    className={`glass-card ${character.unlocked ? "border-green-400/30" : "border-gray-700 opacity-60"}`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-3">{character.emoji}</div>
                      <h3 className="font-medium text-white mb-1">{character.name}</h3>
                      <p className="text-sm text-gray-300 mb-3">{character.type}</p>

                      {character.unlocked ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white">Level {character.level}</span>
                            <span className="text-gray-300">
                              {character.currentXP}/{character.xpToNext} XP
                            </span>
                          </div>
                          <Progress value={(character.currentXP / character.xpToNext) * 100} className="h-2" />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Badge variant="outline" className="glass-dark border-white/20 text-gray-300">
                            Locked
                          </Badge>
                          <p className="text-xs text-gray-400">Earn {character.xpToNext} XP to unlock</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Study History</CardTitle>
              <CardDescription className="text-gray-300">Detailed log of your study sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyHistory.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 glass-dark rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{session.subject}</div>
                        <div className="text-sm text-gray-300">{session.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">{session.time}</div>
                      <div className="text-sm text-yellow-400">+{session.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
