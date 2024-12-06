const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db'); // Use the updated db.js with mysql2

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

// Import and set up routes
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit if connection fails
    }
    console.log('Database connected...');
    connection.release(); // Release the connection back to the pool
});

console.log("Customer routes mounted at /api/customers");

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
