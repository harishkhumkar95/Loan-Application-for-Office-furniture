const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./Customer');

const Address = sequelize.define('Address', {
    street: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zip: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customerID',
        },
    },
});

Address.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Customer.hasOne(Address, { foreignKey: 'customerId', as: 'address' });

module.exports = Address;
