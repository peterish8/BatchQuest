"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GradeSelectorProps {
  onGradeSelect: (grade: string) => void
}

const gradeData = {
  "6": { color: "from-green-500 to-emerald-500", glow: "shadow-green-500/50" },
  "7": { color: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/50" },
  "8": { color: "from-purple-500 to-violet-500", glow: "shadow-purple-500/50" },
  "9": { color: "from-red-500 to-pink-500", glow: "shadow-red-500/50" },
  "10": { color: "from-yellow-500 to-orange-500", glow: "shadow-yellow-500/50" },
  "11": { color: "from-indigo-500 to-blue-500", glow: "shadow-indigo-500/50" },
  "12": { color: "from-pink-500 to-rose-500", glow: "shadow-pink-500/50" },
}

export function GradeSelector({ onGradeSelect }: GradeSelectorProps) {
  const grades = ["6", "7", "8", "9", "10", "11", "12"]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
      {grades.map((grade) => {
        const gradeInfo = gradeData[grade as keyof typeof gradeData]
        return (
          <Card
            key={grade}
            className="glass-card hover-lift cursor-pointer group relative overflow-hidden"
            onClick={() => onGradeSelect(grade)}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${gradeInfo.color.split(" ")[1]}, ${gradeInfo.color.split(" ")[3]})`,
              }}
            />

            <CardContent className="p-8 text-center relative z-10">
              <div className="relative mb-4">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${gradeInfo.color} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}
                />
                <div
                  className={`relative w-20 h-20 bg-gradient-to-r ${gradeInfo.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-3xl font-bold text-white">{grade}</span>
                </div>
              </div>

              <div className="font-bold text-white text-lg mb-2">Grade {grade}</div>
              <Badge variant="secondary" className="glass-dark border-white/20">
                CBSE
              </Badge>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
