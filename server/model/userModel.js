const db = require("../utility/database");

//find user with email
const isExists = ({ email }) => {
    return db
      .query(`SELECT * FROM user WHERE email = ?;`, [email])
      .then((res) => {
        return res[0][0];
      });
  }; 
 
//create user
const signupModel = async ({ firstName, lastName, email, password }) => {
  await db.query(
    `INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?);`,
    [firstName, lastName, email, password]
  );

  return await db
    .query(`SELECT user_id, first_name, email FROM user WHERE email = ?;`,[email])
    .then((res) => {
      return res[0];   
    });
  };

  //get all users
  const getUsers = async () => {
    return db.execute(`SELECT first_name,user_id,email FROM user;`).then((res) => {
      return res[0];
    });
  }

  //get user by id
  const getUserById = async ({userId}) => {
    return db.execute(`SELECT first_name,user_id,email FROM user WHERE user_id = ?;`,
                        [userId]
    ).then((res) => {
      return res[0];
    });
  }

  module.exports = { signupModel, isExists, getUsers, getUserById };