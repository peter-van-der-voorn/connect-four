// Returns the lowest available cell. If column is full, returns -1
export function findLowestCell (col, boardState) {
  for (let row = 0; row < boardState.length; row++) {
    if (boardState[row][col] !== 0) {
      return row - 1
    }
    if (row === 5) {
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

export function checkForWin (boardState, colour) {
  return checkHorizontalWin(boardState, colour) ||
  checkVerticalWin(boardState, colour) ||
  checkDiagonalDescending(boardState, colour) ||
  checkDiagonalAscending(boardState, colour)
}

function checkHorizontalWin (boardState, colour) {
  let count = 0
  for (let i = 0; i < boardState.length; i++) {
    for (let j = 0; j < boardState[0].length; j++) {
      if (boardState[i][j] === colour) {
        count += 1
        if (count === 4) {
          return true
        }
      } else {
        count = 0
      }
    }
    count = 0
  }
}

function checkVerticalWin (boardState, colour) {
  let count = 0
  for (let col = 0; col < boardState[0].length; col++) {
    for (let row = 0; row < boardState.length; row++) {
      if (boardState[row][col] === colour) {
        count += 1
        if (count === 4) {
          return true
        }
      } else {
        count = 0
      }
    }
    count = 0
  }
}

function checkDiagonalDescending (boardState, colour) {
  for (let row = 0; row <= (boardState.length - 4); row++) {
    for (let col = 0; col <= (boardState[0].length - 4); col++) {
      if (
        boardState[row][col] === colour &&
            boardState[row + 1][col + 1] === colour &&
            boardState[row + 2][col + 2] === colour &&
            boardState[row + 3][col + 3] === colour
      ) {
        return true
      }
    }
  }
}

function checkDiagonalAscending (boardState, colour) {
  for (let row = 3; row < (boardState.length); row++) {
    for (let col = 0; col <= (boardState[0].length - 4); col++) {
      if (
        boardState[row][col] === colour &&
              boardState[row - 1][col + 1] === colour &&
              boardState[row - 2][col + 2] === colour &&
              boardState[row - 3][col + 3] === colour
      ) {
        return true
      }
    }
  }
}
