import { motion, AnimatePresence } from 'framer-motion'
import type { Player } from '../types/game'

interface StatusProps {
  winner: Player | 'draw' | null
  currentPlayer: Player
  gameOver: boolean
}

const bannerVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 22 },
  },
  exit: { opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.18 } },
}

function TurnDot({ player }: { player: Player }) {
  return (
    <motion.span
      key={player}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-block w-2 h-2 rounded-full ${
        player === 'X' ? 'bg-violet-400' : 'bg-cyan-400'
      }`}
    />
  )
}

export function Status({ winner, currentPlayer, gameOver }: StatusProps) {
  return (
    <div className="w-full max-w-[360px] mx-auto h-14 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {/* Game over: winner */}
        {gameOver && winner && winner !== 'draw' && (
          <motion.div
            key="winner"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`glass-strong rounded-2xl px-6 py-3 flex items-center gap-3 ${
              winner === 'X'
                ? 'border-violet-400/40 glow-violet'
                : 'border-cyan-400/40 glow-cyan'
            }`}
          >
            <span
              className={`text-2xl font-bold font-mono ${
                winner === 'X' ? 'text-violet-400 text-glow-violet' : 'text-cyan-400 text-glow-cyan'
              }`}
            >
              {winner === 'X' ? '×' : '○'}
            </span>
            <span className="text-white font-semibold text-base">
              Player {winner} wins!
            </span>
            <span className="text-lg">🎉</span>
          </motion.div>
        )}

        {/* Game over: draw */}
        {gameOver && winner === 'draw' && (
          <motion.div
            key="draw"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-strong rounded-2xl px-6 py-3 flex items-center gap-3 border-white/20"
          >
            <span className="text-lg">🤝</span>
            <span className="text-slate-200 font-semibold text-base">It's a draw!</span>
          </motion.div>
        )}

        {/* Active: whose turn */}
        {!gameOver && (
          <motion.div
            key={`turn-${currentPlayer}`}
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass rounded-2xl px-5 py-3 flex items-center gap-3 border-white/8"
          >
            <TurnDot player={currentPlayer} />
            <span className="text-slate-300 text-sm font-medium">
              Player{' '}
              <span
                className={`font-bold font-mono ${
                  currentPlayer === 'X' ? 'text-violet-400' : 'text-cyan-400'
                }`}
              >
                {currentPlayer}
              </span>
              's turn
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}