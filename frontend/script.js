console.log("script.js is loaded");

const API_URL = 'http://localhost:5000/api/customers';

// Function to show and hide different sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = section.id === `${sectionId}-section` ? 'block' : 'none';
    });
 
    // Update active button styling
    document.querySelectorAll('nav button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`nav button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// Function to submit all customer data
// async function submitAllData() {
//     const errorFields = document.querySelectorAll('.text-danger');
//     errorFields.forEach((errorField) => (errorField.textContent = ''));

//     let isValid = true;

//     // Validate Customer Information
//     const customerID = document.getElementById('customerID').value;
//     if (!customerID) {
//         document.getElementById('customerIDError').textContent = 'Customer ID is required.';
//         isValid = false;
//     }

//     const customerName = document.getElementById('customerName').value;
//     if (!customerName) {
//         document.getElementById('customerNameError').textContent = 'Name is required.';
//         isValid = false;
//     }

//     const customerEmail = document.getElementById('customerEmail').value;
//     if (!customerEmail) {
//         document.getElementById('customerEmailError').textContent = 'Email is required.';
//         isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(customerEmail)) {
//         document.getElementById('customerEmailError').textContent = 'Enter a valid email.';
//         isValid = false;
//     }

//     const customerPhone = document.getElementById('customerPhone').value;
//     if (!customerPhone) {
//         document.getElementById('customerPhoneError').textContent = 'Phone is required.';
//         isValid = false;
//     }

//     // Validate Address Information
//     const street = document.getElementById('street').value;
//     if (!street) {
//         document.getElementById('streetError').textContent = 'Street is required.';
//         isValid = false;
//     }

//     const city = document.getElementById('city').value;
//     if (!city) {
//         document.getElementById('cityError').textContent = 'City is required.';
//         isValid = false;
//     }

//     const state = document.getElementById('state').value;
//     if (!state) {
//         document.getElementById('stateError').textContent = 'State is required.';
//         isValid = false;
//     }

//     const zip = document.getElementById('zip').value;
//     if (!zip) {
//         document.getElementById('zipError').textContent = 'ZIP Code is required.';
//         isValid = false;
//     }

//     const country = document.getElementById('country').value;
//     if (!country) {
//         document.getElementById('countryError').textContent = 'Country is required.';
//         isValid = false;
//     }

//     // Validate Identification Documents
//     const documentType = document.getElementById('documentType').value;
//     if (!documentType) {
//         document.getElementById('documentTypeError').textContent = 'Document Type is required.';
//         isValid = false;
//     }

//     const documentNumber = document.getElementById('documentNumber').value;
//     if (!documentNumber) {
//         document.getElementById('documentNumberError').textContent = 'Document Number is required.';
//         isValid = false;
//     }

//     const issueDate = document.getElementById('issueDate').value;
//     if (!issueDate) {
//         document.getElementById('issueDateError').textContent = 'Issue Date is required.';
//         isValid = false;
//     }

//     const expiryDate = document.getElementById('expiryDate').value;
//     if (!expiryDate) {
//         document.getElementById('expiryDateError').textContent = 'Expiry Date is required.';
//         isValid = false;
//     }

//     // Validate Mortgage Documents
//     const mortgageDocumentType = document.getElementById('mortgageDocumentType').value;
//     if (!mortgageDocumentType) {
//         document.getElementById('mortgageDocumentTypeError').textContent = 'Mortgage Document Type is required.';
//         isValid = false;
//     }

//     const mortgageDocumentNumber = document.getElementById('mortgageDocumentNumber').value;
//     if (!mortgageDocumentNumber) {
//         document.getElementById('mortgageDocumentNumberError').textContent = 'Mortgage Document Number is required.';
//         isValid = false;
//     }

//     const mortgageIssueDate = document.getElementById('mortgageIssueDate').value;
//     if (!mortgageIssueDate) {
//         document.getElementById('mortgageIssueDateError').textContent = 'Mortgage Issue Date is required.';
//         isValid = false;
//     }

//     // Validate Furniture Requirements
//     const furnitureAmount = document.getElementById('furnitureAmount').value;
//     if (!furnitureAmount) {
//         document.getElementById('furnitureAmountError').textContent = 'Furniture Amount is required.';
//         isValid = false;
//     }

//     const furnitureDescription = document.getElementById('furnitureDescription').value;
//     if (!furnitureDescription) {
//         document.getElementById('furnitureDescriptionError').textContent = 'Furniture Description is required.';
//         isValid = false;
//     }

//     // Validate Business Details
//     const businessName = document.getElementById('businessName').value;
//     if (!businessName) {
//         document.getElementById('businessNameError').textContent = 'Business Name is required.';
//         isValid = false;
//     }

//     const registrationNumber = document.getElementById('registrationNumber').value;
//     if (!registrationNumber) {
//         document.getElementById('registrationNumberError').textContent = 'Registration Number is required.';
//         isValid = false;
//     }

//     const industry = document.getElementById('industry').value;
//     if (!industry) {
//         document.getElementById('industryError').textContent = 'Industry is required.';
//         isValid = false;
//     }

//     const revenue = document.getElementById('revenue').value;
//     if (!revenue) {
//         document.getElementById('revenueError').textContent = 'Revenue is required.';
//         isValid = false;
//     }

//     // If all fields are valid, proceed to submit
//     if (isValid) {
//         console.log('All data is valid. Proceeding with submission.');
//         // Call your backend API or process the data here
//     }

//     try {
//         const response = await fetch(`${API_URL}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(customerData)
//         });

//         if (response.ok) {
//             alert('Customer details submitted successfully');
//         } else {
//             const errorData = await response.json();
//             console.error('Error submitting customer details:', errorData);
//             alert('Error submitting customer details');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error submitting customer details');
//     }
// }

async function submitAllData() {
    // Clear all previous error messages
    const errorFields = document.querySelectorAll('.text-danger');
    errorFields.forEach((errorField) => (errorField.textContent = ''));

    let isValid = true;

    // Validate Customer Information
    const customerID = document.getElementById('customerID').value.trim();
    if (!customerID) {
        document.getElementById('customerIDError').textContent = 'Customer ID is required.';
        isValid = false;
    }

    const customerName = document.getElementById('customerName').value.trim();
    if (!customerName) {
        document.getElementById('customerNameError').textContent = 'Name is required.';
        isValid = false;
    }

    const customerEmail = document.getElementById('customerEmail').value.trim();
    if (!customerEmail) {
        document.getElementById('customerEmailError').textContent = 'Email is required.';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(customerEmail)) {
        document.getElementById('customerEmailError').textContent = 'Enter a valid email.';
        isValid = false;
    }

    const customerPhone = document.getElementById('customerPhone').value.trim();
    if (!customerPhone) {
        document.getElementById('customerPhoneError').textContent = 'Phone is required.';
        isValid = false;
    }

    // Validate Address Information
    const street = document.getElementById('street').value.trim();
    if (!street) {
        document.getElementById('streetError').textContent = 'Street is required.';
        isValid = false;
    }

    const city = document.getElementById('city').value.trim();
    if (!city) {
        document.getElementById('cityError').textContent = 'City is required.';
        isValid = false;
    }

    const state = document.getElementById('state').value.trim();
    if (!state) {
        document.getElementById('stateError').textContent = 'State is required.';
        isValid = false;
    }

    const zip = document.getElementById('zip').value.trim();
    if (!zip) {
        document.getElementById('zipError').textContent = 'ZIP Code is required.';
        isValid = false;
    }

    const country = document.getElementById('country').value.trim();
    if (!country) {
        document.getElementById('countryError').textContent = 'Country is required.';
        isValid = false;
    }

    // Validate Identification Documents
    const documentType = document.getElementById('documentType').value.trim();
    if (!documentType) {
        document.getElementById('documentTypeError').textContent = 'Document Type is required.';
        isValid = false;
    }

    const documentNumber = document.getElementById('documentNumber').value.trim();
    if (!documentNumber) {
        document.getElementById('documentNumberError').textContent = 'Document Number is required.';
        isValid = false;
    }

    const issueDate = document.getElementById('issueDate').value;
    if (!issueDate) {
        document.getElementById('issueDateError').textContent = 'Issue Date is required.';
        isValid = false;
    }

    const expiryDate = document.getElementById('expiryDate').value;
    if (!expiryDate) {
        document.getElementById('expiryDateError').textContent = 'Expiry Date is required.';
        isValid = false;
    }

    // Validate Mortgage Documents
    const mortgageDocumentType = document.getElementById('mortgageDocumentType').value.trim();
    if (!mortgageDocumentType) {
        document.getElementById('mortgageDocumentTypeError').textContent = 'Mortgage Document Type is required.';
        isValid = false;
    }

    const mortgageDocumentNumber = document.getElementById('mortgageDocumentNumber').value.trim();
    if (!mortgageDocumentNumber) {
        document.getElementById('mortgageDocumentNumberError').textContent = 'Mortgage Document Number is required.';
        isValid = false;
    }

    const mortgageIssueDate = document.getElementById('mortgageIssueDate').value;
    if (!mortgageIssueDate) {
        document.getElementById('mortgageIssueDateError').textContent = 'Mortgage Issue Date is required.';
        isValid = false;
    }

    // Validate Furniture Requirements
    const furnitureAmount = document.getElementById('furnitureAmount').value.trim();
    if (!furnitureAmount) {
        document.getElementById('furnitureAmountError').textContent = 'Furniture Amount is required.';
        isValid = false;
    }

    const furnitureDescription = document.getElementById('furnitureDescription').value.trim();
    if (!furnitureDescription) {
        document.getElementById('furnitureDescriptionError').textContent = 'Furniture Description is required.';
        isValid = false;
    }

    // Validate Business Details
    const businessName = document.getElementById('businessName').value.trim();
    if (!businessName) {
        document.getElementById('businessNameError').textContent = 'Business Name is required.';
        isValid = false;
    }

    const registrationNumber = document.getElementById('registrationNumber').value.trim();
    if (!registrationNumber) {
        document.getElementById('registrationNumberError').textContent = 'Registration Number is required.';
        isValid = false;
    }

    const industry = document.getElementById('industry').value.trim();
    if (!industry) {
        document.getElementById('industryError').textContent = 'Industry is required.';
        isValid = false;
    }

    const revenue = document.getElementById('revenue').value.trim();
    if (!revenue) {
        document.getElementById('revenueError').textContent = 'Revenue is required.';
        isValid = false;
    }

    // If all fields are valid, proceed to submit
    if (isValid) {
        const customerData = {
            customerID,
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: {
                street,
                city,
                state,
                zip,
                country,
            },
            documents: [{
                type: documentType,
                documentNumber,
                issueDate,
                expiryDate,
            }],
            mortgageDocuments: [{
                documentType: mortgageDocumentType,
                documentNumber: mortgageDocumentNumber,
                issueDate: mortgageIssueDate,
            }],
            furnitureRequirements: [{
                amount: parseFloat(furnitureAmount),
                description: furnitureDescription,
            }],
            businessDetails: {
                businessName,
                registrationNumber,
                industry,
                revenue: parseFloat(revenue),
            },
        };

        try {
            const response = await fetch('http://localhost:5000/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customerData),
            });
        
            console.log('Response Status:', response.status); // Logs the HTTP status
        
            if (response.ok) {
                const result = await response.json();
                console.log('Server Response:', result);
                alert('Customer details submitted successfully');
                document.getElementById('customer-section').reset();
            } else {
                const errorData = await response.json();
                console.error('Error Response:', errorData);
                alert(errorData.message || 'Error submitting customer details');
            }
        } catch (error) {
            console.error('Fetch Error:', error); // Logs fetch-specific errors
            alert('.');
        }
        
    }
}

// Function to view customer details
async function viewCustomerDetails() {
    const customerID = document.getElementById('customerIDInput').value;
    if (!customerID) {
        alert("Please enter a valid Customer ID.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${customerID}`);
        
        // Check if the customer ID was not found
        if (response.status === 404) {
            alert("Customer ID not found in the database.");
            return;
        }

        if (!response.ok) {
            alert('Error retrieving customer details');
            return;
        }

        const customerData = await response.json();
        document.getElementById('customerDetails').innerHTML = `
            <h3>Customer Information</h3>
            <p>ID: ${customerData.customerID}</p>
            <p>Name: ${customerData.name}</p>
            <p>Email: ${customerData.email}</p>
            <p>Phone: ${customerData.phone}</p>

            <h3>Address</h3>
            <p>${customerData.address.street}, ${customerData.address.city}, ${customerData.address.state}, ${customerData.address.zip}, ${customerData.address.country}</p>

            <h3>Documents</h3>
            <ul>${customerData.documents.map(doc => `<li>${doc.type} - ${doc.documentNumber} (Expires: ${doc.expiryDate})</li>`).join('')}</ul>

            <h3>Mortgage Documents</h3>
            <ul>${customerData.mortgageDocuments.map(doc => `<li>${doc.documentType} - ${doc.documentNumber}</li>`).join('')}</ul>

            <h3>Furniture Requirements</h3>
            <ul>${customerData.furnitureRequirements.map(req => `<li>${req.description} - €${req.amount}</li>`).join('')}</ul>

            <h3>Business Details</h3>
            <p>Name: ${customerData.businessDetails.businessName}</p>
            <p>Registration: ${customerData.businessDetails.registrationNumber}</p>
            <p>Industry: ${customerData.businessDetails.industry}</p>
            <p>Revenue: €${customerData.businessDetails.revenue}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        alert('Error retrieving customer details');
    }
}


// Function to delete a customer
async function deleteCustomer() {
    const customerID = document.getElementById('customer_id_delete').value;
    if (!customerID) {
        alert("Please enter a Customer ID to delete.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${customerID}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete customer');
        
        alert('Customer deleted successfully');
        document.getElementById('customerDetails').innerHTML = '';
    } catch (error) {
        alert(`Error deleting customer: ${error.message}`);
    }
}



// Fetch customer details and populate fields
async function fetchCustomerDetails() {
    const customerID = document.getElementById('customer_id_update').value;
    if (!customerID) {
        alert("Please enter a valid Customer ID.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${customerID}`);
        if (!response.ok) throw new Error('Customer not found');

        const customerData = await response.json();
        document.getElementById('customerName_update').value = customerData.name;
        document.getElementById('customerEmail_update').value = customerData.email;
        document.getElementById('customerPhone_update').value = customerData.phone;

        document.getElementById('street_update').value = customerData.address.street;
        document.getElementById('city_update').value = customerData.address.city;
        document.getElementById('state_update').value = customerData.address.state;
        document.getElementById('zip_update').value = customerData.address.zip;
        document.getElementById('country_update').value = customerData.address.country;

        if (customerData.documents[0]) {
            document.getElementById('documentType_update').value = customerData.documents[0].type;
            document.getElementById('documentNumber_update').value = customerData.documents[0].documentNumber;
            document.getElementById('issueDate_update').value = customerData.documents[0].issueDate;
            document.getElementById('expiryDate_update').value = customerData.documents[0].expiryDate;
        }

        if (customerData.mortgageDocuments[0]) {
            document.getElementById('mortgageDocumentType_update').value = customerData.mortgageDocuments[0].documentType;
            document.getElementById('mortgageDocumentNumber_update').value = customerData.mortgageDocuments[0].documentNumber;
            document.getElementById('mortgageIssueDate_update').value = customerData.mortgageDocuments[0].issueDate;
        }

        if (customerData.furnitureRequirements[0]) {
            document.getElementById('furnitureAmount_update').value = customerData.furnitureRequirements[0].amount;
            document.getElementById('furnitureDescription_update').value = customerData.furnitureRequirements[0].description;
        }

        document.getElementById('businessName_update').value = customerData.businessDetails.businessName;
        document.getElementById('registrationNumber_update').value = customerData.businessDetails.registrationNumber;
        document.getElementById('industry_update').value = customerData.businessDetails.industry;
        document.getElementById('revenue_update').value = customerData.businessDetails.revenue;
    } catch (error) {
        alert(error.message);
    }
}

// Update customer details
async function updateCustomerDetails() {
    const customerID = document.getElementById('customer_id_update').value;
    const updatedData = {
        name: document.getElementById('customerName_update').value,
        email: document.getElementById('customerEmail_update').value,
        phone: document.getElementById('customerPhone_update').value,
        address: {
            street: document.getElementById('street_update').value,
            city: document.getElementById('city_update').value,
            state: document.getElementById('state_update').value,
            zip: document.getElementById('zip_update').value,
            country: document.getElementById('country_update').value,
        },
        documents: [{
            type: document.getElementById('documentType_update').value,
            documentNumber: document.getElementById('documentNumber_update').value,
            issueDate: document.getElementById('issueDate_update').value,
            expiryDate: document.getElementById('expiryDate_update').value
        }],
        mortgageDocuments: [{
            documentType: document.getElementById('mortgageDocumentType_update').value,
            documentNumber: document.getElementById('mortgageDocumentNumber_update').value,
            issueDate: document.getElementById('mortgageIssueDate_update').value
        }],
        furnitureRequirements: [{
            amount: parseFloat(document.getElementById('furnitureAmount_update').value),
            description: document.getElementById('furnitureDescription_update').value
        }],
        businessDetails: {
            businessName: document.getElementById('businessName_update').value,
            registrationNumber: document.getElementById('registrationNumber_update').value,
            industry: document.getElementById('industry_update').value,
            revenue: parseFloat(document.getElementById('revenue_update').value)
        }
    };

    try {
        const response = await fetch(`${API_URL}/${customerID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        if (response.ok) {
            alert('Customer updated successfully');
        } else {
            throw new Error('Failed to update customer');
        }
    } catch (error) {
        alert(error.message);
    }
}


// Set initial view
showSection('create');
