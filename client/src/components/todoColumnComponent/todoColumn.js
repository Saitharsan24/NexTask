import React from 'react'
import './todoColumn.css'

function todoColumn({title,type}) {
  return (
    <div className='todo-column '>
      <div className='todo-outline'>
        <div className={type +' '+'todo-column-title'}>
          <h5>{title}</h5>
        </div>
        <div className='task-list'>
          <div className='task'></div>
        </div>
      </div>
    </div>
  )
}

export default todoColumn
