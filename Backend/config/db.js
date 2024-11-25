// backend/config/db.js
const mysql = require('mysql2');

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         
    password: 'root', 
    database: 'loan_system'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;
