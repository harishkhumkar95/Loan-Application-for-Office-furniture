const express = require('express');
const Customer = require('../models/Customer'); // Import Customer model
const Address = require('../models/Address'); // Import Address model
const BusinessDetails = require('../models/BusinessDetails'); // Import BusinessDetails model
const Document = require('../models/Document'); // Import Document model
const FurnitureRequirement = require('../models/FurnitureRequirement'); // Import FurnitureRequirement model
const MortgageDocument = require('../models/MortgageDocument');

const router = express.Router();

// Create a new customer with related data

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
        businessDetails,
    } = req.body;

    // Validate required fields
    if (!customerID || !name || !email || !phone) {
        return res.status(400).json({ message: 'Missing required customer fields' });
    }

    try {
        // Create a customer with related data
        const customer = await Customer.create(
            {
                customerID,
                name,
                email,
                phone,
                // Include associated Address if provided
                address: address ? {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    zip: address.zip,
                    country: address.country,
                } : undefined,
                // Include associated Documents if provided
                documents: documents?.map(doc => ({
                    type: doc.type,
                    documentNumber: doc.documentNumber,
                    issueDate: doc.issueDate,
                    expiryDate: doc.expiryDate,
                })),
                // Include associated MortgageDocuments if provided
                mortgageDocuments: mortgageDocuments?.map(mortgageDoc => ({
                    documentType: mortgageDoc.documentType,
                    documentNumber: mortgageDoc.documentNumber,
                    issueDate: mortgageDoc.issueDate,
                })),
                // Include associated FurnitureRequirements if provided
                furnitureRequirements: furnitureRequirements?.map(furnitureReq => ({
                    amount: furnitureReq.amount,
                    description: furnitureReq.description,
                })),
                // Include associated BusinessDetails if provided
                businessDetails: businessDetails ? {
                    businessName: businessDetails.businessName,
                    registrationNumber: businessDetails.registrationNumber,
                    industry: businessDetails.industry,
                    revenue: businessDetails.revenue,
                } : undefined,
            },
            {
                include: [
                    { model: Address, as: 'address' },
                    { model: Document, as: 'documents' },
                    { model: MortgageDocument, as: 'mortgageDocuments' },
                    { model: FurnitureRequirement, as: 'furnitureRequirements' },
                    { model: BusinessDetails, as: 'businessDetails' },
                ],
            }
        );

        res.status(201).json({ message: 'Customer and related data created successfully', customer });
    } catch (error) {
        console.error('Error creating customer and related data:', error);
        res.status(500).json({ message: 'Error creating customer and related data', error });
    }
});


// Get customer details by customerID


router.get('/:customerID', async (req, res) => {
    const customerID = req.params.customerID;

    console.log(`Received request for customerID: ${customerID}`);

    try {
        const customer = await Customer.findOne({
            where: { customerID },
            include: [
                {
                    model: Address,
                    as: 'address', // Specify the alias used in the association
                },
                {
                    model: Document,
                    as: 'documents', // Specify the alias used in the association
                },
                {
                    model: MortgageDocument,
                    as: 'mortgageDocuments', // Specify the alias used in the association
                },
                {
                    model: FurnitureRequirement,
                    as: 'furnitureRequirements', // Specify the alias used in the association
                },
                {
                    model: BusinessDetails,
                    as: 'businessDetails', // Specify the alias used in the association
                },
            ],
        });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error('Error retrieving customer details:', error);
        res.status(500).json({ message: 'Error retrieving customer details', error });
    }
});

// Update customer and related data
router.put('/:customerID', async (req, res) => {
    const customerID = req.params.customerID;
    const { name, email, phone, address, documents, mortgageDocuments, furnitureRequirements, businessDetails } = req.body;

    try {
        const customer = await Customer.findOne({ where: { customerID } });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Update customer details
        await customer.update({ name, email, phone });

        // Update Address
        if (address) {
            const existingAddress = await Address.findOne({ where: { customerId: customer.customerID } });
            if (existingAddress) {
                await existingAddress.update(address);
            } else {
                await Address.create({ ...address, customerId: customer.customerID });
            }
        }

        // Update Documents
        if (documents) {
            await Document.destroy({ where: { customerId: customer.customerID } });
            await Document.bulkCreate(documents.map(doc => ({ ...doc, customerId: customer.customerID })));
        }

        // Update Mortgage Documents
        if (mortgageDocuments) {
            await MortgageDocument.destroy({ where: { customerId: customer.customerID } });
            await MortgageDocument.bulkCreate(mortgageDocuments.map(doc => ({ ...doc, customerId: customer.customerID })));
        }

        // Update Furniture Requirements
        if (furnitureRequirements) {
            await FurnitureRequirement.destroy({ where: { customerId: customer.customerID } });
            await FurnitureRequirement.bulkCreate(furnitureRequirements.map(req => ({ ...req, customerId: customer.customerID })));
        }

        // Update Business Details
        if (businessDetails) {
            const existingBusinessDetails = await BusinessDetails.findOne({ where: { customerId: customer.customerID } });
            if (existingBusinessDetails) {
                await existingBusinessDetails.update(businessDetails);
            } else {
                await BusinessDetails.create({ ...businessDetails, customerId: customer.customerID });
            }
        }

        res.status(200).json({ message: 'Customer and related data updated successfully' });
    } catch (error) {
        console.error('Error updating customer and related data:', error);
        res.status(500).json({ message: 'Error updating customer and related data', error });
    }
});

// Delete customer and related data

router.delete('/:customerID', async (req, res) => {
    const customerID = req.params.customerID;

    try {
        // Find the customer
        const customer = await Customer.findOne({
            where: { customerID },
        });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Explicitly delete related records
        await Address.destroy({ where: { customerId: customerID } }); // Delete associated address
        await Document.destroy({ where: { customerId: customerID } }); // Delete associated documents
        await MortgageDocument.destroy({ where: { customerId: customerID } }); // Delete associated mortgage documents
        await FurnitureRequirement.destroy({ where: { customerId: customerID } }); // Delete associated furniture requirements
        await BusinessDetails.destroy({ where: { customerId: customerID } }); // Delete associated business details

        // Delete the customer
        await customer.destroy();

        res.status(200).json({ message: 'Customer and related data deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer and related data:', error);
        res.status(500).json({ message: 'Error deleting customer and related data', error });
    }
});

module.exports = router;
