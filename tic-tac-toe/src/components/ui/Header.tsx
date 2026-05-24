import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center gap-1 pt-2"
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-violet-400 text-sm font-semibold tracking-widest uppercase opacity-70">
          ×
        </span>
        <h1 className="text-white font-bold text-xl tracking-tight">
          Tic Tac Toe
        </h1>
        <span className="font-mono text-cyan-400 text-sm font-semibold tracking-widest uppercase opacity-70">
          ○
        </span>
      </div>
      <p className="text-slate-500 text-xs tracking-wider uppercase font-medium">
        Two Player · Best of Series
      </p>
    </motion.header>
  )
}