import { useState, useCallback } from 'react'
import type { GameState, Player } from '../types/game'
import {
  calculateWinner,
  isDraw,
  getEmptyBoard,
  getNextPlayer,
} from '../utils/gameLogic'

const INITIAL_STATE: GameState = {
  board: getEmptyBoard(),
  currentPlayer: 'X',
  winner: null,
  winningLine: null,
  scores: { X: 0, O: 0 },
  draws: 0,
  gameOver: false,
}

export function useGame() {
  const [state, setState] = useState<GameState>(INITIAL_STATE)

  const handleCellClick = useCallback(
    (index: number) => {
      if (state.board[index] || state.gameOver) return

      setState((prev) => {
        const newBoard = [...prev.board]
        newBoard[index] = prev.currentPlayer

        const result = calculateWinner(newBoard)
        const draw = !result && isDraw(newBoard)

        const newScores = { ...prev.scores }
        let newDraws = prev.draws

        if (result) newScores[result.winner]++
        if (draw) newDraws++

        return {
          ...prev,
          board: newBoard,
          currentPlayer: result || draw ? prev.currentPlayer : getNextPlayer(prev.currentPlayer),
          winner: result ? result.winner : draw ? 'draw' : null,
          winningLine: result ? result.line : null,
          scores: newScores,
          draws: newDraws,
          gameOver: !!(result || draw),
        }
      })
    },
    [state.board, state.gameOver]
  )

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...INITIAL_STATE,
      scores: prev.scores,
      draws: prev.draws,
      currentPlayer: 'X',
    }))
  }, [])

  const resetAll = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  return { state, handleCellClick, resetGame, resetAll }
}