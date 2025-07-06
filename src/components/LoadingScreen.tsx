import React from 'react'
import { Trophy, Loader2 } from 'lucide-react'

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-amber-500 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto animate-pulse" />
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Olympic Sports Championship Manager
        </h1>
        <p className="text-xl text-white/80 mb-8">
          Подготвяме вашата спортна империя...
        </p>
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
          <span className="text-white font-medium">Зареждане...</span>
        </div>
      </div>
    </div>
  )
}