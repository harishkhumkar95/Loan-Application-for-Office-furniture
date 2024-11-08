const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(bodyParser.json()); // Ensure this is included

// Import and set up routes
const loanRoutes = require('./routes/loanRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use('/api/loans', loanRoutes);
app.use('/api/customers', customerRoutes);

console.log("Customer routes mounted at /api/customers");

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


