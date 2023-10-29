const express = require("express");
const taskRouter = express.Router();
const taskHandler = require("../controller/taskController");
const middleware = require("../utility/middleware/auth");

taskRouter.get("/getTodo/:id",middleware, taskHandler.getTodoTasksHandler);
taskRouter.get("/getInprocess/:id",middleware, taskHandler.getInProcessTasksHandler);
taskRouter.get("/getComplete/:id",middleware, taskHandler.getCompleteTasksHandler);
taskRouter.post("/newTask",middleware, taskHandler.createTaskHandler);
taskRouter.delete("/deleteTask/:id",middleware, taskHandler.deleteTaskHandler);
taskRouter.put("/startTask/:id", taskHandler.startTaskHandler);
taskRouter.put("/completeTask/:id", taskHandler.completeTaskHandler);
taskRouter.put("/updateTask", taskHandler.updateTaskHandler);

module.exports = taskRouter;