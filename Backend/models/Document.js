const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./Customer');

const Document = sequelize.define('Document', {
    type: { type: DataTypes.STRING, allowNull: false },
    documentNumber: { type: DataTypes.STRING, allowNull: false },
    issueDate: { type: DataTypes.DATE },
    expiryDate: { type: DataTypes.DATE },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customerID',
        },
    },
});

Document.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Customer.hasMany(Document, { foreignKey: 'customerId', as: 'documents' });

module.exports = Document;
