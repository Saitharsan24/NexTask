const db = require("../utility/database");
const jwt = require("jsonwebtoken");

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

const deleteTask = async () => {
    
}

module.exports = { getTasks,createTask,assignTask };