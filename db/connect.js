const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Homer123',
        database: 'dbCompany',
    },
    console.log('Connection Completed!')
)
module.exports = db;