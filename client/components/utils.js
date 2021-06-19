// Returns the lowest available cell. If column is full, returns -1
export function findLowestCell (col, boardState) {
  for (let row = 0; row < boardState.length; row++) {
    if (boardState[row][col] !== 0) {
      console.log(row - 1)
      return row - 1
    }
    if (row === 5) {
      console.log(5)
      return 5
    }
  }
}

// adds a token to the lowest available space in col
export function addToken (col, colour, setBoardState, boardState) {
  const row = findLowestCell(col, boardState)
  if (row === -1) {
    return
  }
  setBoardState(prevBoardState => {
    const board = [...prevBoardState]
    board[row] = [...board[row]]
    board[row][col] = colour
    return board
  })
}

export function handleClick (row, col, initialGameState, setBoardState, boardState) {
  console.log(`You clicked a cell at ${row}, ${col}`)
  addToken(col, initialGameState.player, setBoardState, boardState)
}
