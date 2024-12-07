const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./Customer');

const MortgageDocument = sequelize.define('MortgageDocument', {
    documentType: { type: DataTypes.STRING, allowNull: false },
    documentNumber: { type: DataTypes.STRING, allowNull: false },
    issueDate: { type: DataTypes.DATE },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customerID',
        },
    },
});

MortgageDocument.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Customer.hasMany(MortgageDocument, { foreignKey: 'customerId', as: 'mortgageDocuments' });

module.exports = MortgageDocument;
