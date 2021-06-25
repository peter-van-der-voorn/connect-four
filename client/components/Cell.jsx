import React from 'react'
import classNames from 'classnames'

function Cell ({ state, handleClick, row, col, handleMouseEnter, hoveredColumnState, handlemouseOut }) {
  const circleClass = classNames(
    'circle',
    {
      yellow: (state === 1),
      red: (state === 2)
    })

  const cellClass = classNames(
    'grid-item',
    {
      hover: (hoveredColumnState === col)
    }
  )

  return (
    <div className={cellClass} >
      <div className={circleClass} onClick={() => handleClick(row, col)} onMouseEnter={() => handleMouseEnter(col)} onMouseOut={() => handlemouseOut(col)}/>
    </div>
  )
}

export default Cell
