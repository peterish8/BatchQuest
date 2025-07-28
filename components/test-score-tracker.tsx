"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, Plus, BarChart3, Minus, Edit, Trash2 } from "lucide-react"
import { CustomTooltip } from "./custom-tooltip" // Import the custom tooltip

interface TestScore {
  id: string
  subject: string
  testName: string
  date: string
  marksScored: number
  totalMarks: number
  percentage: number
  tag?: string
}

export function TestScoreTracker() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("all")

  const [testScores, setTestScores] = useState<TestScore[]>([
    {
      id: "1",
      subject: "Mathematics",
      testName: "Unit Test 1",
      date: "2024-01-15",
      marksScored: 85,
      totalMarks: 100,
      percentage: 85,
      tag: "school test",
    },
    {
      id: "2",
      subject: "Mathematics",
      testName: "Mid-term",
      date: "2024-02-20",
      marksScored: 78,
      totalMarks: 100,
      percentage: 78,
      tag: "school test",
    },
    {
      id: "3",
      subject: "Mathematics",
      testName: "Unit Test 2",
      date: "2024-03-10",
      marksScored: 92,
      totalMarks: 100,
      percentage: 92,
      tag: "school test",
    },
    {
      id: "4",
      subject: "Science",
      testName: "Physics Quiz",
      date: "2024-01-20",
      marksScored: 45,
      totalMarks: 50,
      percentage: 90,
      tag: "practice",
    },
    {
      id: "5",
      subject: "Science",
      testName: "Chemistry Test",
      date: "2024-02-15",
      marksScored: 38,
      totalMarks: 50,
      percentage: 76,
      tag: "school test",
    },
    {
      id: "6",
      subject: "Science",
      testName: "Biology Quiz",
      date: "2024-03-05",
      marksScored: 42,
      totalMarks: 50,
      percentage: 84,
      tag: "practice",
    },
    {
      id: "7",
      subject: "English",
      testName: "Grammar Test",
      date: "2024-01-25",
      marksScored: 88,
      totalMarks: 100,
      percentage: 88,
      tag: "school test",
    },
    {
      id: "8",
      subject: "English",
      testName: "Literature Quiz",
      date: "2024-02-28",
      marksScored: 82,
      totalMarks: 100,
      percentage: 82,
      tag: "practice",
    },
  ])

  const [newTest, setNewTest] = useState({
    subject: "",
    testName: "",
    date: "",
    marksScored: "",
    totalMarks: "",
    tag: "school test",
  })

  const subjects = ["Mathematics", "Science", "English", "Social Science", "Hindi"]
  const subjectColors = {
    Mathematics: "#3b82f6",
    Science: "#10b981",
    English: "#8b5cf6",
    "Social Science": "#f59e0b",
    Hindi: "#ef4444",
  }

  const handleAddTest = () => {
    if (newTest.subject && newTest.testName && newTest.date && newTest.marksScored && newTest.totalMarks) {
      const percentage = (Number.parseInt(newTest.marksScored) / Number.parseInt(newTest.totalMarks)) * 100
      const test: TestScore = {
        id: Date.now().toString(),
        subject: newTest.subject,
        testName: newTest.testName,
        date: newTest.date,
        marksScored: Number.parseInt(newTest.marksScored),
        totalMarks: Number.parseInt(newTest.totalMarks),
        percentage: Math.round(percentage * 100) / 100,
        tag: newTest.tag,
      }
      setTestScores([...testScores, test])
      setNewTest({
        subject: "",
        testName: "",
        date: "",
        marksScored: "",
        totalMarks: "",
        tag: "school test",
      })
      setShowAddForm(false)
    }
  }

  const getFilteredScores = () => {
    if (selectedSubject === "all") return testScores
    return testScores.filter((score) => score.subject === selectedSubject)
  }

  const getChartData = () => {
    const filtered = getFilteredScores()
    return filtered
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((score) => ({
        date: new Date(score.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        percentage: score.percentage,
        testName: score.testName,
        subject: score.subject,
      }))
  }

  const getSubjectStats = (subject: string) => {
    const subjectScores = testScores.filter((score) => score.subject === subject)
    if (subjectScores.length === 0) return null

    const latest = subjectScores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    const average = subjectScores.reduce((sum, score) => sum + score.percentage, 0) / subjectScores.length
    const trend = subjectScores.length >= 2 ? latest.percentage - subjectScores[subjectScores.length - 2].percentage : 0

    return {
      latest: latest.percentage,
      average: Math.round(average * 100) / 100,
      trend,
      count: subjectScores.length,
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Test Score Tracker</h2>
        <p className="text-gray-300">Track your academic performance and visualize trends</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-48 glass-dark border-white/20 text-white">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent className="glass-dark border-white/20">
              <SelectItem value="all" className="text-white hover:bg-white/10">
                All Subjects
              </SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject} className="text-white hover:bg-white/10">
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setShowAddForm(true)} className="neon-button neon-blue">
          <Plus className="w-4 h-4 mr-2" />
          Add Test Score
        </Button>
      </div>

      {/* Add Test Form */}
      {showAddForm && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Add New Test Score</CardTitle>
            <CardDescription className="text-gray-300">Record your latest test performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject" className="text-gray-300">
                  Subject
                </Label>
                <Select value={newTest.subject} onValueChange={(value) => setNewTest({ ...newTest, subject: value })}>
                  <SelectTrigger className="glass-dark border-white/20 text-white">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="glass-dark border-white/20">
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject} className="text-white hover:bg-white/10">
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="testName" className="text-gray-300">
                  Test Name
                </Label>
                <Input
                  id="testName"
                  placeholder="e.g., Unit Test 1"
                  value={newTest.testName}
                  onChange={(e) => setNewTest({ ...newTest, testName: e.target.value })}
                  className="glass-dark border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10"
                />
              </div>

              <div>
                <Label htmlFor="date" className="text-gray-300">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newTest.date}
                  onChange={(e) => setNewTest({ ...newTest, date: e.target.value })}
                  className="glass-dark border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10"
                />
              </div>

              <div>
                <Label htmlFor="tag" className="text-gray-300">
                  Tag
                </Label>
                <Select value={newTest.tag} onValueChange={(value) => setNewTest({ ...newTest, tag: value })}>
                  <SelectTrigger className="glass-dark border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-dark border-white/20">
                    <SelectItem value="school test" className="text-white hover:bg-white/10">
                      School Test
                    </SelectItem>
                    <SelectItem value="practice" className="text-white hover:bg-white/10">
                      Practice
                    </SelectItem>
                    <SelectItem value="mock test" className="text-white hover:bg-white/10">
                      Mock Test
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="marksScored" className="text-gray-300">
                  Marks Scored
                </Label>
                <Input
                  id="marksScored"
                  type="number"
                  placeholder="85"
                  value={newTest.marksScored}
                  onChange={(e) => setNewTest({ ...newTest, marksScored: e.target.value })}
                  className="glass-dark border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10"
                />
              </div>

              <div>
                <Label htmlFor="totalMarks" className="text-gray-300">
                  Total Marks
                </Label>
                <Input
                  id="totalMarks"
                  type="number"
                  placeholder="100"
                  value={newTest.totalMarks}
                  onChange={(e) => setNewTest({ ...newTest, totalMarks: e.target.value })}
                  className="glass-dark border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={handleAddTest} className="neon-button neon-green">
                Add Score
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="glass-dark border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subject Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map((subject) => {
          const stats = getSubjectStats(subject)
          if (!stats) return null

          return (
            <Card key={subject} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: subjectColors[subject as keyof typeof subjectColors] }}
                    />
                    <span className="font-medium text-sm text-white">{subject}</span>
                  </div>
                  <Badge variant="secondary" className="glass-dark border-white/20 text-gray-300">
                    {stats.count} tests
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Latest</span>
                    <span className="font-bold text-lg text-white">{stats.latest}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Average</span>
                    <span className="text-sm font-medium text-white">{stats.average}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Trend</span>
                    <div className="flex items-center gap-1">
                      {stats.trend > 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : stats.trend < 0 ? (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      ) : (
                        <Minus className="w-3 h-3 text-gray-400" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          stats.trend > 0 ? "text-green-400" : stats.trend < 0 ? "text-red-400" : "text-gray-400"
                        }`}
                      >
                        {stats.trend > 0 ? "+" : ""}
                        {stats.trend.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Performance Graph */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400 text-glow-blue">
            <BarChart3 className="w-5 h-5" />
            Performance Trends
          </CardTitle>
          <CardDescription className="text-gray-300">
            {selectedSubject === "all" ? "All subjects" : selectedSubject} performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#c0c0c0" tickLine={false} /> {/* Lighter stroke */}
                <YAxis domain={[0, 100]} stroke="#c0c0c0" tickLine={false} /> {/* Lighter stroke */}
                <Tooltip content={<CustomTooltip />} /> {/* Use the custom tooltip */}
                <Legend />
                {selectedSubject === "all" ? (
                  subjects.map((subject) => (
                    <Line
                      key={subject}
                      type="monotone"
                      dataKey="percentage"
                      stroke={subjectColors[subject as keyof typeof subjectColors]}
                      strokeWidth={2}
                      dot={{ r: 4, fill: subjectColors[subject as keyof typeof subjectColors] }}
                      activeDot={{ r: 6, strokeWidth: 2, stroke: subjectColors[subject as keyof typeof subjectColors] }}
                      data={testScores.filter((score) => score.subject === subject)}
                    />
                  ))
                ) : (
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke={subjectColors[selectedSubject as keyof typeof subjectColors] || "#3b82f6"}
                    strokeWidth={3}
                    dot={{ r: 5, fill: subjectColors[selectedSubject as keyof typeof subjectColors] || "#3b82f6" }}
                    activeDot={{
                      r: 7,
                      strokeWidth: 2,
                      stroke: subjectColors[selectedSubject as keyof typeof subjectColors] || "#3b82f6",
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Test Scores */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Recent Test Scores</CardTitle>
          <CardDescription className="text-gray-300">Your latest test performances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getFilteredScores()
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 10)
              .map((score) => (
                <div
                  key={score.id}
                  className="flex items-center justify-between p-4 glass-dark rounded-lg hover:bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subjectColors[score.subject as keyof typeof subjectColors] }}
                    />
                    <div>
                      <div className="font-medium text-white">{score.testName}</div>
                      <div className="text-sm text-gray-300">
                        {score.subject} • {new Date(score.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="glass-dark border-white/20 text-gray-300">
                      {score.tag}
                    </Badge>
                    <div className="text-right">
                      <div className="font-bold text-lg text-white">{score.percentage}%</div>
                      <div className="text-sm text-gray-300">
                        {score.marksScored}/{score.totalMarks}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-white/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
