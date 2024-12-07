const { Sequelize } = require('sequelize');

// Initialize Sequelize connection
const sequelize = new Sequelize('loan_system2', 'admin', 'admin123', {
    host: 'database-1.cneoesewi0ty.eu-west-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
        defaultPrimaryKey: false, // Prevent Sequelize from adding the default `id` column
        timestamps: false, // Disable createdAt and updatedAt globally
    },
    logging: console.log // Enable query logging for debugging
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL database.');
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit if connection fails
    });

module.exports = sequelize; // Export the Sequelize instance
