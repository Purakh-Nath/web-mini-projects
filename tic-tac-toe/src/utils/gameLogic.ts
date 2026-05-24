import type { Board, Player, CellValue } from '../types/game'

export const WINNING_LINES = [
  [0, 1, 2], // top row
  [3, 4, 5], // mid row
  [6, 7, 8], // bot row
  [0, 3, 6], // left col
  [1, 4, 7], // mid col
  [2, 5, 8], // right col
  [0, 4, 8], // diag
  [2, 4, 6], // anti-diag
]

export function calculateWinner(board: Board): { winner: Player; line: number[] } | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: [a, b, c] }
    }
  }
  return null
}

export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && !calculateWinner(board)
}

export function getEmptyBoard(): Board {
  return Array(9).fill(null) as CellValue[]
}

export function getNextPlayer(current: Player): Player {
  return current === 'X' ? 'O' : 'X'
}