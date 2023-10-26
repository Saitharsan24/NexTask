const db = require("../utility/database");

const getTasks = async ({userId}) => {
    return db.execute(`SELECT * FROM tasks WHERE user_id = '${userId}';`).then((res)=>{
        return res[0];
    })
} 