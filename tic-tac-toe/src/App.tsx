import { motion } from 'framer-motion'
import { Background } from './components/ui/Background'
import { Header } from './components/ui/Header'
import { ScoreBoard } from './components/ScoreBoard'
import { Status } from './components/Status'
import { Board } from './components/Board'
import { Controls } from './components/Controls'
import { useGame } from './hooks/useGame'

export default function App() {
  const { state, handleCellClick, resetGame, resetAll } = useGame()
  const { board, currentPlayer, winner, winningLine, scores, draws, gameOver } = state

  return (
    <>
      <Background />

      <main className="flex flex-col items-center justify-center min-h-dvh px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-[420px] flex flex-col items-center gap-5"
        >
          {/* Title */}
          <Header />

          {/* Score strip */}
          <ScoreBoard
            scores={scores}
            draws={draws}
            currentPlayer={currentPlayer}
            gameOver={gameOver}
          />

          {/* Turn / winner status */}
          <Status
            winner={winner}
            currentPlayer={currentPlayer}
            gameOver={gameOver}
          />

          {/* Game board */}
          <motion.div
            className="glass-strong rounded-3xl p-4 w-full border-white/8"
            animate={
              gameOver && winner && winner !== 'draw'
                ? {
                    boxShadow:
                      winner === 'X'
                        ? '0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.1)'
                        : '0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(34,211,238,0.1)',
                  }
                : { boxShadow: '0 0 0px transparent' }
            }
            transition={{ duration: 0.4 }}
          >
            <Board
              board={board}
              winningLine={winningLine}
              onCellClick={handleCellClick}
              disabled={gameOver}
            />
          </motion.div>

          {/* Buttons */}
          <Controls
            onRestart={resetGame}
            onResetAll={resetAll}
            gameOver={gameOver}
          />
        </motion.div>
      </main>
    </>
  )
}