import React from 'react'
import { Route } from 'react-router-dom'
import { findLowestCell } from './utils'
import Header from './Header'
import Board from './Board'

function App () {
  return (
    <>
      <Header />
      <Board />
    </>

  )
}

export default App
