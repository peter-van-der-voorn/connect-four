import React, { useState } from 'react'
import Cell from './Cell'

const initialGameState = {
  player: 1,
  computer: 2,
  currentPlayer: 2,
  board: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 2, 1, 1],
    [0, 0, 2, 2, 1, 1, 1]
  ],
  gameOver: false,
  message: ''
}

function Board () {
  const [gameState, setGameState] = useState(initialGameState)

  // const boardArray = []

  // for (let row = 0; row < 6; row++) {
  //   boardArray.push([])
  //   for (let col = 0; col < 7; col++) {
  //     return (

  //       boardArray[row].push(<Cell state={gameState.board[{ row }][{ col }]} />)
  //     )
  //   }
  // }

  return (
    <div className="grid-container">

      <Cell state={gameState.board[0][0]} />
      <Cell state={gameState.board[0][1]} />
      <Cell state={gameState.board[0][2]} />
      <Cell state={gameState.board[0][3]} />
      <Cell state={gameState.board[0][4]} />
      <Cell state={gameState.board[0][5]} />
      <Cell state={gameState.board[0][6]} />

      <Cell state={gameState.board[1][0]} />
      <Cell state={gameState.board[1][1]} />
      <Cell state={gameState.board[1][2]} />
      <Cell state={gameState.board[1][3]} />
      <Cell state={gameState.board[1][4]} />
      <Cell state={gameState.board[1][5]} />
      <Cell state={gameState.board[1][6]} />

      <Cell state={gameState.board[2][0]} />
      <Cell state={gameState.board[2][1]} />
      <Cell state={gameState.board[2][2]} />
      <Cell state={gameState.board[2][3]} />
      <Cell state={gameState.board[2][4]} />
      <Cell state={gameState.board[2][5]} />
      <Cell state={gameState.board[2][6]} />

      <Cell state={gameState.board[3][0]} />
      <Cell state={gameState.board[3][1]} />
      <Cell state={gameState.board[3][2]} />
      <Cell state={gameState.board[3][3]} />
      <Cell state={gameState.board[3][4]} />
      <Cell state={gameState.board[3][5]} />
      <Cell state={gameState.board[3][6]} />

      <Cell state={gameState.board[4][0]} />
      <Cell state={gameState.board[4][1]} />
      <Cell state={gameState.board[4][2]} />
      <Cell state={gameState.board[4][3]} />
      <Cell state={gameState.board[4][4]} />
      <Cell state={gameState.board[4][5]} />
      <Cell state={gameState.board[4][6]} />

      <Cell state={gameState.board[5][0]} />
      <Cell state={gameState.board[5][1]} />
      <Cell state={gameState.board[5][2]} />
      <Cell state={gameState.board[5][3]} />
      <Cell state={gameState.board[5][4]} />
      <Cell state={gameState.board[5][5]} />
      <Cell state={gameState.board[5][6]} />

    </div>
  )
}

export default Board
