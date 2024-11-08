const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MortgageDocument = sequelize.define('MortgageDocument', {
    documentType: { type: DataTypes.STRING },
    documentNumber: { type: DataTypes.STRING },
    issueDate: { type: DataTypes.DATE },
    customerId: { type: DataTypes.INTEGER, references: { model: 'Customers', key: 'id' } }
});

module.exports = MortgageDocument;
