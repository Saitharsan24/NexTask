import React from 'react'
import './toDoBoard.css'
import ToDoColumn from '../todoColumnComponent/todoColumn'

function toDoBoard() {
  return (
    <div className='user-home'>
        <ToDoColumn title='To do' type='todo-text-color'/>
        <ToDoColumn title='In Process' type='in-progress-text-color'/>
        <ToDoColumn title='Completed' type='completed-text-color'/>
    </div>
  )
}

export default toDoBoard
