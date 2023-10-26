const database = require('mysql2');

const db = database.createPool({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'nextask'
});

module.exports = db.promise();