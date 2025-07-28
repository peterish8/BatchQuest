"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, RefreshCw, Trophy } from "lucide-react"

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizPlayerProps {
  quiz: {
    title: string
    questions: QuizQuestion[]
  }
  onQuizComplete: (score: number, total: number) => void
  onBack: () => void
}

export function QuizPlayer({ quiz, onQuizComplete, onBack }: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = quiz.questions[currentQuestionIndex]

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index)
      setShowExplanation(true)
      if (index === currentQuestion.correct) {
        setScore((prev) => prev + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
      onQuizComplete(score, quiz.questions.length)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    return (
      <Card className="glass-card text-center p-8">
        <CardHeader>
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-white">Quiz Completed!</CardTitle>
          <CardDescription className="text-gray-300">
            You scored {score} out of {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleRetakeQuiz} className="neon-button neon-green">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
          <Button onClick={onBack} variant="outline" className="neon-button neon-purple ml-2 bg-transparent">
            Back to AI Tools
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white">{quiz.title}</CardTitle>
        <CardDescription className="text-gray-300">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="font-medium text-lg text-white">
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </div>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full justify-start h-auto p-4 text-left transition-colors duration-200
                ${
                  selectedAnswer === null
                    ? "glass-dark border-white/10 text-gray-200 hover:bg-white/10"
                    : index === currentQuestion.correct
                      ? "bg-green-600/30 border-green-500 text-green-300"
                      : index === selectedAnswer
                        ? "bg-red-600/30 border-red-500 text-red-300"
                        : "glass-dark border-white/10 text-gray-400 opacity-70"
                }`}
              variant="outline"
            >
              {String.fromCharCode(65 + index)}. {option}
              {selectedAnswer !== null && (
                <span className="ml-auto">
                  {index === currentQuestion.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : index === selectedAnswer ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : null}
                </span>
              )}
            </Button>
          ))}
        </div>

        {showExplanation && (
          <div className="text-sm text-gray-300 glass-dark p-4 rounded-lg border border-blue-400/20">
            <strong>Explanation:</strong> {currentQuestion.explanation}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0 || selectedAnswer === null}
            variant="outline"
            className="neon-button neon-purple bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="neon-button neon-green">
            {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
