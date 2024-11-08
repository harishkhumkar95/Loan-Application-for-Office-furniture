const express = require('express');
const db = require('../config/db'); // Import MySQL connection

const router = express.Router();

// Route to handle the full JSON payload
router.post('/', (req, res) => {
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

    // Check if any required field is missing and return an error if so
    if (!customerID || !name || !email || !phone) {
        return res.status(400).json({ message: 'Missing required customer fields' });
    }

    // Begin transaction to ensure all or none of the data is inserted
    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ message: 'Transaction start failed', error: err });
        }

        // Insert Customer
        const customerQuery = 'INSERT INTO Customers (customerID, name, email, phone) VALUES (?, ?, ?, ?)';
        db.query(customerQuery, [customerID, name, email, phone], (err, result) => {
            if (err) {
                return db.rollback(() => res.status(500).json({ message: 'Error creating customer', error: err }));
            }
            const customerId = result.insertId;

            // Insert Address
            if (address) {
                const addressQuery = 'INSERT INTO Addresses (street, city, state, zip, country, customerId) VALUES (?, ?, ?, ?, ?, ?)';
                db.query(addressQuery, [address.street, address.city, address.state, address.zip, address.country, customerId], (err) => {
                    if (err) {
                        return db.rollback(() => res.status(500).json({ message: 'Error creating address', error: err }));
                    }
                });
            }

            // Insert Documents
            if (documents && documents.length > 0) {
                const documentQuery = 'INSERT INTO Documents (type, documentNumber, issueDate, expiryDate, customerId) VALUES ?';
                const documentValues = documents.map(doc => [doc.type, doc.documentNumber, doc.issueDate, doc.expiryDate, customerId]);

                db.query(documentQuery, [documentValues], (err) => {
                    if (err) {
                        return db.rollback(() => res.status(500).json({ message: 'Error creating documents', error: err }));
                    }
                });
            }

            // Insert Mortgage Documents
            if (mortgageDocuments && mortgageDocuments.length > 0) {
                const mortgageQuery = 'INSERT INTO MortgageDocuments (documentType, documentNumber, issueDate, customerId) VALUES ?';
                const mortgageValues = mortgageDocuments.map(doc => [doc.documentType, doc.documentNumber, doc.issueDate, customerId]);

                db.query(mortgageQuery, [mortgageValues], (err) => {
                    if (err) {
                        return db.rollback(() => res.status(500).json({ message: 'Error creating mortgage documents', error: err }));
                    }
                });
            }

            // Insert Furniture Requirements
            if (furnitureRequirements && furnitureRequirements.length > 0) {
                const furnitureQuery = 'INSERT INTO FurnitureRequirements (amount, description, customerId) VALUES ?';
                const furnitureValues = furnitureRequirements.map(req => [req.amount, req.description, customerId]);

                db.query(furnitureQuery, [furnitureValues], (err) => {
                    if (err) {
                        return db.rollback(() => res.status(500).json({ message: 'Error creating furniture requirements', error: err }));
                    }
                });
            }

            // Insert Business Details
            if (businessDetails) {
                const businessQuery = 'INSERT INTO BusinessDetails (businessName, registrationNumber, industry, revenue, customerId) VALUES (?, ?, ?, ?, ?)';
                db.query(businessQuery, [
                    businessDetails.businessName,
                    businessDetails.registrationNumber,
                    businessDetails.industry,
                    businessDetails.revenue,
                    customerId
                ], (err) => {
                    if (err) {
                        return db.rollback(() => res.status(500).json({ message: 'Error creating business details', error: err }));
                    }
                });
            }

            // Commit transaction if all inserts succeed
            db.commit(err => {
                if (err) {
                    return db.rollback(() => res.status(500).json({ message: 'Transaction commit failed', error: err }));
                }
                res.status(201).json({ message: 'Customer and related data created successfully', customerId });
            });
        });
    });
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

router.delete('/:customerID', (req, res) => {
    const customerID = req.params.customerID;
    console.log(`Received request for customerID: ${customerID}`);
    // Begin transaction for deletion to ensure all related data is deleted
    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ message: 'Transaction start failed', error: err });
        }

        // Delete related entries in other tables first to maintain referential integrity
        const deleteAddress = 'DELETE FROM Addresses WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
        db.query(deleteAddress, [customerID], (err) => {
            if (err) return db.rollback(() => res.status(500).json({ message: 'Error deleting address', error: err }));

            const deleteDocuments = 'DELETE FROM Documents WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
            db.query(deleteDocuments, [customerID], (err) => {
                if (err) return db.rollback(() => res.status(500).json({ message: 'Error deleting documents', error: err }));

                const deleteMortgageDocs = 'DELETE FROM MortgageDocuments WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
                db.query(deleteMortgageDocs, [customerID], (err) => {
                    if (err) return db.rollback(() => res.status(500).json({ message: 'Error deleting mortgage documents', error: err }));

                    const deleteFurnitureReq = 'DELETE FROM FurnitureRequirements WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
                    db.query(deleteFurnitureReq, [customerID], (err) => {
                        if (err) return db.rollback(() => res.status(500).json({ message: 'Error deleting furniture requirements', error: err }));

                        const deleteBusinessDetails = 'DELETE FROM BusinessDetails WHERE customerId = (SELECT id FROM Customers WHERE customerID = ?)';
                        db.query(deleteBusinessDetails, [customerID], (err) => {
                            if (err) return db.rollback(() => res.status(500).json({ message: 'Error deleting business details', error: err }));

                            // Finally, delete the customer record
                            const deleteCustomer = 'DELETE FROM Customers WHERE customerID = ?';
                            db.query(deleteCustomer, [customerID], (err) => {
                                if (err) return db.rollback(() => res.status(500).json({ message: 'Error deleting customer', error: err }));

                                db.commit(err => {
                                    if (err) return db.rollback(() => res.status(500).json({ message: 'Transaction commit failed', error: err }));
                                    res.status(200).json({ message: 'Customer and related data deleted successfully' });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

// Update Customer by ID
router.put('/:customerID', (req, res) => {
    const customerID = req.params.customerID;
    const { name, email, phone, address, documents, mortgageDocuments, furnitureRequirements, businessDetails } = req.body;

    db.beginTransaction(err => {
        if (err) return res.status(500).json({ message: 'Transaction start failed', error: err });

        const customerQuery = `UPDATE Customers SET name = ?, email = ?, phone = ? WHERE customerID = ?`;
        const addressQuery = `UPDATE Addresses SET street = ?, city = ?, state = ?, zip = ?, country = ? WHERE customerId = ?`;
        const documentQuery = `UPDATE Documents SET type = ?, documentNumber = ?, issueDate = ?, expiryDate = ? WHERE customerId = ?`;
        const mortgageQuery = `UPDATE MortgageDocuments SET documentType = ?, documentNumber = ?, issueDate = ? WHERE customerId = ?`;
        const furnitureQuery = `UPDATE FurnitureRequirements SET amount = ?, description = ? WHERE customerId = ?`;
        const businessQuery = `UPDATE BusinessDetails SET businessName = ?, registrationNumber = ?, industry = ?, revenue = ? WHERE customerId = ?`;

        db.query(customerQuery, [name, email, phone, customerID], (err) => {
            if (err) return db.rollback(() => res.status(500).json({ message: 'Error updating customer', error: err }));

            db.query(addressQuery, [address.street, address.city, address.state, address.zip, address.country, customerID], (err) => {
                if (err) return db.rollback(() => res.status(500).json({ message: 'Error updating address', error: err }));

                db.query(documentQuery, [documents[0].type, documents[0].documentNumber, documents[0].issueDate, documents[0].expiryDate, customerID], (err) => {
                    if (err) return db.rollback(() => res.status(500).json({ message: 'Error updating documents', error: err }));

                    db.query(mortgageQuery, [mortgageDocuments[0].documentType, mortgageDocuments[0].documentNumber, mortgageDocuments[0].issueDate, customerID], (err) => {
                        if (err) return db.rollback(() => res.status(500).json({ message: 'Error updating mortgage documents', error: err }));

                        db.query(furnitureQuery, [furnitureRequirements[0].amount, furnitureRequirements[0].description, customerID], (err) => {
                            if (err) return db.rollback(() => res.status(500).json({ message: 'Error updating furniture requirements', error: err }));

                            db.query(businessQuery, [businessDetails.businessName, businessDetails.registrationNumber, businessDetails.industry, businessDetails.revenue, customerID], (err) => {
                                if (err) return db.rollback(() => res.status(500).json({ message: 'Error updating business details', error: err }));

                                db.commit((err) => {
                                    if (err) return db.rollback(() => res.status(500).json({ message: 'Transaction commit failed', error: err }));
                                    res.status(200).json({ message: 'Customer and related data updated successfully' });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;
