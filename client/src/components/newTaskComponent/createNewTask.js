import React from 'react'
import './createNewTask.css'
import { Button } from 'react-bootstrap'

function CreateNewTask({onClose}) {
  return (
    <div>
      <div className="popup">
      <div className='view-details new-task-div'>
        <h2>Title</h2>
            <div className='task-details-fields'>
                <p>Title :</p>
                <input type="text" />
            </div>
            <div className='task-details-fields'>
                <p>Description :</p>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className='task-details-fields'>
                <p>Assign to (optional) :</p>
                <input type="text" />
            </div>
            <div className='details-btn'>
                <Button variant='primary' onClick={onClose} className='create-task-btn'>Cancel</Button>
                <Button variant='primary' className='create-task-btn'>Create</Button>
            </div>
            
        </div>
        </div>
    </div>
  )
}

export default CreateNewTask
