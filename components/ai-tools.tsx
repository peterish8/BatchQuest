"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Upload,
  FileText,
  Lightbulb,
  HelpCircle,
  Sparkles,
  Target,
  Zap,
  Download,
  Copy,
  RefreshCw,
  Star,
  Play,
  Trash2,
} from "lucide-react"
import { FlashcardItem } from "./flashcard-item"
import { QuizPlayer } from "./quiz-player"

interface SavedSummary {
  id: string
  title: string
  content: string
  date: string
}

interface SavedFlashcardSet {
  id: string
  title: string
  cards: { front: string; back: string }[]
  date: string
}

interface SavedQuiz {
  id: string
  title: string
  questions: { question: string; options: string[]; correct: number; explanation: string }[]
  date: string
}

export function AITools() {
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [playingQuiz, setPlayingQuiz] = useState<SavedQuiz | null>(null)

  // State for saved content
  const [savedSummaries, setSavedSummaries] = useState<SavedSummary[]>([])
  const [savedFlashcardSets, setSavedFlashcardSets] = useState<SavedFlashcardSet[]>([])
  const [savedQuizzes, setSavedQuizzes] = useState<SavedQuiz[]>([])

  // Load saved content from localStorage on mount
  useEffect(() => {
    const storedSummaries = localStorage.getItem("savedSummaries")
    const storedFlashcards = localStorage.getItem("savedFlashcardSets")
    const storedQuizzes = localStorage.getItem("savedQuizzes")

    if (storedSummaries) setSavedSummaries(JSON.parse(storedSummaries))
    if (storedFlashcards) setSavedFlashcardSets(JSON.parse(storedFlashcards))
    if (storedQuizzes) setSavedQuizzes(JSON.parse(storedQuizzes))
  }, [])

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedSummaries", JSON.stringify(savedSummaries))
  }, [savedSummaries])

  useEffect(() => {
    localStorage.setItem("savedFlashcardSets", JSON.stringify(savedFlashcardSets))
  }, [savedFlashcardSets])

  useEffect(() => {
    localStorage.setItem("savedQuizzes", JSON.stringify(savedQuizzes))
  }, [savedQuizzes])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setGeneratedContent(null) // Clear previous generated content
    }
  }

  const generateContent = async (type: "summary" | "flashcards" | "quiz") => {
    if (!uploadedFile) return

    setIsGenerating(true)
    setGeneratedContent(null) // Clear previous generated content

    // Simulate AI processing
    setTimeout(() => {
      const baseTitle = uploadedFile.name.split(".")[0] || "Untitled Document"

      if (type === "summary") {
        setGeneratedContent({
          type: "summary",
          content: `# Chapter Summary: ${baseTitle}

## Key Points:
- Photosynthesis is the process by which plants convert light energy into chemical energy
- Takes takes place in chloroplasts, specifically in the thylakoids
- Two main stages: Light-dependent reactions and Calvin cycle
- Overall equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

## Important Concepts:
1. **Chlorophyll** - Green pigment that captures light energy
2. **ATP and NADPH** - Energy carriers produced in light reactions
3. **Carbon fixation** - Process of incorporating CO₂ into organic molecules

## Study Tips:
- Remember the equation and be able to balance it
- Understand the difference between light and dark reactions
- Know the location of each process within the chloroplast`,
        })
      } else if (type === "flashcards") {
        setGeneratedContent({
          type: "flashcards",
          content: [
            {
              front: "What is photosynthesis?",
              back: "The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.",
            },
            {
              front: "Where does photosynthesis occur?",
              back: "In the chloroplasts of plant cells, specifically in the thylakoids for light reactions and stroma for dark reactions.",
            },
            {
              front: "What is the overall equation for photosynthesis?",
              back: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
            },
            {
              front: "What are the two main stages of photosynthesis?",
              back: "Light-dependent reactions (photo reactions) and light-independent reactions (Calvin cycle)",
            },
            {
              front: "What is the role of chlorophyll?",
              back: "Chlorophyll is the green pigment that captures light energy and converts it to chemical energy.",
            },
          ],
        })
      } else if (type === "quiz") {
        setGeneratedContent({
          type: "quiz",
          content: {
            title: `${baseTitle} Quiz`,
            questions: [
              {
                question: "What is the primary function of photosynthesis?",
                options: [
                  "To produce oxygen for animals",
                  "To convert light energy into chemical energy",
                  "To break down glucose",
                  "To absorb carbon dioxide",
                ],
                correct: 1,
                explanation: "Photosynthesis converts light energy into chemical energy stored in glucose molecules.",
              },
              {
                question: "In which part of the plant cell does photosynthesis occur?",
                options: ["Nucleus", "Mitochondria", "Chloroplasts", "Ribosomes"],
                correct: 2,
                explanation: "Chloroplasts contain chlorophyll and are the site of photosynthesis.",
              },
              {
                question: "What are the reactants in photosynthesis?",
                options: [
                  "Glucose and oxygen",
                  "Carbon dioxide, water, and light energy",
                  "ATP and NADPH",
                  "Chlorophyll and water",
                ],
                correct: 1,
                explanation: "The reactants are CO₂, H₂O, and light energy, which produce glucose and oxygen.",
              },
            ],
          },
        })
      }
      setIsGenerating(false)
    }, 2000)
  }

  const handleSaveContent = () => {
    if (!generatedContent) return

    const newId = Date.now().toString()
    const newDate = new Date().toLocaleDateString()
    const title = uploadedFile?.name.split(".")[0] || "Generated Content"

    if (generatedContent.type === "summary") {
      setSavedSummaries((prev) => [
        ...prev,
        { id: newId, title: `${title} Summary`, content: generatedContent.content, date: newDate },
      ])
      setActiveTab("summaries")
    } else if (generatedContent.type === "flashcards") {
      setSavedFlashcardSets((prev) => [
        ...prev,
        { id: newId, title: `${title} Flashcards`, cards: generatedContent.content, date: newDate },
      ])
      setActiveTab("flashcards")
    } else if (generatedContent.type === "quiz") {
      setSavedQuizzes((prev) => [
        ...prev,
        {
          id: newId,
          title: generatedContent.content.title,
          questions: generatedContent.content.questions,
          date: newDate,
        },
      ])
      setActiveTab("quizzes")
    }
    setGeneratedContent(null) // Clear generated content after saving
  }

  const handleDeleteSavedItem = (type: string, id: string) => {
    if (type === "summary") {
      setSavedSummaries((prev) => prev.filter((item) => item.id !== id))
    } else if (type === "flashcards") {
      setSavedFlashcardSets((prev) => prev.filter((item) => item.id !== id))
    } else if (type === "quiz") {
      setSavedQuizzes((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleQuizComplete = (score: number, total: number) => {
    console.log(`Quiz completed! Score: ${score}/${total}`)
    setPlayingQuiz(null) // Exit quiz player
  }

  if (playingQuiz) {
    return <QuizPlayer quiz={playingQuiz} onQuizComplete={handleQuizComplete} onBack={() => setPlayingQuiz(null)} />
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Study Tools</h2>
        <p className="text-gray-600">Upload your notes and let AI create summaries, flashcards, and quizzes</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 glass-dark p-2 rounded-full">
          <TabsTrigger value="upload" className="neon-button neon-blue rounded-full px-6">
            Upload & Generate
          </TabsTrigger>
          <TabsTrigger value="summaries" className="neon-button neon-purple rounded-full px-6">
            Summaries
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="neon-button neon-green rounded-full px-6">
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="neon-button neon-pink rounded-full px-6">
            AI Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400 text-glow-blue">
                  <Upload className="w-5 h-5" />
                  Upload Study Material
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Upload PDFs, images, or text files of your class notes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-gray-900/50">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-gray-300">Drag and drop your files here, or</p>
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                      className="glass-dark border-white/20 text-white hover:bg-white/10"
                    >
                      Browse Files
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-4">Supports PDF, JPG, PNG, TXT files up to 10MB</p>
                </div>

                {uploadedFile && (
                  <div className="flex items-center gap-3 p-3 glass-dark rounded-lg border border-green-400/20">
                    <FileText className="w-5 h-5 text-green-400" />
                    <div className="flex-1">
                      <div className="font-medium text-green-400">{uploadedFile.name}</div>
                      <div className="text-sm text-green-300">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                    <Badge className="bg-green-500 text-white">Ready</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generation Options */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400 text-glow-purple">
                  <Brain className="w-5 h-5" />
                  AI Generation Options
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Choose what you want AI to create from your notes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => generateContent("summary")}
                  disabled={!uploadedFile || isGenerating}
                  className="w-full justify-start h-auto p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                >
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-medium">Generate Summary</div>
                      <div className="text-sm opacity-90">Key points and concepts</div>
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => generateContent("flashcards")}
                  disabled={!uploadedFile || isGenerating}
                  className="w-full justify-start h-auto p-4 bg-gradient-to-r from-green-500 to-green-600 text-white"
                >
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-medium">Create Flashcards</div>
                      <div className="text-sm opacity-90">Question-answer pairs</div>
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => generateContent("quiz")}
                  disabled={!uploadedFile || isGenerating}
                  className="w-full justify-start h-auto p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-medium">Generate Quiz</div>
                      <div className="text-sm opacity-90">Multiple choice questions</div>
                    </div>
                  </div>
                </Button>

                {isGenerating && (
                  <div className="flex items-center justify-center gap-2 p-4 glass-dark rounded-lg border border-blue-400/20">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                    <span className="text-blue-300">AI is processing your content...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Generated Content Display */}
          {generatedContent && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400 text-glow-yellow">
                  <Sparkles className="w-5 h-5" />
                  Generated Content
                </CardTitle>
                <CardDescription className="text-gray-300">
                  AI-generated {generatedContent.type} from your uploaded material
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent.type === "summary" && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass-dark border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass-dark border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" onClick={handleSaveContent} className="neon-button neon-green">
                        <Star className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                    </div>
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm glass-dark p-4 rounded-lg text-gray-300 border border-white/10">
                        {generatedContent.content}
                      </pre>
                    </div>
                  </div>
                )}

                {generatedContent.type === "flashcards" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge className="glass-dark border-white/20 text-gray-300">
                        {generatedContent.content.length} flashcards generated
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="glass-dark border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Export
                        </Button>
                        <Button size="sm" onClick={handleSaveContent} className="neon-button neon-green">
                          <Star className="w-3 h-3 mr-1" />
                          Save Set
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {generatedContent.content.map((card: any, index: number) => (
                        <FlashcardItem key={index} card={card} />
                      ))}
                    </div>
                  </div>
                )}

                {generatedContent.type === "quiz" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-white">{generatedContent.content.title}</h3>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setPlayingQuiz(generatedContent.content)}
                          className="neon-button neon-green"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Take Quiz
                        </Button>
                        <Button size="sm" onClick={handleSaveContent} className="neon-button neon-purple">
                          <Star className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {generatedContent.content.questions.map((q: any, index: number) => (
                        <Card key={index} className="glass-dark border-white/10">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="font-medium text-white">
                                {index + 1}. {q.question}
                              </div>
                              <div className="space-y-2">
                                {q.options.map((option: string, optIndex: number) => (
                                  <div
                                    key={optIndex}
                                    className={`p-2 rounded border ${
                                      optIndex === q.correct
                                        ? "bg-green-600/20 border-green-500 text-green-300"
                                        : "bg-gray-900/50 border-gray-700 text-gray-300"
                                    }`}
                                  >
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                    {optIndex === q.correct && (
                                      <Badge className="ml-2 bg-green-500 text-white">Correct</Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="text-sm text-gray-300 glass-dark p-2 rounded border border-blue-400/20">
                                <strong>Explanation:</strong> {q.explanation}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="summaries">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Saved Summaries</CardTitle>
              <CardDescription className="text-gray-300">Your AI-generated study summaries</CardDescription>
            </CardHeader>
            <CardContent>
              {savedSummaries.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No summaries yet. Upload some notes and save them to see them here!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedSummaries.map((summary) => (
                    <div key={summary.id} className="p-4 glass-dark rounded-lg border border-white/10 hover-lift">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-white">{summary.title}</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-dark border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSavedItem("summary", summary.id)}
                            className="text-red-400 hover:text-red-500 hover:bg-white/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-3">{summary.content}</p>
                      <div className="text-xs text-gray-500 mt-2">Saved: {summary.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Flashcard Sets</CardTitle>
              <CardDescription className="text-gray-300">Your AI-generated flashcard collections</CardDescription>
            </CardHeader>
            <CardContent>
              {savedFlashcardSets.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No flashcard sets yet. Generate some from your notes and save them!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedFlashcardSets.map((set) => (
                    <div key={set.id} className="p-4 glass-dark rounded-lg border border-white/10 hover-lift">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-white">{set.title}</h3>
                        <div className="flex gap-2">
                          <Badge className="glass-dark border-white/20 text-gray-300">{set.cards.length} cards</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-dark border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Study
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSavedItem("flashcards", set.id)}
                            className="text-red-400 hover:text-red-500 hover:bg-white/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Saved: {set.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">AI-Generated Quizzes</CardTitle>
              <CardDescription className="text-gray-300">
                Custom quizzes created from your study material
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedQuizzes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No custom quizzes yet. Upload notes to create and save personalized quizzes!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedQuizzes.map((quiz) => (
                    <div key={quiz.id} className="p-4 glass-dark rounded-lg border border-white/10 hover-lift">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-white">{quiz.title}</h3>
                        <div className="flex gap-2">
                          <Badge className="glass-dark border-white/20 text-gray-300">
                            {quiz.questions.length} questions
                          </Badge>
                          <Button size="sm" onClick={() => setPlayingQuiz(quiz)} className="neon-button neon-green">
                            <Play className="w-3 h-3 mr-1" />
                            Take Quiz
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSavedItem("quiz", quiz.id)}
                            className="text-red-400 hover:text-red-500 hover:bg-white/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Saved: {quiz.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
