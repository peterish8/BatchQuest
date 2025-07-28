"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface FlashcardItemProps {
  card: {
    front: string
    back: string
  }
}

export function FlashcardItem({ card }: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <Card
      className="glass-card cursor-pointer hover-lift group relative overflow-hidden h-48 flex flex-col justify-between"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <CardContent className="p-4 flex-1 flex flex-col justify-center items-center text-center">
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
          style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", backfaceVisibility: "hidden" }}
        >
          <div className="space-y-3">
            <div className="text-xs text-gray-400 mb-1">Question</div>
            <div className="font-medium text-white text-lg">{card.front}</div>
          </div>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
          style={{ transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)", backfaceVisibility: "hidden" }}
        >
          <div className="space-y-3">
            <div className="text-xs text-gray-400 mb-1">Answer</div>
            <div className="text-sm text-gray-300">{card.back}</div>
          </div>
        </div>
      </CardContent>
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}
