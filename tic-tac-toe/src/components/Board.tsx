import { motion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'
import { Cell } from './Cell'
import type { Board as BoardType, CellValue } from '../types/game'

interface BoardProps {
  board: BoardType
  winningLine: number[] | null
  onCellClick: (index: number) => void
  disabled: boolean
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

const cellEntryVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 } as Transition,
  },
}

export function Board({ board, winningLine, onCellClick, disabled }: BoardProps) {
  return (
    <motion.div
      role="grid"
      aria-label="Tic Tac Toe board"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 gap-3 w-full max-w-[360px] mx-auto"
    >
      {board.map((cell: CellValue, index: number) => (
        <motion.div key={index} variants={cellEntryVariants} role="gridcell">
          <Cell
            value={cell}
            index={index}
            isWinning={winningLine?.includes(index) ?? false}
            onClick={onCellClick}
            disabled={disabled}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}