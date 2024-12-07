const sequelize = require('../config/db');
const Customer = require('../models/Customer');
const Address = require('../models/Address');
const Document = require('../models/Document');
const MortgageDocument = require('../models/MortgageDocument');
const FurnitureRequirement = require('../models/FurnitureRequirement');
const BusinessDetails = require('../models/BusinessDetails');

(async () => {
    try {
        // Drop child tables first to prevent foreign key constraint errors
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;'); // Disable foreign key checks
        await Document.drop();
        await MortgageDocument.drop();
        await FurnitureRequirement.drop();
        await BusinessDetails.drop();
        await Address.drop();
        await Customer.drop();
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;'); // Enable foreign key checks

        // Recreate tables
        await sequelize.sync({ force: true });
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    } finally {
        await sequelize.close();
    }
})();
