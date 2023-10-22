import React from 'react'
import './taskTileInProgress.css'
import {FaEdit} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import { Button } from 'react-bootstrap'


function TodoTaskTile({task,deleteStatus}) {
  return (
    <div className='task-tile-inpro-main shadow'>
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
                <FaEdit className='edit-icon'/>
                <AiFillDelete className='delete-icon' onClick={deleteStatus}/>
            </div>
            <div className='tile-button'>
                <Button variant='outline-primary'>View</Button>
                <Button variant='outline-primary'>Complete</Button>
            </div>
        </div>
    </div>
  )
}

export default TodoTaskTile
