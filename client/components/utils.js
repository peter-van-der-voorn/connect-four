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
  if (gameState.gameOver) {
    return
  }

  setTimeout(() => {
    const moves = analyseMoves(boardState, gameState)
    console.log(moves)

    const nines = []
    const eights = []
    const sevens = []
    const sixes = []
    const fives = []
    const ones = []
    const zeros = []
    moves.forEach((move, index) => {
      switch (move) {
        case 9:
          nines.push(index)
          break
        case 8:
          eights.push(index)
          break
        case 7:
          sevens.push(index)
          break
        case 6:
          sixes.push(index)
          break
        case 5:
          fives.push(index)
          break
        case 1:
          ones.push(index)
          break
        case 0:
          zeros.push(index)
          break
      }
    })

    let highest = []
    if (nines.length > 0) {
      highest = nines
    } else if (eights.length > 0) {
      highest = eights
    } else if (sevens.length > 0) {
      highest = sevens
    } else if (sixes.length > 0) {
      highest = sixes
    } else if (fives.length > 0) {
      highest = fives
    } else if (ones.length > 0) {
      highest = ones
    } else if (zeros.length > 0) {
      highest = zeros
    }

    const column = highest[Math.floor(Math.random() * highest.length)]

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

// returns an array, true means there's space in that col, false means its full
function findAvailableColumns (boardState) {
  const possibleMoves = []
  // check the top row, if empty, push true to the array, otherwise false
  boardState[0].forEach(col => {
    col ? possibleMoves.push(false) : possibleMoves.push(true)
  })
  return possibleMoves
}

// returns the column in which if the token is placed, that player will win. if no winning move is found, returns -1
function checkForWinningMove (boardState, player) {
  const possibleMoves = findAvailableColumns(boardState)
  const testBoard = [...boardState]

  for (let col = 0; col < testBoard[0].length; col++) {
    if (possibleMoves[col]) {
      if (addTestToken(col, player, testBoard)) {
        return col // play this column to win the game
      }
    }
  }
  return -1
}

// returns a value of col if there is a way to block the player, otherwise returns -1
// function checkForPlayersWinningMove (boardState, gameState) {
//   return checkForWinningMove(boardState, gameState.player)
// }

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
// function checkPlayersRespondingMove (boardState, gameState) {
//   const availableColumns = findAvailableColumns(boardState)
//   const testBoard = [...boardState]

//   // iterate over the columns, placing a token in each and checking if the player has a winning move because of it
//   for (let col = 0; col < availableColumns.length; col++) {
//     const row = findLowestCell(col, testBoard)
//     if (row >= 0) {
//       // add the token:
//       testBoard[row][col] = gameState.computer

//       // const respondingMoves = findAvailableColumns(testBoard)
//       const winningMove = checkForWinningMove(testBoard, gameState.player)
//       if (winningMove >= 0) {
//         availableColumns[col] = false
//       } else {
//         const playersRespondingMoves = findAvailableColumns(testBoard)
//         for (let playerColumn = 0; playerColumn < playersRespondingMoves.length; playerColumn++) {
//           const playerRow = findLowestCell(playerColumn, testBoard)
//           if (playerRow >= 0) {
//             // add the players token:
//             testBoard[playerRow][playerColumn] = gameState.player
//             // check if computer has a winning response
//             // checkForWinningMove(testBoard, gameState.computer)

//             const computersRespondingMoves = findAvailableColumns(testBoard)
//             for (let computerColumn = 0; computerColumn < computersRespondingMoves.length; computerColumn++) {
//               const computerRow = findLowestCell(computerColumn, testBoard)
//               if (computerRow >= 0) {
//               // add the computers token:
//                 testBoard[computerRow][computerColumn] = gameState.computer
//                 // check if player can win:
//                 if (checkForWinningMove(testBoard, gameState.player) > -1) {
//                   availableColumns[computerColumn] = false
//                 }
//                 // remove the computers token:
//                 testBoard[computerRow][computerColumn] = 0
//               }
//             }
//             // remove the players token
//             testBoard[playerRow][playerColumn] = 0
//           }
//         }
//       }

//       // take the token out!
//       testBoard[row][col] = 0
//     }
//   }
//   return availableColumns
// }

// this function works out the consequences for each possible move, and returns an array which represents the priority of each move

// *******IMPORTANT NOTE********
// ****priorities 5 & 7 may need to be switched around, see how gameplay goes...****
//
// -1: Column is full
//  0: If computer plays this column, player can win on the player's next turn
//  1: Doesn't meet the criteria for any higher priority moves, but won't allow player to win next turn
//  5: Play this column, there is a chance that the player will set you up for a win on your next turn (if they don't look properly or don't have any better options)
//  7: If computer plays this column, then there will be an opportunity to win next turn if player doesn't block them
//  8: Playing this column will block the player from winning (unless there's two ways for them to win)
//  9: Playing this column will cause computer to win!

function analyseMoves (boardState, gameState) {
  const availableColumns = findAvailableColumns(boardState)
  const testBoard = [...boardState]

  // if column is full, add -1 to that index of moves
  // This is the array that will be returned at the end:
  const moves = availableColumns.map(col => {
    return (col ? 1 : -1)
  })

  // add 9 to the indices of the moves array that will allow  computer to win!
  for (let i = 0; i < moves.length; i++) {
    const computerWinningMoves = checkForWinningMoves(boardState, gameState.computer)
    if (computerWinningMoves[i]) {
      moves[i] = 9
    }
  }

  // add 8 to the indices of the moves array that will block player from winning next move:
  const playersWinningMoves = checkForWinningMoves(boardState, gameState.player)
  for (let i = 0; i < moves.length; i++) {
    if (moves[i] === 1) {
      if (playersWinningMoves[i]) {
        moves[i] = 8
      }
    }
  }

  // add 0 to the indices of moves array if playing that column will allow player to win on their next turn:
  // iterate through moves array -> if element === 1 (not already allocated), place a token in the etst bpard, and then check if player can win. if yes, then ass 0 to that index of moves

  for (let col = 0; col < moves.length; col++) {
    const row = findLowestCell(col, testBoard)
    if (moves[col] === 1) {
      // place a computer token
      testBoard[row][col] = gameState.computer
      // check if player could now win
      if (checkForWinningMove(testBoard, gameState.player) >= 0) {
        // if yes, assign that index the value of 0
        moves[col] = 0
        // next check if placing that token could allow computer to win next turn (3 out of 4 in place)
      } else if (checkForWinningMove(testBoard, gameState.computer) >= 0) {
        moves[col] = 7
        // next check if after placing that token, there is a chance the player could set computer up to win next turn
      } else {
        const guaranteedWinColumns = guaranteedWin(testBoard, gameState)
        if (guaranteedWinColumns.length > 0) {
          guaranteedWinColumns.forEach(column => {
            moves[column] = 6
          })
        } else {
          for (let playerColumn = 0; playerColumn < moves.length; playerColumn++) {
            const playerRow = findLowestCell(playerColumn, testBoard)
            if (playerRow > -1) {
              // place a player test token
              testBoard[playerRow][playerColumn] = gameState.player
              // check if the players responding move allows computer to win next turn:
              if (checkForWinningMove(testBoard, gameState.computer) >= 0) {
                moves[col] = 5
              }
              // remove players test token:
              testBoard[playerRow][[playerColumn]] = 0
            }
          }
        }
      }
      // remove computers test token
      testBoard[row][col] = 0
    }
  }

  return moves
}

// this function will work out if there is a move the player can choose that will guarantee a win. will return an array of moves (e.g. [0, 4, 5], each element represents the index of the move that will lead to the guaranteed win)
function guaranteedWin (board, gameState) {
  const colsToGuaranteeWin = []
  for (let col = 0; col < board[0].length; col++) {
    const row = findLowestCell(col, board)
    if (row > -1) {
      // add a player token:
      board[row][col] = gameState.player
      // check the resulting board for winning options
      let count = 0
      checkForWinningMoves(board, gameState.player).forEach(move => {
        if (move) {
          count++ // increment counter for each winning move
        }
      })
      // if count >= 2, then need to keep track of what move the player did to allow multiple winning moves (col)
      if (count >= 2) {
        colsToGuaranteeWin.push(col)
      }
      // remove the test token:
      board[row][col] = 0
    }
  }
  return colsToGuaranteeWin
}

// returns an array, where true represents a winning move that could be played, otherwise false
function checkForWinningMoves (boardState, player) {
  const possibleMoves = findAvailableColumns(boardState)
  const testBoard = [...boardState]
  const winningMovesArray = []

  for (let col = 0; col < testBoard[0].length; col++) {
    if (possibleMoves[col]) {
      if (addTestToken(col, player, testBoard)) {
        winningMovesArray.push(true)
      } else {
        winningMovesArray.push(false)
      }
    } else {
      winningMovesArray.push(false) // because column is full
    }
  }
  return winningMovesArray
}

export function gameOver (setGameState, setMessageState, gameState) {
  setGameState({
    ...gameState,
    gameOver: true
  })
  let winnerMsg = ''

  if (gameState.currentPlayer === 1) {
    winnerMsg = 'You Win'
  } else {
    winnerMsg = 'Computer Wins'
  }

  setMessageState(`Game Over! ${winnerMsg}!`)
}

// ------Implementing some AI------
// Step 1: determine how many columns are available to play
// >> const possibleMoves = [col1, col2, col4, col5, col6]
// Step 2: check if any of those options will cause computer to win, if so, make that move
// Step 3: check if player could win next move, if so, block them
// Step 4: check if any of those moves will allow player to win. if so, don't make that move.
// Step5: if there are no suitable moves, the computer won't make a move. Need to update so that if the only available columns will allow the player to win, then pick one of those at random
// Annouce the winner in the message
// Make game stop once somebody wins

// >> TODO:
// Stop game when board is full
// add button to reset the board
// keep a tally of wins
// add taunts from computer in messageState
// add sound effects: dropping tokens, if column is full, when computer blocks, and winning

//
