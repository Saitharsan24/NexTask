const db = require("../utility/database");

const getTasks = async ({userId,status}) => {
    return db.execute(`SELECT user_task.task_id,title,description,created_on,created_by,status,user_task.user_id,first_name FROM ((user_task 
                            INNER JOIN task ON user_task.task_id = task.task_id)
                            INNER JOIN user ON user_task.user_id = user.user_id)
                            WHERE user_task.user_id= ? AND status = ?;`,
                        [userId,status]   
    ).then((res)=>{
        return res[0];
    })
}

const createTask = async ({title,description,createdBy}) => {
    await db.execute(`INSERT INTO task (title,description,created_by,created_on,status) VALUES (?,?,?,NOW(),0);`,
                        [title,description,createdBy]
    )

    return await db.execute(`SELECT task_id FROM task WHERE created_by = ? ORDER BY created_on DESC LIMIT 1;`,
                        [createdBy]
    ).then((res)=>{
        return res[0][0];
    })
}

const assignTask = async ({taskId,assignedTo}) => {
    await db.execute(`INSERT INTO user_task (task_id,user_id) VALUES (?,?);`,
                        [taskId,assignedTo]
    ).then((res)=>{
        return res[0][0];
    })
}

const deleteTask = async ({taskId}) => {
    await db.execute(`DELETE FROM task WHERE task_id = ?;`,
                        [taskId]
    ).then((res)=>{
        return res[0][0];
    })
}

const updateTask = async ({task}) => {
    await db.execute(`UPDATE task SET title = ?, description = ? WHERE task_id = ?;`,
                        [task.title,task.description,task.task_id]
    ).then((res)=>{
        return res[0][0];
    })
}

const updateUserTask = async ( {userId,taskId} ) => {
    await db.execute(`UPDATE user_task SET user_id = ? WHERE task_id = ?;`,
                        [userId,taskId]
    ).then((res)=>{
        return res[0][0];
    })
}

const updateTaskStatus = async ( {status,taskId} ) => {
    await db.execute(`UPDATE task SET status = ? WHERE task_id = ?;`,
                        [status,taskId]
    ).then((res)=>{
        return res[0][0];
    })
}

module.exports = { getTasks,createTask,assignTask,deleteTask, updateTask, updateTaskStatus,updateUserTask };