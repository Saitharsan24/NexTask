import React from 'react'
import './taskTileCompleted.css'
import {FaEdit} from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import {FaTrashCan} from 'react-icons/fa6'


function TodoTaskTile({task, deleteStatus, viewDetails}) {
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
                <FaTrashCan className='delete-icon' onClick={deleteStatus}/>
            </div>
            <div className='tile-button'>
                <Button variant='outline-primary' onClick={viewDetails}>View</Button>
            </div>
        </div>
    </div>
  )
}

export default TodoTaskTile

