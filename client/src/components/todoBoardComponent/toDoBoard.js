import {React,useState} from 'react'
import './toDoBoard.css'
import ToDoColumn from '../todoColumnComponent/todoColumn'
import DeletePopUp from '../deleltePopUp/deletePopUp'
import ViewTaskDetails from '../viewTaksDetailsComponent/viewTaskDetails'

function ToDoBoard() {

  //state variables for delete pop up showup and collapse
  const [showDeletePopUp,setShowDeletePopUp] = useState(false);

  //state variables for view task details pop up showup and collapse
  const [showDetailsPopup,setShowDetailsPopup] = useState(false);

  const toggleDeletePopUp = () => {
    setShowDeletePopUp(prevState => !prevState);
  }

  const toggleDetailsPopUp = () => {
    setShowDetailsPopup(prevState => !prevState);
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
    {showDetailsPopup && (
                <ViewTaskDetails onClose={() => setShowDetailsPopup(false)} />
    )

    }
    {showDeletePopUp && (
                <DeletePopUp onClose={() => setShowDeletePopUp(false)} />
    )}
    <div className='user-home'>
        <ToDoColumn title='To do' type='todo-text-color' data={toDo} deleteStatus={toggleDeletePopUp} viewDetails={toggleDetailsPopUp}/>
        <ToDoColumn title='In Process' type='in-progress-text-color' data={inProgress} deleteStatus={toggleDeletePopUp} viewDetails={toggleDetailsPopUp}/>
        <ToDoColumn title='Completed' type='completed-text-color' deleteStatus={toggleDeletePopUp} viewDetails={toggleDetailsPopUp}/>
    </div>
    </>
  )
}

export default ToDoBoard
