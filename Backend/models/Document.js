const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Document = sequelize.define('Document', {
    type: { type: DataTypes.STRING },  // e.g., Passport, Driver’s License
    documentNumber: { type: DataTypes.STRING },
    issueDate: { type: DataTypes.DATE },
    expiryDate: { type: DataTypes.DATE },
    customerId: { type: DataTypes.INTEGER, references: { model: 'Customers', key: 'id' } }
});

module.exports = Document;
