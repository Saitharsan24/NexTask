import React from 'react'
import './deletePopUp.css'
import { Button } from 'react-bootstrap'
import Axios from 'axios'

function deletePopUp({onClose,taskId}) {

  const baseURL = 'http://localhost:3001/api';

  const deleteTask = () => {
    Axios.delete(baseURL+'/deleteTask/'+taskId,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }}
    )
    .then((response) => {
      console.log(response);
      localStorage.setItem('message',"Task deleted successfully !");
      onClose();
    })
    .catch((error) => {
      console.log(error);
    })  
  }

  return (
    <div className="popup">
        <div className="popup-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className='delete-btn-set'>
                <Button variant='outline-primary' onClick={onClose}>Cancel</Button>
                <Button variant='outline-primary' onClick={deleteTask} className='delete-btn'>Delete</Button>
            </div>
        </div>
    </div>
  )
} 

export default deletePopUp
