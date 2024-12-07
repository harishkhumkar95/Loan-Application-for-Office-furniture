const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./Customer');

const BusinessDetails = sequelize.define('BusinessDetails', {
    businessName: { type: DataTypes.STRING, allowNull: false },
    registrationNumber: { type: DataTypes.STRING, allowNull: false },
    industry: { type: DataTypes.STRING },
    revenue: { type: DataTypes.DECIMAL },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customerID',
        },
    },
});

BusinessDetails.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Customer.hasOne(BusinessDetails, { foreignKey: 'customerId', as: 'businessDetails' });

module.exports = BusinessDetails;
