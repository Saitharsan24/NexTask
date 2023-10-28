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

  //state variable for message popup
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [popupMessage, setMessage] = useState('');

  //state variable for current task id
  const [currentTaskId, setCurrentTaskId] = useState(null);

  //current task
  const [currentTask, setCurrentTask] = useState(null);

  //get your id from localstorage 
  const user = JSON.parse(localStorage.getItem('user'));

  

  const [toDo,setToDo] = useState([]);
  const [inProcess,setInProcess] = useState([]);
  const [completed,setCompleted] = useState([]);

  //message popup
  useEffect(() => {
    let message = localStorage.getItem('message');
    if (message) {
      setMessage(message);
      setShowMessagePopup(true);
      setTimeout(() => { 
        setShowMessagePopup(false);
        localStorage.removeItem('message');
      }, 3000);
    }
  }, [showCreateNewTask, showDeletePopUp, showDetailsPopup]);

  //get tasks from database
  const baseURL = 'http://localhost:3001/api';

  useEffect(() => {
    const asyncFunc = async () => {
    await Axios.get(baseURL+'/task/getTodo/'+user.userId,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }}
    )
    .then((response) => {
      setToDo(response.data);
    })
    .catch((error) => {
      console.log(error);
    })

    await Axios.get(baseURL+'/task/getInprocess/'+user.userId,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }}
    )
    .then((response) => {
      setInProcess(response.data);
    })
    .catch((error) => {
      console.log(error);
    })

    await Axios.get(baseURL+'/task/getComplete/'+user.userId,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }}
    )
    .then((response) => {
      setCompleted(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    }
    asyncFunc();
  },[showCreateNewTask,showDeletePopUp,showDetailsPopup]);

  const toggleDeletePopUp = (taskId) => {
    setCurrentTaskId(taskId)
    setShowDeletePopUp(prevState => !prevState);
  }

  const toggleDetailsPopUp = (task) => {
    setCurrentTask(task)
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
                <div className="login-signin-popup"><p>{popupMessage}</p></div>)
    }

    {showDetailsPopup && (
                <ViewTaskDetails onClose={() => setShowDetailsPopup(false)} details={currentTask}/>
    )
    }

    {showDeletePopUp && (
                <DeletePopUp taskId={currentTaskId} onClose={() => setShowDeletePopUp(false)} />
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
