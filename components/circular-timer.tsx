"use client"

import { useEffect, useState } from "react"

interface CircularTimerProps {
  timeLeft: number
  totalTime: number
  isActive: boolean
  isBreak: boolean
}

export function CircularTimer({ timeLeft, totalTime, isActive, isBreak }: CircularTimerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const circumference = 2 * Math.PI * 120 // radius of 120
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Outer Ring - Dark Cyberpunk Style */}
      <div className="absolute inset-0 rounded-full border-8 border-gradient-to-r from-slate-700 to-slate-800 shadow-2xl">
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-900 to-black shadow-inner">
          {/* Inner Clock Face */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl border-4 border-slate-600">
            {/* Clock Markings */}
            <div className="absolute inset-0 rounded-full">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-6 ${isBreak ? "bg-orange-400" : "bg-blue-400"} shadow-lg`}
                  style={{
                    top: "8px",
                    left: "50%",
                    transformOrigin: "50% 140px",
                    transform: `translateX(-50%) rotate(${i * 30}deg)`,
                    filter: `drop-shadow(0 0 4px ${isBreak ? "#f97316" : "#3b82f6"})`,
                  }}
                />
              ))}

              {/* Minute Markings */}
              {[...Array(60)].map(
                (_, i) =>
                  i % 5 !== 0 && (
                    <div
                      key={`min-${i}`}
                      className={`absolute w-0.5 h-3 ${isBreak ? "bg-orange-600" : "bg-blue-600"} opacity-60`}
                      style={{
                        top: "12px",
                        left: "50%",
                        transformOrigin: "50% 136px",
                        transform: `translateX(-50%) rotate(${i * 6}deg)`,
                      }}
                    />
                  ),
              )}
            </div>

            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 240 240">
              {/* Background Circle */}
              <circle
                cx="120"
                cy="120"
                r="120" // Adjusted radius
                fill="none"
                stroke="rgba(71, 85, 105, 0.3)"
                strokeWidth="4"
                className="opacity-50"
              />

              {/* Progress Circle */}
              <circle
                cx="120"
                cy="120"
                r="118" // Adjusted radius to align outer edge with background
                fill="none"
                stroke={isBreak ? "#f97316" : "#3b82f6"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={`transition-all duration-1000 ${isActive ? "animate-pulse" : ""}`}
                style={{
                  filter: `drop-shadow(0 0 12px ${isBreak ? "#f97316" : "#3b82f6"})`,
                }}
              />
            </svg>

            {/* Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Digital Time Display */}
              <div
                className={`text-5xl font-mono font-bold mb-2 ${
                  isBreak ? "text-orange-400 text-glow-orange" : "text-blue-400 text-glow-blue"
                } ${isActive ? "animate-pulse" : ""}`}
              >
                {formatTime(timeLeft)}
              </div>

              {/* Status Text */}
              <div className={`text-sm font-medium ${isBreak ? "text-orange-300" : "text-blue-300"}`}>
                {isBreak ? "Break Time" : "Focus Time"}
              </div>

              {/* Activity Indicator */}
              {isActive && (
                <div className="mt-3 flex space-x-1">
                  <div
                    className={`w-2 h-2 rounded-full ${isBreak ? "bg-orange-400" : "bg-blue-400"} animate-bounce`}
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className={`w-2 h-2 rounded-full ${isBreak ? "bg-orange-400" : "bg-blue-400"} animate-bounce`}
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className={`w-2 h-2 rounded-full ${isBreak ? "bg-orange-400" : "bg-blue-400"} animate-bounce`}
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}
            </div>

            {/* Animated Clock Hand */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`absolute w-1 ${isBreak ? "bg-orange-400" : "bg-blue-400"} rounded-full shadow-lg transition-all duration-1000`}
                style={{
                  height: "80px",
                  bottom: "50%",
                  transformOrigin: "bottom center",
                  transform: `rotate(${progress * 3.6}deg)`,
                  filter: `drop-shadow(0 0 6px ${isBreak ? "#f97316" : "#3b82f6"})`,
                }}
              />

              {/* Center Dot */}
              <div
                className={`w-6 h-6 ${isBreak ? "bg-orange-400" : "bg-blue-400"} rounded-full shadow-lg border-2 ${isBreak ? "border-orange-600" : "border-blue-600"}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cyberpunk Corner Elements */}
      {[0, 90, 180, 270].map((rotation) => (
        <div
          key={rotation}
          className="absolute w-4 h-4 bg-slate-700 rounded-full shadow-inner border border-slate-600"
          style={{
            top: "10px",
            left: "50%",
            transformOrigin: "50% 150px",
            transform: `translateX(-50%) rotate(${rotation}deg)`,
          }}
        >
          <div className="absolute inset-1 bg-slate-600 rounded-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-2 bg-slate-800" />
            </div>
          </div>
        </div>
      ))}

      {/* Glowing Ring Effect */}
      <div
        className={`absolute inset-0 rounded-full opacity-20 ${isActive ? "animate-ping" : ""}`}
        style={{
          boxShadow: `0 0 50px ${isBreak ? "#f97316" : "#3b82f6"}`,
        }}
      />
    </div>
  )
}
