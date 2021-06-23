import React, { useEffect, useState } from 'react'
import { addToken, checkForWin, computersTurn, gameOver, toggleTurn } from './utils'

import Cell from './Cell'
import Message from './Message'

const initialGameState = {
  player: 1,
  computer: 2,
  currentPlayer: 1,
  gameOver: false
  // message: ''
}

const initialBoardState = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
]

function Board () {
  const [gameState, setGameState] = useState(initialGameState)
  const [boardState, setBoardState] = useState(initialBoardState)
  const [messageState, setMessageState] = useState("Let's Play!")

  useEffect(() => {
    if (checkForWin(boardState, gameState.currentPlayer)) {
      gameOver(setGameState, setMessageState, gameState)
    }
    // add logic to stop turn changing on first render:
    // i.e. if all cells in bottom row are empty
    if (!boardState[5].every(cell => cell === 0)) {
      toggleTurn(gameState, setGameState)
    }
  }, [boardState])

  useEffect(() => {
    if (gameState.currentPlayer === gameState.computer) {
      computersTurn(boardState, gameState, setBoardState, setGameState)
    }
  }, [gameState.currentPlayer])

  function handleClick (row, col) {
    if (gameState.currentPlayer === gameState.computer) {
      // disables effect of clicking if it is computers turn
      return
    }
    if (!gameState.gameOver) {
      addToken(col, gameState.player, setBoardState, boardState)
    }
    // toggleTurn(gameState, setGameState)
  }

  return (
    <>
      <Message text={messageState} />
      <div className="grid-container">

        <Cell state={boardState[0][0]} row={0} col={0} handleClick={handleClick} />
        <Cell state={boardState[0][1]} row={0} col={1} handleClick={handleClick} />
        <Cell state={boardState[0][2]} row={0} col={2} handleClick={handleClick} />
        <Cell state={boardState[0][3]} row={0} col={3} handleClick={handleClick} />
        <Cell state={boardState[0][4]} row={0} col={4} handleClick={handleClick} />
        <Cell state={boardState[0][5]} row={0} col={5} handleClick={handleClick} />
        <Cell state={boardState[0][6]} row={0} col={6} handleClick={handleClick} />

        <Cell state={boardState[1][0]} row={1} col={0} handleClick={handleClick} />
        <Cell state={boardState[1][1]} row={1} col={1} handleClick={handleClick} />
        <Cell state={boardState[1][2]} row={1} col={2} handleClick={handleClick} />
        <Cell state={boardState[1][3]} row={1} col={3} handleClick={handleClick} />
        <Cell state={boardState[1][4]} row={1} col={4} handleClick={handleClick} />
        <Cell state={boardState[1][5]} row={1} col={5} handleClick={handleClick} />
        <Cell state={boardState[1][6]} row={1} col={6} handleClick={handleClick} />

        <Cell state={boardState[2][0]} row={2} col={0} handleClick={handleClick} />
        <Cell state={boardState[2][1]} row={2} col={1} handleClick={handleClick} />
        <Cell state={boardState[2][2]} row={2} col={2} handleClick={handleClick} />
        <Cell state={boardState[2][3]} row={2} col={3} handleClick={handleClick} />
        <Cell state={boardState[2][4]} row={2} col={4} handleClick={handleClick} />
        <Cell state={boardState[2][5]} row={2} col={5} handleClick={handleClick} />
        <Cell state={boardState[2][6]} row={2} col={6} handleClick={handleClick} />

        <Cell state={boardState[3][0]} row={3} col={0} handleClick={handleClick} />
        <Cell state={boardState[3][1]} row={3} col={1} handleClick={handleClick} />
        <Cell state={boardState[3][2]} row={3} col={2} handleClick={handleClick} />
        <Cell state={boardState[3][3]} row={3} col={3} handleClick={handleClick} />
        <Cell state={boardState[3][4]} row={3} col={4} handleClick={handleClick} />
        <Cell state={boardState[3][5]} row={3} col={5} handleClick={handleClick} />
        <Cell state={boardState[3][6]} row={3} col={6} handleClick={handleClick} />

        <Cell state={boardState[4][0]} row={4} col={0} handleClick={handleClick} />
        <Cell state={boardState[4][1]} row={4} col={1} handleClick={handleClick} />
        <Cell state={boardState[4][2]} row={4} col={2} handleClick={handleClick} />
        <Cell state={boardState[4][3]} row={4} col={3} handleClick={handleClick} />
        <Cell state={boardState[4][4]} row={4} col={4} handleClick={handleClick} />
        <Cell state={boardState[4][5]} row={4} col={5} handleClick={handleClick} />
        <Cell state={boardState[4][6]} row={4} col={6} handleClick={handleClick} />

        <Cell state={boardState[5][0]} row={5} col={0} handleClick={handleClick} />
        <Cell state={boardState[5][1]} row={5} col={1} handleClick={handleClick} />
        <Cell state={boardState[5][2]} row={5} col={2} handleClick={handleClick} />
        <Cell state={boardState[5][3]} row={5} col={3} handleClick={handleClick} />
        <Cell state={boardState[5][4]} row={5} col={4} handleClick={handleClick} />
        <Cell state={boardState[5][5]} row={5} col={5} handleClick={handleClick} />
        <Cell state={boardState[5][6]} row={5} col={6} handleClick={handleClick} />

      </div>
    </>
  )
}

export default Board
