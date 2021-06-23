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

export function computersTurn (boardState, gameState, setBoardState, setGameState) {
  let result = false
  let column = 0

  setTimeout(() => {
    const winningMove = checkForWinningMove(boardState, gameState.computer)
    const blockingMove = checkForPlayersWinningMove(boardState, gameState)
    if (winningMove >= 0) {
      console.log('GOTCHA')
      column = winningMove
    } else if (blockingMove >= 0) {
      console.log('BLOCKED YA')
      column = blockingMove
      // check if at least one column is available that doesnt cause player to win
    } else if (!checkPlayersRespondingMove(boardState, gameState).every(value => value === false)) {
      const suitableMoves = checkPlayersRespondingMove(boardState, gameState)
      console.log('suitable moves: ', suitableMoves)
      do {
        column = Math.floor(Math.random() * 7)
        result = suitableMoves[column]
      } while (result === false)
    } else {
      const availableColumns = findAvailableColumns(boardState)
      do {
        column = Math.floor(Math.random() * 7)
        result = availableColumns[column]
      } while (result === -1)
    }

    addToken(column, gameState.computer, setBoardState, boardState)
  }, 900)
}

export function toggleTurn (gameState, setGameState) {
  let nextPlayer = 0
  if (gameState.currentPlayer === 1) {
    nextPlayer = 2
  } else {
    nextPlayer = 1
  }
  setGameState({
    ...gameState,
    currentPlayer: nextPlayer
  })
}

function findAvailableColumns (boardState) {
  const possibleMoves = []
  // check the top row, if empty, push true to the array, otherwise false
  boardState[0].forEach(col => {
    col ? possibleMoves.push(false) : possibleMoves.push(true)
  })
  return possibleMoves
}

function checkForWinningMove (boardState, player) {
  const possibleMoves = findAvailableColumns(boardState)
  const testBoard = [...boardState]

  for (let col = 0; col < testBoard[0].length; col++) {
    if (possibleMoves[col]) {
      if (addTestToken(col, player, testBoard)) {
        return col // computer plays this column to win the game
      }
    }
  }
  return -1
}

// returns a value of col if there is a way to block the player, otherwise returns -1
function checkForPlayersWinningMove (boardState, gameState) {
  return checkForWinningMove(boardState, gameState.player)
}

function addTestToken (col, colour, testBoard) {
  const row = findLowestCell(col, testBoard)
  // add the token:
  testBoard[row][col] = colour
  if (checkForWin(testBoard, colour)) {
    // take the token out!
    testBoard[row][col] = 0
    return true
  }
  // take the token out!
  testBoard[row][col] = 0
  return false
}

// returns an array e.g. [true, true, false, false, true, true, false], where the false elements represent the columns which are either full, or will allow the player to win on their next move
function checkPlayersRespondingMove (boardState, gameState) {
  const availableColumns = findAvailableColumns(boardState)
  const testBoard = [...boardState]

  for (let col = 0; col < availableColumns.length; col++) {
    const row = findLowestCell(col, testBoard)
    if (row >= 0) {
      // add the token:
      testBoard[row][col] = gameState.computer

      // TODO: create array of players possible responding moves
      // iterate through array and checkForWinningMove(testBoard, gameState.player)
      // and if any of those checkForWins return a value >= 0, update  the col index in availableColumns array to false

      // const respondingMoves = findAvailableColumns(testBoard)
      const winningMove = checkForWinningMove(testBoard, gameState.player)
      if (winningMove >= 0) {
        availableColumns[col] = false
      }
      // take the token out!
      testBoard[row][col] = 0
    }
  }
  return availableColumns
}

// ------Implementing some AI------
// Step 1: determine how many columns are available to play
// >> const possibleMoves = [col1, col2, col4, col5, col6]
// Step 2: check if any of those options will cause computer to win, if so, make that move
// Step 3: check if player could win next move, if so, block them
// Step 4: check if any of those moves will allow player to win. if so, don't make that move.
// >> TODO:
// Currently, if there are no suitable moves, the computer won't make a move. Need to update so that if the only available columns will allow the player to win, then pick one of those at random
