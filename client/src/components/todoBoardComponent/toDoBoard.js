import {React,useState,useEffect} from 'react'
import './toDoBoard.css'
import ToDoColumn from '../todoColumnComponent/todoColumn'
import DeletePopUp from '../deleltePopUp/deletePopUp'
import ViewTaskDetails from '../viewTaksDetailsComponent/viewTaskDetails'
import CreateNewTask from '../newTaskComponent/createNewTask'
import Axios from 'axios'

function ToDoBoard() {

  //state variables for delete pop up showup and collapse
  const [showDeletePopUp,setShowDeletePopUp] = useState(false);

  //state variables for view task details pop up showup and collapse
  const [showDetailsPopup,setShowDetailsPopup] = useState(false);

  //state variables for create new task pop up showup and collapse
  const [showCreateNewTask,setShowCreateNewTask] = useState(false);

  //getting local storage message
  const message = localStorage.getItem('message');
  const [showMessagePopup, setShowMessagePopup] = useState(message);

  //get your id from localstorage 
  const user = JSON.parse(localStorage.getItem('user'));


  const [toDo,setToDo] = useState([]);
  const [inProcess,setInProcess] = useState([]);
  const [completed,setCompleted] = useState([]);

  //message popup
  useEffect(() => {
    if (message) {
      setTimeout(() => { 
        setShowMessagePopup(false);
        localStorage.removeItem('message');
      }, 3000);
    }
  }, [message]);

  //get tasks from database

  const baseURL = 'http://localhost:3001/api';

  useEffect(() => {
    Axios.get(baseURL+'/getTodo/'+user.userId,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }}
    )
    .then((response) => {
      setToDo(response.data);
      // console.log(toDo);
    })
    .catch((error) => {
      console.log(error);
    })

    Axios.get(baseURL+'/getInprocess/'+user.userId,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }}
    )
    .then((response) => {
      setCompleted(response.data);
      // console.log(toDo);
    })
    .catch((error) => {
      console.log(error);
    })

    Axios.get(baseURL+'/getComplete/'+user.userId,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }}
    )
    .then((response) => {
      setInProcess(response.data);
      // console.log(toDo);
    })
    .catch((error) => {
      console.log(error);
    })
  },[]);

  const toggleDeletePopUp = () => {
    setShowDeletePopUp(prevState => !prevState);
  }

  const toggleDetailsPopUp = () => {
    setShowDetailsPopup(prevState => !prevState);
  }

  const toggleCreateTaskPopup = () => {
    setShowCreateNewTask(prevState => !prevState);
  }
 

  return (
    <>
    {showCreateNewTask && (
                <CreateNewTask onClose={() => setShowCreateNewTask(false)} />
    )
    }

    {showMessagePopup && (
                <div className="login-signin-popup"><p>{message}</p></div>)
    }

    {showDetailsPopup && (
                <ViewTaskDetails onClose={() => setShowDetailsPopup(false)} />
    )
    }

    {showDeletePopUp && (
                <DeletePopUp onClose={() => setShowDeletePopUp(false)} />
    )}

    <div className='user-home'>
        <ToDoColumn title='To do' type='todo-text-color' data={toDo} deleteStatus={toggleDeletePopUp} viewDetails={toggleDetailsPopUp} createTask={toggleCreateTaskPopup} />
        <ToDoColumn title='In Process' type='in-progress-text-color' data={inProcess} deleteStatus={toggleDeletePopUp} viewDetails={toggleDetailsPopUp}/>
        <ToDoColumn title='Completed' type='completed-text-color' data={completed} deleteStatus={toggleDeletePopUp} viewDetails={toggleDetailsPopUp}/>
    </div>
    </>
  )
}

export default ToDoBoard
