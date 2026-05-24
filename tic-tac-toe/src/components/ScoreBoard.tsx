import { motion, AnimatePresence } from 'framer-motion'
import type { Player } from '../types/game'

interface ScoreBoardProps {
  scores: Record<Player, number>
  draws: number
  currentPlayer: Player
  gameOver: boolean
}

function ScoreCard({
  label,
  value,
  color,
  isActive,
  symbol,
}: {
  label: string
  value: number
  color: 'violet' | 'cyan' | 'gray'
  isActive: boolean
  symbol?: string
}) {
  const colorMap = {
    violet: {
      border: 'border-violet-500/30',
      glow: 'glow-violet',
      text: 'text-violet-400',
      bg: 'bg-violet-500/10',
      activeBorder: 'border-violet-400/60',
    },
    cyan: {
      border: 'border-cyan-400/30',
      glow: 'glow-cyan',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      activeBorder: 'border-cyan-300/60',
    },
    gray: {
      border: 'border-white/10',
      glow: '',
      text: 'text-slate-300',
      bg: 'bg-white/5',
      activeBorder: 'border-white/25',
    },
  }

  const c = colorMap[color]

  return (
    <motion.div
      animate={isActive ? { scale: 1.04 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass rounded-2xl p-4 flex flex-col items-center gap-1 flex-1 border transition-all duration-300 ${
        isActive ? `${c.activeBorder} ${c.glow}` : c.border
      }`}
    >
      {symbol && (
        <span className={`font-mono text-sm font-semibold ${c.text}`}>{symbol}</span>
      )}
      <span className="text-slate-400 text-xs tracking-widest uppercase font-medium">
        {label}
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`text-3xl font-bold font-mono ${c.text}`}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

export function ScoreBoard({ scores, draws, currentPlayer, gameOver }: ScoreBoardProps) {
  return (
    <div className="flex gap-3 w-full max-w-[360px] mx-auto">
      <ScoreCard
        label="Player X"
        value={scores.X}
        color="violet"
        isActive={!gameOver && currentPlayer === 'X'}
        symbol="×"
      />
      <ScoreCard
        label="Draws"
        value={draws}
        color="gray"
        isActive={false}
      />
      <ScoreCard
        label="Player O"
        value={scores.O}
        color="cyan"
        isActive={!gameOver && currentPlayer === 'O'}
        symbol="○"
      />
    </div>
  )
}