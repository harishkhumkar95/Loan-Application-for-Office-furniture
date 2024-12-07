const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');  // Use the updated db.js with mysql2


const app = express();

app.use(cors());
app.use(bodyParser.json()); 

// Import and set up routes
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

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
