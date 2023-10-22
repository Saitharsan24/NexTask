import React from 'react'
import './taskTileCompleted.css'
import {FaEdit} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import { Button } from 'react-bootstrap'


function TodoTaskTile({task,deleteStatus}) {
  return (
    <div className='task-tile-compl-main shadow'>
        <div className='tile-heading'>
            <h6>{task.title}</h6>
        </div>
        <div className='tile-details'>
            <div><p>Created on : <span>{task.createdOn}</span></p></div>
            <div><p>Created by : <span>{task.createdBy}</span></p></div>
            <div><p>Assigned to : <span>{task.assignedTo}</span></p></div>
        </div>
        <div className='tile-actions'>
            <div className="tile-icon">
                <AiFillDelete className='delete-icon' onClick={deleteStatus}/>
            </div>
            <div className='tile-button'>
                <Button variant='outline-primary'>View</Button>
            </div>
        </div>
    </div>
  )
}

export default TodoTaskTile

