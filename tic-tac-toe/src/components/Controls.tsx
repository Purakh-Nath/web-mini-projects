import { motion } from 'framer-motion'
import { RotateCcw, RefreshCw } from 'lucide-react'

interface ControlsProps {
  onRestart: () => void
  onResetAll: () => void
  gameOver: boolean
}

export function Controls({ onRestart, onResetAll, gameOver }: ControlsProps) {
  return (
    <div className="flex gap-3 w-full max-w-[360px] mx-auto">
      {/* New Game button — always shown */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onRestart}
        className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 px-4 font-semibold text-sm transition-all duration-200 ${
          gameOver
            ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white glow-violet border border-violet-400/30 hover:from-violet-500 hover:to-violet-400'
            : 'glass border-white/10 text-slate-300 hover:border-violet-400/30 hover:text-white'
        }`}
        aria-label="Start new game"
      >
        <RotateCcw size={15} />
        New Game
      </motion.button>

      {/* Reset scores */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onResetAll}
        className="glass rounded-2xl py-3 px-4 text-slate-400 hover:text-slate-200 hover:border-white/20 border-white/8 transition-all duration-200 flex items-center gap-2 text-sm"
        aria-label="Reset all scores"
        title="Reset scores"
      >
        <RefreshCw size={15} />
        Reset
      </motion.button>
    </div>
  )
}