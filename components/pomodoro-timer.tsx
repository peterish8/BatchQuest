"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Square, Timer, Coffee, Trophy, Star, Flame, Target, Clock, CheckCircle } from "lucide-react"
import { CircularTimer } from "@/components/circular-timer"

interface PomodoroTimerProps {
  selectedTopic?: { topic: string; subtopic: string } | null
}

export function PomodoroTimer({ selectedTopic }: PomodoroTimerProps = {}) {
  const [pomodoroDuration, setPomodoroDuration] = useState(25) // in minutes
  const [shortBreakDuration, setShortBreakDuration] = useState(5) // in minutes
  const [longBreakDuration, setLongBreakDuration] = useState(15) // in minutes
  const [timeLeft, setTimeLeft] = useState(pomodoroDuration * 60) // in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [currentTopic, setCurrentTopic] = useState(selectedTopic?.subtopic || "")
  const [completedSessions, setCompletedSessions] = useState(0) // Number of Pomodoro sessions completed
  const [totalXP, setTotalXP] = useState(0)
  const [sessionCycle, setSessionCycle] = useState(0) // Tracks sessions within a long break cycle (e.g., 0, 1, 2, 3)

  const topics = [
    "Mathematics - Linear Equations",
    "Science - Motion and Force",
    "English - Grammar Basics",
    "Social Science - History",
    "Mathematics - Geometry",
  ]

  useEffect(() => {
    if (selectedTopic) {
      setCurrentTopic(selectedTopic.subtopic)
    }
  }, [selectedTopic])

  // Reset timeLeft when duration settings change, but only if timer is not active
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(pomodoroDuration * 60)
      setIsBreak(false) // Ensure it's not in break mode if duration changes
    }
  }, [pomodoroDuration, isActive])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Timer completed
      if (!isBreak) {
        // Study session completed
        setCompletedSessions((prev) => prev + 1)
        setTotalXP((prev) => prev + 50)
        setSessionCycle((prev) => prev + 1)

        // Determine if it's time for a long break
        if ((sessionCycle + 1) % 4 === 0) {
          setTimeLeft(longBreakDuration * 60)
          setIsBreak(true)
        } else {
          setTimeLeft(shortBreakDuration * 60)
          setIsBreak(true)
        }
      } else {
        // Break completed
        setTimeLeft(pomodoroDuration * 60) // Back to Pomodoro duration
        setIsBreak(false)
      }
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, isBreak, sessionCycle, pomodoroDuration, shortBreakDuration, longBreakDuration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = () => setIsActive(true)
  const pauseTimer = () => setIsActive(false)
  const resetTimer = () => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(pomodoroDuration * 60) // Reset to current pomodoro duration
    setSessionCycle(0) // Reset session cycle for long breaks
  }

  const currentTotalTime = isBreak
    ? (sessionCycle % 4 === 0 ? longBreakDuration : shortBreakDuration) * 60
    : pomodoroDuration * 60

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white text-glow-blue mb-4">Pomodoro Study Timer</h2>
        <p className="text-gray-300 text-lg">Focus on specific topics with timed study sessions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Timer Card */}
        <Card className="glass-card hover-lift text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              {isBreak ? (
                <div className="relative">
                  <Coffee className="w-8 h-8 text-orange-400" />
                  <div className="absolute inset-0 animate-ping">
                    <Coffee className="w-8 h-8 text-orange-400 opacity-75" />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Timer className="w-8 h-8 text-blue-400" />
                  <div className="absolute inset-0 animate-ping">
                    <Timer className="w-8 h-8 text-blue-400 opacity-75" />
                  </div>
                </div>
              )}
              <CardTitle
                className={`text-2xl ${isBreak ? "text-orange-400 text-glow-orange" : "text-blue-400 text-glow-blue"}`}
              >
                {isBreak ? "Break Time" : "Study Session"}
              </CardTitle>
            </div>
            <CardDescription className="text-gray-300">
              {isBreak ? "Take a well-deserved break!" : "Focus on your selected topic"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Circular Timer Display */}
            <div className="flex justify-center mb-6">
              <CircularTimer timeLeft={timeLeft} totalTime={currentTotalTime} isActive={isActive} isBreak={isBreak} />
            </div>

            {/* Duration Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="pomodoro-duration" className="text-sm font-medium text-gray-300">
                  Pomodoro
                </label>
                <Select
                  value={String(pomodoroDuration)}
                  onValueChange={(value) => setPomodoroDuration(Number(value))}
                  disabled={isActive}
                >
                  <SelectTrigger id="pomodoro-duration" className="glass-dark border-white/20 text-white">
                    <SelectValue placeholder="25 min" />
                  </SelectTrigger>
                  <SelectContent className="glass-dark border-white/20">
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="20">20 min</SelectItem>
                    <SelectItem value="25">25 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="50">50 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="short-break-duration" className="text-sm font-medium text-gray-300">
                  Short Break
                </label>
                <Select
                  value={String(shortBreakDuration)}
                  onValueChange={(value) => setShortBreakDuration(Number(value))}
                  disabled={isActive}
                >
                  <SelectTrigger id="short-break-duration" className="glass-dark border-white/20 text-white">
                    <SelectValue placeholder="5 min" />
                  </SelectTrigger>
                  <SelectContent className="glass-dark border-white/20">
                    <SelectItem value="3">3 min</SelectItem>
                    <SelectItem value="5">5 min</SelectItem>
                    <SelectItem value="10">10 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="long-break-duration" className="text-sm font-medium text-gray-300">
                  Long Break
                </label>
                <Select
                  value={String(longBreakDuration)}
                  onValueChange={(value) => setLongBreakDuration(Number(value))}
                  disabled={isActive}
                >
                  <SelectTrigger id="long-break-duration" className="glass-dark border-white/20 text-white">
                    <SelectValue placeholder="15 min" />
                  </SelectTrigger>
                  <SelectContent className="glass-dark border-white/20">
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="20">20 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Topic Selection */}
            {!isBreak && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Current Topic</label>
                {selectedTopic ? (
                  <div className="p-4 glass-dark rounded-lg border-2 border-blue-400/30 hover-lift">
                    <div className="font-medium text-blue-400 text-glow-blue">{selectedTopic.topic}</div>
                    <div className="text-sm text-blue-300">{selectedTopic.subtopic}</div>
                  </div>
                ) : (
                  <Select value={currentTopic} onValueChange={setCurrentTopic} disabled={isActive}>
                    <SelectTrigger className="glass-dark border-white/20 text-white">
                      <SelectValue placeholder="Choose a topic to study" />
                    </SelectTrigger>
                    <SelectContent className="glass-dark border-white/20">
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic} className="text-white hover:bg-white/10">
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            {/* Timer Controls */}
            <div className="flex justify-center gap-3">
              {!isActive ? (
                <Button
                  onClick={startTimer}
                  disabled={!currentTopic && !selectedTopic && !isBreak}
                  className="neon-button neon-green px-8 py-3 text-lg font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </Button>
              ) : (
                <Button onClick={pauseTimer} className="neon-button neon-blue px-8 py-3 text-lg font-semibold">
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={resetTimer} className="neon-button neon-purple px-8 py-3 text-lg font-semibold">
                <Square className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="glass-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400 text-glow-yellow">
              <div className="relative">
                <Trophy className="w-5 h-5" />
                <div className="absolute inset-0 animate-ping">
                  <Trophy className="w-5 h-5 opacity-75" />
                </div>
              </div>
              Session Stats
            </CardTitle>
            <CardDescription className="text-gray-300">Your study progress today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 glass-dark rounded-lg hover-lift border border-green-400/30">
                <div className="relative mb-2">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto" />
                  <div className="absolute inset-0 animate-pulse">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto opacity-50" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400 text-glow-green">{completedSessions}</div>
                <div className="text-sm text-green-300">Sessions</div>
              </div>

              <div className="text-center p-4 glass-dark rounded-lg hover-lift border border-yellow-400/30">
                <div className="relative mb-2">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto" />
                  <div className="absolute inset-0 animate-pulse">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto opacity-50" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-400">{totalXP}</div>
                <div className="text-sm text-yellow-300">XP Earned</div>
              </div>

              <div className="text-center p-4 glass-dark rounded-lg hover-lift border border-blue-400/30">
                <div className="relative mb-2">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto" />
                  <div className="absolute inset-0 animate-pulse">
                    <Clock className="w-8 h-8 text-blue-400 mx-auto opacity-50" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-400 text-glow-blue">
                  {completedSessions * pomodoroDuration}
                </div>
                <div className="text-sm text-blue-300">Minutes</div>
              </div>

              <div className="text-center p-4 glass-dark rounded-lg hover-lift border border-purple-400/30">
                <div className="relative mb-2">
                  <Target className="w-8 h-8 text-purple-400 mx-auto" />
                  <div className="absolute inset-0 animate-pulse">
                    <Target className="w-8 h-8 text-purple-400 mx-auto opacity-50" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-400 text-glow-purple">
                  {Math.floor(completedSessions / 4)}
                </div>
                <div className="text-sm text-purple-300">Cycles</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              <h4 className="font-medium text-white">Recent Achievements</h4>

              {completedSessions >= 1 && (
                <div className="flex items-center gap-3 p-3 glass-dark rounded-lg hover-lift border border-green-400/30">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-green-400">First Session</div>
                    <div className="text-sm text-green-300">Completed your first Pomodoro!</div>
                  </div>
                  <Badge className="ml-auto bg-green-500 text-white">+25 XP</Badge>
                </div>
              )}

              {completedSessions >= 4 && (
                <div className="flex items-center gap-3 p-3 glass-dark rounded-lg hover-lift border border-blue-400/30">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-blue-400">Focused Learner</div>
                    <div className="text-sm text-blue-300">Completed 4 sessions in a row!</div>
                  </div>
                  <Badge className="ml-auto bg-blue-500 text-white">+100 XP</Badge>
                </div>
              )}

              {completedSessions === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <div className="relative mb-3">
                    <Timer className="w-12 h-12 mx-auto opacity-50" />
                    <div className="absolute inset-0 animate-ping">
                      <Timer className="w-12 h-12 mx-auto opacity-25" />
                    </div>
                  </div>
                  <p>Complete your first session to unlock achievements!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Tips */}
      <Card className="glass-card hover-lift">
        <CardHeader>
          <CardTitle className="text-green-400 text-glow-green">Pomodoro Tips</CardTitle>
          <CardDescription className="text-gray-300">Make the most of your study sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 glass-dark rounded-lg hover-lift border border-blue-400/20">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-blue-400">Stay Focused</h4>
                <p className="text-sm text-gray-300">Eliminate distractions and focus solely on your selected topic</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 glass-dark rounded-lg hover-lift border border-green-400/20">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Coffee className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-green-400">Take Breaks</h4>
                <p className="text-sm text-gray-300">Use break time to rest, stretch, or grab a healthy snack</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 glass-dark rounded-lg hover-lift border border-purple-400/20">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-purple-400">Track Progress</h4>
                <p className="text-sm text-gray-300">Complete 4 sessions to earn a full Pomodoro cycle</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
