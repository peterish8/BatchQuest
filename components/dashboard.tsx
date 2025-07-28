"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Timer,
  Trophy,
  Users,
  Brain,
  TrendingUp,
  Zap,
  Target,
  Star,
  Clock,
  CheckCircle,
  Award,
  Flame,
  Heart,
  User,
} from "lucide-react"
import { SubjectTree } from "@/components/subject-tree"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { QuizBattle } from "@/components/quiz-battle"
import { TestScoreTracker } from "@/components/test-score-tracker"
import { ProfilePage } from "@/components/profile-page"
import { AITools } from "@/components/ai-tools"
import { ParticleBackground } from "@/components/particle-background"

interface DashboardProps {
  grade: string
}

export function Dashboard({ grade }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedStudyTopic, setSelectedStudyTopic] = useState<{ topic: string; subtopic: string } | null>(null)
  const [userStats] = useState({
    xp: 2450,
    level: 12,
    streak: 7,
    completedTopics: 45,
    totalTopics: 120,
    studyTime: "24h 30m",
    quizzesCompleted: 28,
    rank: 156,
  })

  const handleStartPomodoro = (topic: string, subtopic: string) => {
    setSelectedStudyTopic({ topic, subtopic })
    setActiveTab("pomodoro")
  }

  const handleAddToFavorites = (topic: string, subtopic: string) => {
    console.log(`Added to favorites: ${topic} - ${subtopic}`)
    // You can implement favorites logic here
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 glass-dark border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse" />
                <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-glow-blue">BatchQuest</h1>
                <p className="text-gray-300">Grade {grade} Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 glass-dark px-4 py-2 rounded-full">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="font-bold text-orange-400 text-glow-orange">{userStats.streak}</span>
              </div>
              <div className="flex items-center gap-2 glass-dark px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-yellow-400">{userStats.xp} XP</span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-50" />
                <div className="relative w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{userStats.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="glass-dark p-2 rounded-full">
              <TabsTrigger value="dashboard" className="neon-button neon-blue rounded-full px-6">
                <Target className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="subjects" className="neon-button neon-purple rounded-full px-6">
                <BookOpen className="w-4 h-4 mr-2" />
                Subjects
              </TabsTrigger>
              <TabsTrigger value="pomodoro" className="neon-button neon-green rounded-full px-6">
                <Timer className="w-4 h-4 mr-2" />
                Timer
              </TabsTrigger>
              <TabsTrigger value="battles" className="neon-button neon-pink rounded-full px-6">
                <Users className="w-4 h-4 mr-2" />
                Battles
              </TabsTrigger>
              <TabsTrigger value="ai-tools" className="neon-button neon-blue rounded-full px-6">
                <Brain className="w-4 h-4 mr-2" />
                AI Tools
              </TabsTrigger>
              <TabsTrigger value="scores" className="neon-button neon-purple rounded-full px-6">
                <TrendingUp className="w-4 h-4 mr-2" />
                Scores
              </TabsTrigger>
              <TabsTrigger value="profile" className="neon-button neon-green rounded-full px-6">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="glass-card hover-lift" style={{ "--card-neon-glow-color": "rgba(59, 130, 246, 0.4)" }}>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-400 text-glow-blue mb-2">{userStats.studyTime}</div>
                  <div className="text-gray-300">Study Time</div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift" style={{ "--card-neon-glow-color": "rgba(16, 185, 129, 0.4)" }}>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="relative w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-400 text-glow-green">{userStats.completedTopics}</div>
                  <div className="text-gray-300">Topics Done</div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift" style={{ "--card-neon-glow-color": "rgba(245, 158, 11, 0.4)" }}>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="relative w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{userStats.quizzesCompleted}</div>
                  <div className="text-gray-300">Quizzes</div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift" style={{ "--card-neon-glow-color": "rgba(139, 92, 246, 0.4)" }}>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="relative w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-400 text-glow-purple">#{userStats.rank}</div>
                  <div className="text-gray-300">Rank</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Overview */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-glow-blue">Overall Progress</CardTitle>
                  <CardDescription className="text-gray-300">Your completion across all subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { subject: "Mathematics", progress: 75, color: "from-blue-500 to-cyan-500" },
                      { subject: "Science", progress: 60, color: "from-green-500 to-emerald-500" },
                      { subject: "Social Science", progress: 45, color: "from-purple-500 to-violet-500" },
                      { subject: "English", progress: 80, color: "from-pink-500 to-rose-500" },
                    ].map((item) => (
                      <div key={item.subject}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white font-medium">{item.subject}</span>
                          <span className="text-gray-300">{item.progress}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={item.progress} className="h-3 progress-glow" />
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full opacity-75`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-purple-400 text-glow-purple">Recent Achievements</CardTitle>
                  <CardDescription className="text-gray-300">Your latest unlocks and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { icon: Trophy, title: "Quiz Master", desc: "Completed 25 quizzes", color: "yellow" },
                      { icon: Flame, title: "Week Warrior", desc: "7-day study streak", color: "orange" },
                      { icon: Heart, title: "New Pet Unlocked", desc: "Study Dragon earned", color: "pink" },
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 glass-dark p-4 rounded-lg hover-lift">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r from-${achievement.color}-500 to-${achievement.color}-600 rounded-full flex items-center justify-center`}
                        >
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{achievement.title}</div>
                          <div className="text-sm text-gray-300">{achievement.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-green-400 text-glow-green">Quick Actions</CardTitle>
                <CardDescription className="text-gray-300">Jump into your study session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <Button
                    onClick={() => setActiveTab("pomodoro")}
                    className="h-24 flex-col gap-3 neon-button neon-blue text-lg font-semibold"
                  >
                    <Timer className="w-8 h-8" />
                    Start Timer
                  </Button>
                  <Button
                    onClick={() => setActiveTab("subjects")}
                    className="h-24 flex-col gap-3 neon-button neon-purple text-lg font-semibold"
                  >
                    <BookOpen className="w-8 h-8" />
                    Browse Topics
                  </Button>
                  <Button
                    onClick={() => setActiveTab("battles")}
                    className="h-24 flex-col gap-3 neon-button neon-green text-lg font-semibold"
                  >
                    <Users className="w-8 h-8" />
                    Quiz Battle
                  </Button>
                  <Button
                    onClick={() => setActiveTab("ai-tools")}
                    className="h-24 flex-col gap-3 neon-button neon-pink text-lg font-semibold"
                  >
                    <Brain className="w-8 h-8" />
                    AI Tools
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects">
            <SubjectTree grade={grade} onStartPomodoro={handleStartPomodoro} onAddToFavorites={handleAddToFavorites} />
          </TabsContent>

          <TabsContent value="pomodoro">
            <PomodoroTimer selectedTopic={selectedStudyTopic} />
          </TabsContent>

          <TabsContent value="battles">
            <QuizBattle />
          </TabsContent>

          <TabsContent value="ai-tools">
            <AITools />
          </TabsContent>

          <TabsContent value="scores">
            <TestScoreTracker />
          </TabsContent>

          <TabsContent value="profile">
            <ProfilePage userStats={userStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
