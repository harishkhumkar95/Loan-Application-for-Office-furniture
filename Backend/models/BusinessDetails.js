const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BusinessDetails = sequelize.define('BusinessDetails', {
    businessName: { type: DataTypes.STRING },
    registrationNumber: { type: DataTypes.STRING },
    industry: { type: DataTypes.STRING },
    revenue: { type: DataTypes.DECIMAL },
    customerId: { type: DataTypes.INTEGER, references: { model: 'Customers', key: 'id' } }
});

module.exports = BusinessDetails;
