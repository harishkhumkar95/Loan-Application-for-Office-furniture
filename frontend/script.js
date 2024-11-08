// const API_URL = 'http://localhost:5000/api/loans';

// // Show and Hide Sections
// function showSection(sectionId) {
//     document.querySelectorAll('.section').forEach(section => {
//         section.style.display = section.id === `${sectionId}-section` ? 'block' : 'none';
//     });
// }

// // Create Loan
// async function createLoan() {
//     const loanData = {
//         applicant_name: document.getElementById('applicant_name').value,
//         applicant_address: document.getElementById('applicant_address').value,
//         phone_number: document.getElementById('phone_number').value,
//         email_address: document.getElementById('email_address').value,
//         loan_amount: parseFloat(document.getElementById('loan_amount').value),
//         interest_rate: parseFloat(document.getElementById('interest_rate').value),
//         loan_term: parseInt(document.getElementById('loan_term').value),
//     };

//     const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loanData)
//     });
//     if (response.ok) {
//         alert("Loan Created Successfully");
//         getLoans();
//     }
// }

// // Get and Display All Loans
// async function getLoans() {
//     const response = await fetch(API_URL);
//     const loans = await response.json();
//     const loanList = document.getElementById('loan-list');
//     loanList.innerHTML = loans.map(loan => `
//         <div>
//             <h4>${loan.applicant_name}</h4>
//             <p>Loan Amount: ${loan.loan_amount}</p>
//             <p>Interest Rate: ${loan.interest_rate}%</p>
//             <p>Term: ${loan.loan_term} years</p>
//         </div>
//     `).join('');
// }

// // Update Loan
// async function updateLoan() {
//     const loanId = document.getElementById('loan_id_update').value;
//     const loanData = {
//         applicant_name: document.getElementById('applicant_name_update').value,
//         applicant_address: document.getElementById('applicant_address_update').value,
//         phone_number: document.getElementById('phone_number_update').value,
//         email_address: document.getElementById('email_address_update').value,
//         loan_amount: parseFloat(document.getElementById('loan_amount_update').value),
//         interest_rate: parseFloat(document.getElementById('interest_rate_update').value),
//         loan_term: parseInt(document.getElementById('loan_term_update').value),
//     };

//     const response = await fetch(`${API_URL}/${loanId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loanData)
//     });
//     if (response.ok) {
//         alert("Loan Updated Successfully");
//         getLoans();
//     }
// }

// // Delete Loan
// async function deleteLoan() {
//     const loanId = document.getElementById('loan_id_delete').value;
//     const response = await fetch(`${API_URL}/${loanId}`, { method: 'DELETE' });
//     if (response.ok) {
//         alert("Loan Deleted Successfully");
//         getLoans();
//     }
// }
// function showSection(sectionId) {
//     // Hide all sections
//     document.querySelectorAll('.section').forEach(section => {
//         section.style.display = section.id === `${sectionId}-section` ? 'block' : 'none';
//     });

//     // Remove 'active' class from all buttons
//     document.querySelectorAll('nav button').forEach(button => {
//         button.classList.remove('active');
//     });

//     // Add 'active' class to the clicked button
//     document.querySelector(`nav button[onclick="showSection('${sectionId}')"]`).classList.add('active');
// }

// // Initial load of loans
// showSection('create');  // Show create section by default
// getLoans();

//new code 


const API_URL = 'http://localhost:5000/api/customers/create';

// Show and hide different sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = section.id === `${sectionId}-section` ? 'block' : 'none';
    });

    // Update active button styling
    document.querySelectorAll('nav button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`nav button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// Submit data for customer details and related information
async function submitAllData() {
    const customerData = {
        customerID: document.getElementById('customerID').value,
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: {
            street: document.getElementById('street').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value
        },
        documents: [{
            type: document.getElementById('documentType').value,
            documentNumber: document.getElementById('documentNumber').value,
            issueDate: document.getElementById('issueDate').value,
            expiryDate: document.getElementById('expiryDate').value
        }],
        
        mortgageDocuments: [{
            documentType: document.getElementById('mortgageDocumentType').value,
            documentNumber: document.getElementById('mortgageDocumentNumber').value,
            issueDate: document.getElementById('mortgageIssueDate').value
        }],
        furnitureRequirements: [{
            amount: parseFloat(document.getElementById('furnitureAmount').value),
            description: document.getElementById('furnitureDescription').value
        }],
        businessDetails: {
            businessName: document.getElementById('businessName').value,
            registrationNumber: document.getElementById('registrationNumber').value,
            industry: document.getElementById('industry').value,
            revenue: parseFloat(document.getElementById('revenue').value)
        }
    };

    // Send data to the backend
    try {
        const response = await fetch('http://localhost:5000/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData)
        });

        if (response.ok) {
            alert('Customer details submitted successfully');
        } else {
            const errorData = await response.json();
            console.error('Error submitting customer details:', errorData);
            alert('Error submitting customer details');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting customer details');
    }
}


// Create a new loan
async function createLoan() {
    const loanData = {
        applicant_name: document.getElementById('applicant_name').value,
        applicant_address: document.getElementById('applicant_address').value,
        phone_number: document.getElementById('phone_number').value,
        email_address: document.getElementById('email_address').value,
        loan_amount: parseFloat(document.getElementById('loan_amount').value),
        interest_rate: parseFloat(document.getElementById('interest_rate').value),
        loan_term: parseInt(document.getElementById('loan_term').value)
    };

    try {
        const response = await fetch(`${API_URL}/loans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loanData)
        });
        if (response.ok) {
            alert("Loan Created Successfully");
        } else {
            alert("Error creating loan");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Update existing loan
async function updateLoan() {
    const loanId = document.getElementById('loan_id_update').value;
    const loanData = {
        applicant_name: document.getElementById('applicant_name_update').value,
        applicant_address: document.getElementById('applicant_address_update').value,
        phone_number: document.getElementById('phone_number_update').value,
        email_address: document.getElementById('email_address_update').value,
        loan_amount: parseFloat(document.getElementById('loan_amount_update').value),
        interest_rate: parseFloat(document.getElementById('interest_rate_update').value),
        loan_term: parseInt(document.getElementById('loan_term_update').value)
    };

    try {
        const response = await fetch(`${API_URL}/loans/${loanId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loanData)
        });
        if (response.ok) {
            alert("Loan Updated Successfully");
        } else {
            alert("Error updating loan");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Delete loan
async function deleteLoan() {
    const loanId = document.getElementById('loan_id_delete').value;
    try {
        const response = await fetch(`${API_URL}/loans/${loanId}`, { method: 'DELETE' });
        if (response.ok) {
            alert("Loan Deleted Successfully");
        } else {
            alert("Error deleting loan");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function viewCustomerDetails() {
    // Get the customer ID from the input field
    const customerID = document.getElementById('customerIDInput').value;
    console.log('Customer ID:', customerID); 
    // Check if customerID is provided
    if (!customerID) {
        alert("Please enter a valid Customer ID.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/customers/${customerID}`);
        if (!response.ok) {
            alert('Error retrieving customer details');
            return;
        }

        const customerData = await response.json();
        console.log('Customer Details:', customerData);  // Display the data in the console for debugging

        // Display data in HTML
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

async function deleteCustomer() {
    const customerID = document.getElementById('customerIDInput')?.value;
    alert("deleteCustomer function is working!");
    
    if (!customerID) {
        alert("Please enter a Customer ID to delete.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${customerID}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete customer');
        
        alert('Customer deleted successfully');

        // Clear input fields after deletion
        document.getElementById('customerIDInput').value = '';
        document.getElementById('name')?.value = '';
        document.getElementById('email')?.value = '';
        document.getElementById('phone')?.value = '';
        
        // Clear address fields
        document.getElementById('street')?.value = '';
        document.getElementById('city')?.value = '';
        document.getElementById('state')?.value = '';
        document.getElementById('zip')?.value = '';
        document.getElementById('country')?.value = '';

        // Clear document fields (if any exist)
        const documentFields = document.getElementsByClassName('document-field');
        if (documentFields.length) {
            for (let field of documentFields) {
                field.value = '';
            }
        }

        // Clear mortgage document fields (if any exist)
        const mortgageFields = document.getElementsByClassName('mortgage-field');
        if (mortgageFields.length) {
            for (let field of mortgageFields) {
                field.value = '';
            }
        }

        // Clear furniture requirements fields
        document.getElementById('furnitureAmount')?.value = '';
        document.getElementById('furnitureDescription')?.value = '';

        // Clear business details fields
        document.getElementById('businessName')?.value = '';
        document.getElementById('registrationNumber')?.value = '';
        document.getElementById('industry')?.value = '';
        document.getElementById('revenue')?.value = '';
    } catch (error) {
        alert(`Error deleting customer: ${error.message}`);
    }
}






// Initialize the first section visible by default
showSection('create');
