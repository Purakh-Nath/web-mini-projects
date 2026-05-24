import { motion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'
import type { CellProps } from '../types/game'

const symbolVariants: Variants = {
  hidden: { scale: 0, rotate: -30, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 20 } as Transition,
  },
}

const cellVariants: Variants = {
  idle: { scale: 1 },
  tap: { scale: 0.93 },
}

export function Cell({ value, index, isWinning, onClick, disabled }: CellProps) {
  const isEmpty = value === null
  const isX = value === 'X'
  const isO = value === 'O'

  const baseClasses =
    'relative flex items-center justify-center rounded-2xl cursor-pointer select-none transition-all duration-200'

  const stateClasses = isWinning
    ? isX
      ? 'glass-strong glow-violet border-violet-500/40'
      : 'glass-strong glow-cyan border-cyan-400/40'
    : 'glass border-white/8 hover:border-white/20 hover:bg-white/5'

  const cursorClass = disabled || !isEmpty ? 'cursor-default' : 'cursor-pointer'

  return (
    <motion.button
      variants={cellVariants}
      whileTap={isEmpty && !disabled ? 'tap' : 'idle'}
      onClick={() => onClick(index)}
      disabled={disabled || !isEmpty}
      aria-label={value ? `Cell ${index + 1}: ${value}` : `Cell ${index + 1}: empty`}
      className={`${baseClasses} ${stateClasses} ${cursorClass} aspect-square w-full`}
    >
      {/* Hover shimmer for empty cells */}
      {isEmpty && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-violet-500/5 to-cyan-500/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}

      {/* X Symbol */}
      {isX && (
        <motion.div
          variants={symbolVariants}
          initial="hidden"
          animate="visible"
          className="relative flex items-center justify-center w-full h-full"
        >
          {isWinning && (
            <motion.div
              className="absolute inset-2 rounded-xl bg-violet-500/10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            />
          )}
          <svg
            viewBox="0 0 48 48"
            className="w-10 h-10 sm:w-12 sm:h-12"
            aria-hidden="true"
          >
            <motion.line
              x1="10" y1="10" x2="38" y2="38"
              stroke={isWinning ? '#a78bfa' : '#8b5cf6'}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25 }}
              style={{ filter: isWinning ? 'drop-shadow(0 0 6px #8b5cf6)' : 'none' }}
            />
            <motion.line
              x1="38" y1="10" x2="10" y2="38"
              stroke={isWinning ? '#a78bfa' : '#8b5cf6'}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              style={{ filter: isWinning ? 'drop-shadow(0 0 6px #8b5cf6)' : 'none' }}
            />
          </svg>
        </motion.div>
      )}

      {/* O Symbol */}
      {isO && (
        <motion.div
          variants={symbolVariants}
          initial="hidden"
          animate="visible"
          className="relative flex items-center justify-center w-full h-full"
        >
          {isWinning && (
            <motion.div
              className="absolute inset-2 rounded-xl bg-cyan-400/10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            />
          )}
          <svg
            viewBox="0 0 48 48"
            className="w-10 h-10 sm:w-12 sm:h-12"
            aria-hidden="true"
          >
            <motion.circle
              cx="24" cy="24" r="14"
              fill="none"
              stroke={isWinning ? '#22d3ee' : '#06b6d4'}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35 }}
              style={{ filter: isWinning ? 'drop-shadow(0 0 6px #22d3ee)' : 'none' }}
            />
          </svg>
        </motion.div>
      )}
    </motion.button>
  )
}