const taskHandler = require("../model/taskModel");


const createTaskHandler = async (req, res) => {
    
    const { title, description, createdBy, assignedTo } = req.body;

    try {
        const data = await taskHandler.createTask({ title, description, createdBy});
        const taskId = data.task_id;
        
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
    try {
        const taskId = req.params.id;  
        const data = await taskHandler.deleteTask({taskId});
        return res.status(200).send(data);
    } catch (e) {
        console.log(e.message);
        return res.status(500).send("internal server error");
    }
}

const getTodoTasksHandler = async (req, res) => {
    try {
        const userId = req.params.id;
        const status = 0;
        // console.log(userId,status);  

        const data = await taskHandler.getTasks({ userId,status});
        return res.status(200).send(data);
    } catch (e) {  
        console.log(e.message);
        return res.status(500).send("internal server error");
    }
};

const getInProcessTasksHandler = async (req, res) => {
    try {
        const userId = req.params.id;
        const status = 1;
        // console.log(userId,status);  

        const data = await taskHandler.getTasks({ userId,status});
        return res.status(200).send(data);
    } catch (e) {  
        console.log(e.message);
        return res.status(500).send("internal server error");
    }
};

const getCompleteTasksHandler = async (req, res) => {
    try {
        const userId = req.params.id;
        const status = 2;
        // console.log(userId,status);  

        const data = await taskHandler.getTasks({ userId,status});
        return res.status(200).send(data);
    } catch (e) {  
        console.log(e.message);
        return res.status(500).send("internal server error");
    }
};

const startTaskHandler = async (req, res) => {
    try {
        console.log(req.user_id);
        const taskId = req.params.id;
        console.log(taskId);
        const status = 1;

        const data = await taskHandler.updateTaskStatus({status,taskId});
        return res.status(200).send();
    } catch (e) {
        console.log(e.message);
        return res.status(500).send("internal server error");
    }
}

const completeTaskHandler = async (req, res) => {
    try {
        console.log(req.user_id);
        const taskId = req.params.id;
        const status = 2;

        const data = await taskHandler.updateTaskStatus({status,taskId});
        return res.status(200).send();
    } catch (e) {
        console.log(e.message);
        return res.status(500).send("internal server error");
    }
}

const updateTaskHandler = async (req, res) => {
    try {
        const task = req.body;
        const data = await taskHandler.updateTask({task});
        return res.status(200).send();
    } catch (e) {
        console.log(e.message);
        return res.status(500).send("internal server error");
    }
}

const updateUserTaskHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const taskId = req.params.taskId;
        const data = await taskHandler.updateUserTask({userId,taskId});
        return res.status(200).send();
    } catch (e) {
        console.log(e.message);
        return res.status(500).send("internal server error");
    }
}

module.exports= { 
    createTaskHandler, 
    getTodoTasksHandler, 
    getInProcessTasksHandler, 
    getCompleteTasksHandler,
    deleteTaskHandler,
    startTaskHandler,
    completeTaskHandler,
    updateTaskHandler,
    updateUserTaskHandler };