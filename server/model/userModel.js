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

  module.exports = { signupModel, isExists };