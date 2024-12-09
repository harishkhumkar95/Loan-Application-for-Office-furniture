const express = require('express');
const path = require('path'); // Required to manage file paths
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db'); // Use the updated db.js with mysql2

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logging for requests (Optional: Use morgan for production-grade logging)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

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

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server is running' });
});

// API Routes
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

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

// Graceful Shutdown for Tests
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

    process.on('SIGTERM', () => {
        console.log('SIGTERM received. Closing server.');
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    });
}

module.exports = app; // Export for testing
