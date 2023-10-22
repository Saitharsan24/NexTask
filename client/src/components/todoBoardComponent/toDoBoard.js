import {React,useState} from 'react'
import './toDoBoard.css'
import ToDoColumn from '../todoColumnComponent/todoColumn'
import DeletePopUp from '../deleltePopUp/deletePopUp'

function ToDoBoard() {

  const [showDeletePopUp,setShowDeletePopUp] = useState(false);

  const toggleDeletePopUp = () => {
    setShowDeletePopUp(prevState => !prevState);
  }

  const toDo = [
    {
        title:'Task 01',
        createdOn:'22/10/2023',
        createdBy:'Saitharsan',
        assignedTo:'Saitharsan'
    },

    {
      title:'Task 02',
      createdOn:'22/10/2023',
      createdBy:'Laxshan',
      assignedTo:'Laxshan'
    },
    {
      title:'Task 01',
      createdOn:'22/10/2023',
      createdBy:'Saitharsan',
      assignedTo:'Saitharsan'
  }
  ]

  const inProgress = [
    {
        title:'Task 01',
        createdOn:'22/10/2023',
        createdBy:'Saitharsan',
        assignedTo:'Saitharsan'
    },

    {
      title:'Task 02',
      createdOn:'22/10/2023',
      createdBy:'Laxshan',
      assignedTo:'Laxshan'
    },

    {
      title:'Task 03',
      createdOn:'22/10/2023',
      createdBy:'Laxshan',
      assignedTo:'Laxshan'
    },

    {
      title:'Task 04',
      createdOn:'22/10/2023',
      createdBy:'Laxshan',
      assignedTo:'Laxshan'
    }
  ]

 

  return (
    <>
    {showDeletePopUp && (
                <DeletePopUp onClose={() => setShowDeletePopUp(false)} />
    )}
    <div className='user-home'>
        <ToDoColumn title='To do' type='todo-text-color' data={toDo} deleteStatus={toggleDeletePopUp}/>
        <ToDoColumn title='In Process' type='in-progress-text-color' data={inProgress} deleteStatus={toggleDeletePopUp}/>
        <ToDoColumn title='Completed' type='completed-text-color' deleteStatus={toggleDeletePopUp}/>
    </div>
    </>
  )
}

export default ToDoBoard
