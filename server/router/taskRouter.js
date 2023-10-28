const express = require("express");
const taskRouter = express.Router();
const taskHandler = require("../controller/taskController");

taskRouter.get("/getTodo/:id", taskHandler.getTodoTasksHandler);
taskRouter.get("/getInprocess/:id", taskHandler.getInProcessTasksHandler);
taskRouter.get("/getComplete/:id", taskHandler.getCompleteTasksHandler);
taskRouter.post("/newTask", taskHandler.createTaskHandler);
taskRouter.delete("/deleteTask/:id", taskHandler.deleteTaskHandler);


module.exports = taskRouter; 