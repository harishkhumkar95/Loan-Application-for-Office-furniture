/// backend/config/db.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('loan_system', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', // Specify the dialect as 'mysql'
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL database.');
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

module.exports = sequelize;

