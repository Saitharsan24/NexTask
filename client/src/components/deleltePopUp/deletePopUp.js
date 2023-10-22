import React from 'react'
import './deletePopUp.css'
import { Button } from 'react-bootstrap'

function deletePopUp({onClose}) {
  return (
    <div className="popup">
        <div className="popup-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className='delete-btn-set'>
                <Button variant='outline-primary' onClick={onClose}>Cancel</Button>
                <Button variant='outline-primary' className='delete-btn'>Delete</Button>
            </div>
        </div>
    </div>
  )
}

export default deletePopUp
