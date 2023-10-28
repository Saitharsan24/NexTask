import React, { useEffect , useState} from 'react'
import './createNewTask.css'
import { Button } from 'react-bootstrap'
import Axios from 'axios';
import Select from 'react-select';


function CreateNewTask({onClose, allUsers}) {
    
    const baseURL = 'http://localhost:3001/api';

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const myAccount = JSON.parse(localStorage.getItem('user'));

    const handleChange = (option) => {
        setSelectedOption(option);
    }

    setUsers(allUsers.map((items) => ({
        value: items.user_id,
        label: items.first_name + " - " + items.email
    })
    ));
    
    const createTask = () => {
        Axios.post(baseURL+'/newTask',
            {
                title: title,
                description: description,
                assignedTo: selectedOption.value,
                createdBy: myAccount.userId        
            },
            {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
    ).then((response) => {        
            console.log(response);
            localStorage.setItem('message',"Task created successfully !");
            onClose();
        }).catch((error) => {
            console.log(error);
        })
    }

  return (
    <div>
      <div className="popup">
      <div className='view-details new-task-div'>
        <h2>Title</h2>
            <div className='task-details-fields'>
                <p>Title :</p>
                <input type="text" onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className='task-details-fields'>
                <p>Description :</p>
                <textarea name="" id="" cols="30" rows="10" onChange={(event) => setDescription(event.target.value)}></textarea>
            </div>
            <div className='task-details-fields'>
                <p>Assign to (optional) :</p>
                <Select 
                    className='select-user'
                    options={users} 
                    onChange={handleChange}
                    value={selectedOption} />

            </div>
            <div className='details-btn'>
                <Button variant='primary' onClick={onClose} className='create-task-btn'>Cancel</Button>
                <Button variant='primary' onClick={createTask} className='create-task-btn'>Create</Button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CreateNewTask
