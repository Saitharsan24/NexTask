import {React,useState,useEffect} from 'react'
import './viewTaskDetails.css'
import { Button } from 'react-bootstrap'
import Axios from 'axios'
import {FaEdit} from 'react-icons/fa'
import Select from 'react-select';

function ViewTaskDetails({onClose , details}) {

    // console.log(details);
    const createdOn = details.created_on;
    const datePart = createdOn.split('T')[0];

    const [taskOwner,setTaskOwner] = useState(false);
    const [editState, setEditState] = useState(false);

    const resetState = () => {
        setEditState(!editState) ;
        setTaskOwner(!taskOwner);
    }

    const [createdBy, setCreatedBy] = useState('');

    const [assignedTo, setAssignedTo] = useState(null);
    const [initialAssignedTo, setInitialAssignedTo] = useState('');

    const [title, setTitle] = useState('');
    const [initialTitle, setInitialTitle] = useState('');

    const [description, setDescription] = useState('');
    const [initialDescription, setInitialDescription] = useState('');

    const [users, setUsers] = useState([]);


    //handle editing 

    const handleChange = (option) => {
        setAssignedTo(option);
    }

    const baseURL = 'http://localhost:3001/api';

    const handleEdit = () => {
        setInitialTitle(title);
        setInitialDescription(description);
        setInitialAssignedTo(assignedTo);
        setEditState(!editState);

        //getting all users
        Axios.get(baseURL+'/user/getUsers',{
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }}
            )   
            .then((response) => {
                setUsers(response.data.map((items) => ({
                    value: items.user_id,
                    label: items.first_name + " - " + items.email
                })
                ));
            })
            .catch((error) => {
            console.log(error);
            })

    }

    const handleCancelEdit = () => {
        setTitle(initialTitle);
        setInitialDescription(initialDescription);
        setInitialAssignedTo(initialAssignedTo);
        setEditState(!editState);
        onClose();
    }

    //getting created by user details
    //getting assigned to user details
// useEffect(() => {

//     const fetchData = () => {

//         if(details.created_by == details.user_id){
//             setTaskOwner(true);
//         }

//         setDescription(details.description);
//         setTitle(details.title);

//         Axios.get(baseURL+'/user/getUserById/'+details.created_by,{
//             headers: {
//                 'authorization': `Bearer ${localStorage.getItem('token')}`
//             }}
//             ).then((response) => {
//                 setCreatedBy(response.data[0]);
//             }).catch((error) => {
//                 console.log(error);
//             });

//         if (details.created_by != details.user_id) {
//             Axios.get(baseURL+'/user/getUserById/'+details.user_id,{
//                 headers: {
//                     'authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             }).then((response) => {
//                 setAssignedTo({
//                     value: response.data[0].user_id,
//                     label: response.data[0].first_name + " - " + response.data[0].email
//                 });
//             }).catch((error) => {   
//                 console.log(error);
//             });
//         } else {
//             if(createdBy) {
//                 setAssignedTo({
//                     value: createdBy.user_id,
//                     label: createdBy.first_name + " - " + createdBy.email
//                 });
//             }
//         }
        
//             Axios.get(baseURL+'/user/getUsers',{
//             headers: {
//                 'authorization': `Bearer ${localStorage.getItem('token')}`
//             }})
//             .then((response) => {
//                 setUsers(response.data.map((items) => ({
//                     value: items.user_id,
//                     label: items.first_name + " - " + items.email
//                 })
//                 ));
//             }).catch((error) => {
//                 console.log(error);
//             });

//     }

//     fetchData();

// },[]);

useEffect(() => {
    const fetchData = async () => {
        try {
            // Check task ownership
            if (details.created_by === details.user_id) {
                setTaskOwner(true);
            }

            // Set description and title from props
            setDescription(details.description);
            setTitle(details.title);

            // Fetch Created By user
            const createdByResponse = await Axios.get(baseURL + '/user/getUserById/' + details.created_by, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCreatedBy(createdByResponse.data[0]);

            // Determine and fetch Assigned To user
            let assignedUser;
            if (details.created_by !== details.user_id) {
                const assignedToResponse = await Axios.get(baseURL + '/user/getUserById/' + details.user_id, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                assignedUser = assignedToResponse.data[0];
            } else {
                assignedUser = createdByResponse.data[0];
            }

            setAssignedTo({
                value: assignedUser.user_id,
                label: assignedUser.first_name + " - " + assignedUser.email
            });

            // Fetch all users
            const usersResponse = await Axios.get(baseURL + '/user/getUsers', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(usersResponse.data.map(item => ({
                value: item.user_id,
                label: item.first_name + " - " + item.email
            })));

        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    fetchData();
}, []);



  return (
    <div className="popup">
        <div className='view-details'>
            <h2>{details.title}</h2>
            <div className='task-details-fields'>
                <p>Title :</p>
                <input type="text" value={title} disabled={!editState}/>
            </div>
            <div className='task-details-fields'>
                <p>Description :</p>
                <textarea name="" id="" cols="30" rows="10" value={description} disabled={!editState}></textarea>
            </div>
            <div className='task-details-fields field-3'>
                <div>
                    <p>Created on :</p>
                    <input type="text" value={datePart} disabled/>
                </div>
                <div>
                    <p>Created by :</p>
                    <input type="text" value={createdBy.first_name} disabled/>
                </div>
            </div>
            <div className='task-details-fields'>
                <p>Assigned to :</p>
                <Select 
                    options={editState && users}
                    value={assignedTo}
                    defaultValue={assignedTo}
                    onChange={handleChange}
                    isDisabled={!editState}
                />
            </div>
            <div className='details-btn'>
                <div>
                {(taskOwner && !editState) && <FaEdit className='edit-icon' onClick={handleEdit}/>}
                </div>
                <div className="update-btn">
                    <Button variant='primary' onClick={handleCancelEdit}>Cancel</Button>
                    {editState && <Button variant='primary' onClick={()=>resetState()}>Update</Button>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewTaskDetails
