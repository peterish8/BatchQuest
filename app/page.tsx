"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Timer, Trophy, Users, Brain, TrendingUp, Zap, Target, Sparkles, Rocket } from "lucide-react"
import { GradeSelector } from "@/components/grade-selector"
import { Dashboard } from "@/components/dashboard"
import { ParticleBackground } from "@/components/particle-background"

export default function HomePage() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (isLoggedIn && selectedGrade) {
    return <Dashboard grade={selectedGrade} />
  }

  if (selectedGrade && !isLoggedIn) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md glass-card hover-lift">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-glow-blue mb-2">Welcome to BatchQuest!</CardTitle>
              <CardDescription className="text-gray-300">Grade {selectedGrade} CBSE Study Companion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={() => setIsLoggedIn(true)}
                className="w-full h-14 neon-button neon-blue text-lg font-semibold relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Start Your Learning Journey
                </span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedGrade(null)}
                className="w-full h-12 neon-button neon-purple"
              >
                Change Grade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 glass-dark px-8 py-4 rounded-full text-xl font-bold mb-8 hover-lift">
            <div className="relative">
              <Zap className="w-8 h-8 text-blue-400" />
              <div className="absolute inset-0 animate-ping">
                <Zap className="w-8 h-8 text-blue-400 opacity-75" />
              </div>
            </div>
            <span className="text-glow-blue">BatchQuest</span>
            <Sparkles className="w-6 h-6 text-yellow-400 sparkle" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Gamified CBSE Study
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-glow-purple gradient-shift">
              Made Fun & Effective
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Master your CBSE syllabus with AI-powered tools, Pomodoro timers, social quiz battles, and a gamified
            experience that makes studying addictive! ✨
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="glass-card hover-lift group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 relative mb-4">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Timer className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-blue-400 text-glow-blue">Topic-wise Pomodoro</CardTitle>
              <CardDescription className="text-gray-300">
                Focus on specific subtopics with built-in timers and progress tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card hover-lift group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 relative mb-4">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-purple-400 text-glow-purple">AI-Powered Tools</CardTitle>
              <CardDescription className="text-gray-300">
                Upload PDFs and get instant summaries, flashcards, and custom quizzes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card hover-lift group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 relative mb-4">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-green-400 text-glow-green">Social Quiz Battles</CardTitle>
              <CardDescription className="text-gray-300">
                Challenge friends in 1v1 or 2v2 quiz battles with real-time scoring
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card hover-lift group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 relative mb-4">
                <div className="absolute inset-0 bg-yellow-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-yellow-400">Gamified XP System</CardTitle>
              <CardDescription className="text-gray-300">
                Earn XP, unlock characters, pets, and emotes as you study and complete tasks
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card hover-lift group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 relative mb-4">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-red-400">Performance Graphs</CardTitle>
              <CardDescription className="text-gray-300">
                Track test scores across subjects with detailed trend analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card hover-lift group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 relative mb-4">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-indigo-400">CBSE Syllabus</CardTitle>
              <CardDescription className="text-gray-300">
                Complete grade-wise syllabus with structured topic hierarchy
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Grade Selection */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4 text-glow-blue">Choose Your Grade</h2>
          <p className="text-gray-300 mb-12 text-lg">Select your CBSE grade to get started</p>
          <GradeSelector onGradeSelect={setSelectedGrade} />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="glass-card p-6 hover-lift">
            <div className="text-4xl font-bold text-blue-400 text-glow-blue mb-2">10K+</div>
            <div className="text-gray-300">Active Students</div>
          </div>
          <div className="glass-card p-6 hover-lift">
            <div className="text-4xl font-bold text-purple-400 text-glow-purple mb-2">50K+</div>
            <div className="text-gray-300">Quizzes Completed</div>
          </div>
          <div className="glass-card p-6 hover-lift">
            <div className="text-4xl font-bold text-green-400 text-glow-green mb-2">95%</div>
            <div className="text-gray-300">Improvement Rate</div>
          </div>
          <div className="glass-card p-6 hover-lift">
            <div className="text-4xl font-bold text-yellow-400 mb-2">4.8★</div>
            <div className="text-gray-300">Student Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}
