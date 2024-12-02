const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();


app.use(cors());
app.use(bodyParser.json()); 

// Import and set up routes

const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');


app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Models synchronized...');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

console.log("Customer routes mounted at /api/customers");

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


