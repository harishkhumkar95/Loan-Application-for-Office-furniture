const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FurnitureRequirement = sequelize.define('FurnitureRequirement', {
    amount: { type: DataTypes.DECIMAL },
    description: { type: DataTypes.TEXT },
    customerId: { type: DataTypes.INTEGER, references: { model: 'Customers', key: 'id' } }
});

module.exports = FurnitureRequirement;
