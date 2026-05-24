export type Player = 'X' | 'O'
export type CellValue = Player | null
export type Board = CellValue[]

export interface GameState {
  board: Board
  currentPlayer: Player
  winner: Player | 'draw' | null
  winningLine: number[] | null
  scores: Record<Player, number>
  draws: number
  gameOver: boolean
}

export interface CellProps {
  value: CellValue
  index: number
  isWinning: boolean
  onClick: (index: number) => void
  disabled: boolean
}