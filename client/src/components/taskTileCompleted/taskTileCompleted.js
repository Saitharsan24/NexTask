import {React,useState,useEffect} from 'react'
import './taskTileCompleted.css'
import {FaEdit} from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import {FaTrashCan} from 'react-icons/fa6'
import Axios from 'axios'

function TodoTaskTile({task, deleteStatus, viewDetails}) {
    const taskId = task.task_id;
    const [taskOwner,setTaskOwner] = useState(false);

    const createdOn = task.created_on;
    const datePart = createdOn.split('T')[0];

    useEffect(() => {
            if(task.created_by == task.user_id){
                setTaskOwner(true);
            }
    });

    const [createdBy, setCreatedBy] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const baseURL = 'http://localhost:3001/api';
    useEffect(() => {
        Axios.get(baseURL+'/getUserById/'+task.created_by,{
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }}
            ).then((response) => {
                setCreatedBy(response.data[0].first_name);
            }).catch((error) => {
                console.log(error);
            });

        if (task.created_by != task.user_id) {
            Axios.get(baseURL+'/getUserById/'+task.user_id,{
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                setAssignedTo(response.data[0].first_name);
            }).catch((error) => {   
                console.log(error);
            });
        } else {
            setAssignedTo(createdBy);
        }
    });


  return (
    <div className='task-tile-compl-main shadow'>
        <div className='tile-heading'>
            <h6>{task.title}</h6>
        </div>
        <div className='tile-details'>
            <div><p>Created on : <span>{datePart}</span></p></div>
            <div><p>Created by : <span>{createdBy}</span></p></div>
            <div><p>Assigned to : <span>{assignedTo}</span></p></div>
        </div>
        <div className='tile-actions'>
            <div className="tile-icon">
                {taskOwner && <FaTrashCan className='delete-icon' onClick={()=>deleteStatus(taskId)}/>}
            </div>
            <div className='tile-button'>
                <Button variant='outline-primary' onClick={()=>viewDetails(task)}>View</Button>
            </div>
        </div>
    </div>
  )
}

export default TodoTaskTile

