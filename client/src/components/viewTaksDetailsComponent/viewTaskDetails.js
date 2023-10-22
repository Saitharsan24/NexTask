import React from 'react'
import './viewTaskDetails.css'
import { Button } from 'react-bootstrap'

function ViewTaskDetails({onClose}) {
  return (
    <div className="popup">
        <div className='view-details'>
            <h2>Title</h2>
            <div className='task-details-fields'>
                <p>Title :</p>
                <input type="text" />
            </div>
            <div className='task-details-fields'>
                <p>Description :</p>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className='task-details-fields field-3'>
                <div>
                    <p>Created on :</p>
                    <input type="text" />
                </div>
                <div>
                    <p>Created by :</p>
                    <input type="text" />
                </div>
            </div>
            <div className='task-details-fields'>
                <p>Assigned to :</p>
                <input type="text" />
            </div>
            <div className='details-btn'>
                <Button variant='primary' onClick={onClose}>Cancel</Button>
                <Button variant='primary'>Update</Button>
            </div>
        </div>
    </div>
  )
}

export default ViewTaskDetails
