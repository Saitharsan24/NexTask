import {React,useState,useEffect} from 'react'
import './taskTileToDo.css'
import {FaTrashCan} from 'react-icons/fa6'
import { Button } from 'react-bootstrap'
import Axios from 'axios'


function TodoTaskTile({task, deleteStatus, viewDetails}) {
    const taskId = task.task_id;
    const [taskOwner,setTaskOwner] = useState(false);

    const createdOn = task.created_on;
    const datePart = createdOn.split('T')[0];

    const [createdBy, setCreatedBy] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
            if(task.created_by == task.user_id){
                setTaskOwner(true);
            }
    });

    const baseURL = 'http://localhost:3001/api';
    useEffect(() => {
        const asyncFunc = async () => {
       await Axios.get(baseURL+'/getUserById/'+task.created_by,{
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }}
            ).then((response) => {
                setCreatedBy(response.data[0].first_name);
            }).catch((error) => {
                console.log(error);
            });

        if (task.created_by != task.user_id) {
        await Axios.get(baseURL+'/getUserById/'+task.user_id,{
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
        }

        asyncFunc();
    },[]);

    const handleStart = () => {
       
        Axios.put(baseURL+'/startTask/'+taskId,
            {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }
        ).then((response) => {
            console.log(response);
            localStorage.setItem('message',"Task started successfully !");
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }


  return (
    <>
    <div className='task-tile-main shadow'>
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
                <Button variant='outline-primary' onClick={handleStart}>Start</Button>
            </div>
        </div>
    </div>
    </>
  )
}

export default TodoTaskTile

