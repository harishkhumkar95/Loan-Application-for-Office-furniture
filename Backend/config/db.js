const mysql = require('mysql2');

// Initialize MySQL connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'loan_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Test the database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit if connection fails
    }
    console.log('Connected to MySQL database.');
    connection.release(); // Release the connection back to the pool
});

module.exports = db;
