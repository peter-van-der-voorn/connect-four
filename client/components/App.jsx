import React from 'react'
import { Route } from 'react-router-dom'
import { findLowestCell } from './utils'
import Header from './Header'
import Board from './Board'
import Description from './Description'

function App () {
  return (
    <>
      <Header />
      <Board />
      <Description />
    </>

  )
}

export default App
