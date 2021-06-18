import React from 'react'
import classNames from 'classnames'

function Cell ({ state }) {
  const circleClass = classNames(
    'circle',
    {
      yellow: (state === 1),
      red: (state === 2)

    })

  const cellClass = classNames(
    'grid-item'
  )

  return (
    <div className={cellClass} >
      <div className={circleClass} />
    </div>
  )
}

export default Cell
