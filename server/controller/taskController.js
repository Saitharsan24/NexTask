const taskHandler = require("../model/taskModel");


const createTaskHandler = async (req, res) => {
    
    const { title, description, createdBy, assignedTo } = req.body;

    try {
        const data = await taskHandler.createTask({ title, description, createdBy});
        const taskId = data.task_id;
        console.log(assignedTo);
        if(assignedTo !== createdBy){
            const userAssign = await taskHandler.assignTask({taskId,assignedTo: createdBy});
        }
        const ownerAssign = await taskHandler.assignTask({taskId,assignedTo: assignedTo});

        return res.status(200).send(data);
        
    } catch (e) {   
        console.log(e.message);
        return res.status(500).send("internal server error");
    }
}

const deleteTaskHandler = async (req, res) => {

}

const getTodoTasksHandler = async (req, res) => {
    const userId = req.params.id;
    const status = 0;
    // console.log(userId,status);  

    const data = await taskHandler.getTasks({ userId,status});
    res.status(200).send(data);
};

const getInProcessTasksHandler = async (req, res) => {
    const userId = req.params.id;
    const status = 1;
    // console.log(userId,status);  

    const data = await taskHandler.getTasks({ userId,status});
    res.status(200).send(data);
};

const getCompleteTasksHandler = async (req, res) => {
    const userId = req.params.id;
    const status = 2;
    // console.log(userId,status);  

    const data = await taskHandler.getTasks({ userId,status});
    res.status(200).send(data);
};

module.exports= { createTaskHandler, getTodoTasksHandler, getInProcessTasksHandler, getCompleteTasksHandler,deleteTaskHandler };