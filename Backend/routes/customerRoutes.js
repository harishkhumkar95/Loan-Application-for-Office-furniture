const express = require('express');
const db = require('../config/db'); // Import MySQL connection

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('Received request body:', req.body);

    const {
        customerID,
        name,
        email,
        phone,
        address,
        documents,
        mortgageDocuments,
        furnitureRequirements,
        businessDetails
    } = req.body;

    if (!customerID || !name || !email || !phone) {
        return res.status(400).json({ message: 'Missing required customer fields' });
    }

    let connection;
    try {
        // Get a connection from the pool
        connection = await db.promise().getConnection();
        await connection.beginTransaction(); // Start transaction

        // Insert Customer
        const customerQuery = 'INSERT INTO Customers (customerID, name, email, phone) VALUES (?, ?, ?, ?)';
        const [customerResult] = await connection.query(customerQuery, [customerID, name, email, phone]);
        const customerId = customerResult.insertId;

        // Insert Address
        if (address) {
            const addressQuery = 'INSERT INTO Addresses (street, city, state, zip, country, customerId) VALUES (?, ?, ?, ?, ?, ?)';
            await connection.query(addressQuery, [address.street, address.city, address.state, address.zip, address.country, customerId]);
        }

        // Insert Documents
        if (documents && documents.length > 0) {
            const documentQuery = 'INSERT INTO Documents (type, documentNumber, issueDate, expiryDate, customerId) VALUES ?';
            const documentValues = documents.map(doc => [doc.type, doc.documentNumber, doc.issueDate, doc.expiryDate, customerId]);
            await connection.query(documentQuery, [documentValues]);
        }

        // Insert Mortgage Documents
        if (mortgageDocuments && mortgageDocuments.length > 0) {
            const mortgageQuery = 'INSERT INTO MortgageDocuments (documentType, documentNumber, issueDate, customerId) VALUES ?';
            const mortgageValues = mortgageDocuments.map(doc => [doc.documentType, doc.documentNumber, doc.issueDate, customerId]);
            await connection.query(mortgageQuery, [mortgageValues]);
        }

        // Insert Furniture Requirements
        if (furnitureRequirements && furnitureRequirements.length > 0) {
            const furnitureQuery = 'INSERT INTO FurnitureRequirements (amount, description, customerId) VALUES ?';
            const furnitureValues = furnitureRequirements.map(req => [req.amount, req.description, customerId]);
            await connection.query(furnitureQuery, [furnitureValues]);
        }

        // Insert Business Details
        if (businessDetails) {
            const businessQuery = 'INSERT INTO BusinessDetails (businessName, registrationNumber, industry, revenue, customerId) VALUES (?, ?, ?, ?, ?)';
            await connection.query(businessQuery, [
                businessDetails.businessName,
                businessDetails.registrationNumber,
                businessDetails.industry,
                businessDetails.revenue,
                customerId
            ]);
        }

        await connection.commit(); // Commit transaction
        res.status(201).json({ message: 'Customer and related data created successfully', customerId });
    } catch (error) {
        if (connection) await connection.rollback(); // Rollback transaction on error
        console.error('Error creating customer and related data:', error);
        res.status(500).json({ message: 'Error creating customer and related data', error });
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
});

// Route to get customer details by customerID
router.get('/:customerID', (req, res) => {
    const customerID = req.params.customerID;

    // Log the received customerID
    console.log(`Received request for customerID: ${customerID}`);

    const query = `
        SELECT * FROM Customers c
        LEFT JOIN Addresses a ON c.id = a.customerId
        LEFT JOIN Documents d ON c.id = d.customerId
        LEFT JOIN MortgageDocuments m ON c.id = m.customerId
        LEFT JOIN FurnitureRequirements f ON c.id = f.customerId
        LEFT JOIN BusinessDetails b ON c.id = b.customerId
        WHERE c.customerID = ?
    `;

    // Log the query being executed
    console.log('Executing query:', query);

    db.query(query, [customerID], (err, results) => {
        if (err) {
            console.error('Error retrieving customer details:', err);
            return res.status(500).json({ message: 'Error retrieving customer details', error: err });
        }

        console.log('Query results:', results);

        if (results.length === 0) {
            console.log('No customer found for customerID:', customerID);
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Extract customer base data from the first row
        const customerData = {
            customerID: results[0].customerID,
            name: results[0].name,
            email: results[0].email,
            phone: results[0].phone,
            address: {
                street: results[0].street,
                city: results[0].city,
                state: results[0].state,
                zip: results[0].zip,
                country: results[0].country,
            },
            documents: [],
            mortgageDocuments: [],
            furnitureRequirements: [],
            businessDetails: {
                businessName: results[0].businessName,
                registrationNumber: results[0].registrationNumber,
                industry: results[0].industry,
                revenue: results[0].revenue
            }
        };

        // Group related records by iterating over each row
        results.forEach(row => {
            // Group documents
            if (row.type && row.documentNumber) {
                customerData.documents.push({
                    type: row.type,
                    documentNumber: row.documentNumber,
                    issueDate: row.issueDate,
                    expiryDate: row.expiryDate
                });
            }

            // Group mortgage documents
            if (row.documentType && row.documentNumber) {
                customerData.mortgageDocuments.push({
                    documentType: row.documentType,
                    documentNumber: row.documentNumber,
                    issueDate: row.issueDate
                });
            }

            // Group furniture requirements
            if (row.amount && row.description) {
                customerData.furnitureRequirements.push({
                    amount: row.amount,
                    description: row.description
                });
            }
        });

        // Log the final customerData object before sending the response
        console.log('Customer data to be sent:', customerData);

        res.status(200).json(customerData);
    });
});

// Update Customer by ID

router.delete('/:customerID', async (req, res) => {
    const customerID = req.params.customerID;
    console.log(`Received request for customerID: ${customerID}`);

    let connection;

    try {
        // Get a connection from the pool
        connection = await db.promise().getConnection();
        await connection.beginTransaction(); // Start transaction

        // Delete related entries in other tables first
        const deleteAddress = 'DELETE FROM Addresses WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
        await connection.query(deleteAddress, [customerID]);

        const deleteDocuments = 'DELETE FROM Documents WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
        await connection.query(deleteDocuments, [customerID]);

        const deleteMortgageDocs = 'DELETE FROM MortgageDocuments WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
        await connection.query(deleteMortgageDocs, [customerID]);

        const deleteFurnitureReq = 'DELETE FROM FurnitureRequirements WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
        await connection.query(deleteFurnitureReq, [customerID]);

        const deleteBusinessDetails = 'DELETE FROM BusinessDetails WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
        await connection.query(deleteBusinessDetails, [customerID]);

        // Finally, delete the customer record
        const deleteCustomer = 'DELETE FROM Customers WHERE customerID = ?';
        await connection.query(deleteCustomer, [customerID]);

        await connection.commit(); // Commit transaction
        res.status(200).json({ message: 'Customer and related data deleted successfully' });
    } catch (error) {
        if (connection) await connection.rollback(); // Rollback transaction on error
        console.error('Error deleting customer and related data:', error);
        res.status(500).json({ message: 'Error deleting customer and related data', error });
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
});


router.put('/:customerID', async (req, res) => {
    const customerID = req.params.customerID;
    const { name, email, phone, address, documents, mortgageDocuments, furnitureRequirements, businessDetails } = req.body;

    let connection;
    try {
        // Get a connection from the pool
        connection = await db.promise().getConnection();
        await connection.beginTransaction(); // Start transaction

        // Update Customer
        const customerQuery = `UPDATE Customers SET name = ?, email = ?, phone = ? WHERE customerID = ?`;
        await connection.query(customerQuery, [name, email, phone, customerID]);

        // Update Address
        if (address) {
            const addressQuery = `UPDATE Addresses SET street = ?, city = ?, state = ?, zip = ?, country = ? WHERE customerId = ?`;
            await connection.query(addressQuery, [
                address.street,
                address.city,
                address.state,
                address.zip,
                address.country,
                customerID
            ]);
        }

        // Update Documents
        if (documents && documents[0]) {
            const documentQuery = `UPDATE Documents SET type = ?, documentNumber = ?, issueDate = ?, expiryDate = ? WHERE customerId = ?`;
            await connection.query(documentQuery, [
                documents[0].type,
                documents[0].documentNumber,
                documents[0].issueDate,
                documents[0].expiryDate,
                customerID
            ]);
        }

        // Update Mortgage Documents
        if (mortgageDocuments && mortgageDocuments[0]) {
            const mortgageQuery = `UPDATE MortgageDocuments SET documentType = ?, documentNumber = ?, issueDate = ? WHERE customerId = ?`;
            await connection.query(mortgageQuery, [
                mortgageDocuments[0].documentType,
                mortgageDocuments[0].documentNumber,
                mortgageDocuments[0].issueDate,
                customerID
            ]);
        }

        // Update Furniture Requirements
        if (furnitureRequirements && furnitureRequirements[0]) {
            const furnitureQuery = `UPDATE FurnitureRequirements SET amount = ?, description = ? WHERE customerId = ?`;
            await connection.query(furnitureQuery, [
                furnitureRequirements[0].amount,
                furnitureRequirements[0].description,
                customerID
            ]);
        }

        // Update Business Details
        if (businessDetails) {
            const businessQuery = `UPDATE BusinessDetails SET businessName = ?, registrationNumber = ?, industry = ?, revenue = ? WHERE customerId = ?`;
            await connection.query(businessQuery, [
                businessDetails.businessName,
                businessDetails.registrationNumber,
                businessDetails.industry,
                businessDetails.revenue,
                customerID
            ]);
        }

        // Commit the transaction
        await connection.commit();
        res.status(200).json({ message: 'Customer and related data updated successfully' });
    } catch (error) {
        if (connection) await connection.rollback(); // Rollback transaction on error
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Error updating customer and related data', error });
    } finally {
        if (connection) connection.release(); // Release connection back to the pool
    }
});


module.exports = router;
