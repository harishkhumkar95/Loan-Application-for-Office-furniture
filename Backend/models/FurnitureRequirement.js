const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./Customer');

const FurnitureRequirement = sequelize.define('FurnitureRequirement', {
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customerID',
        },
    },
});

FurnitureRequirement.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Customer.hasMany(FurnitureRequirement, { foreignKey: 'customerId', as: 'furnitureRequirements' });

module.exports = FurnitureRequirement;
