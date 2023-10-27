import React from 'react'
import './todoColumn.css'
import TaskTileToDo from '../taskTileToDo/taskTileToDo'
import TaskTileInProgress from '../taskTileInProgress/taskTileInProgress'
import TaskTileCompleted from '../taskTileCompleted/taskTileCompleted'
import { Button } from 'react-bootstrap'

function todoColumn({title,type,data =[],deleteStatus, viewDetails, createTask}) {

    let TaskTileComponent;
    console.log(data);
    switch(type) {
      case 'todo-text-color':
        TaskTileComponent = TaskTileToDo;
        break;
      case 'in-progress-text-color':
        TaskTileComponent = TaskTileInProgress;
        break;
      case 'completed-text-color':
        TaskTileComponent = TaskTileCompleted;
        break;
      default:
        TaskTileComponent = () => null; // default to a no-op function
    }

  return (
    <div className='todo-column '>
      <div className='todo-outline'>
        <div className={type +' '+'todo-column-title'}>
          <h5>{title}</h5>
        </div>
        {
         title=="To do" && <Button onClick={createTask} className='new-task-btn'>+ New task</Button>
        }
        <div className='task-list'>
          {Array.isArray(data) && data.map(task => <TaskTileComponent key={task.title} task={task} deleteStatus={deleteStatus} viewDetails={viewDetails}/>)}
        </div>
      </div>
    </div>
  )
}

export default todoColumn
