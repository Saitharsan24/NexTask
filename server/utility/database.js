const database = require('mysql2');
const dotenv = require('dotenv');

const db = database.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = db.promise();