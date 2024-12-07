const express = require('express');
const path = require('path'); // Required to manage file paths
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');  // Use the updated db.js with mysql2

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Frontend Routes
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'registration.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// API Routes
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

// Test database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL database.');

        await sequelize.sync(); // Synchronize models with the database
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Database connection or synchronization failed:', error);
        process.exit(1); // Exit if there is a failure
    }
})();

console.log("Customer routes mounted at /api/customers");

// Catch-all route for undefined frontend paths
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
