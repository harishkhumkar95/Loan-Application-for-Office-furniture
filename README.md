### Title
    Loan Origination System - Office Furniture

    ## Project Description
    The Loan Origination System for Office Furniture simplifies and automates the loan application.
    I This system manages customer details, business information, and loan-related documentation with robust backend processing.

### Features provided in application
    - Loan application management with customer and business details.
    - Integration with document management for loan processing.
    - Database-driven system for structured data storage.
    - RESTful API for frontend-backend communication.
### Installation
    - Node.js 
    -Express.js: Framework for routing and middleware.
    - Sequelize: ORM for managing database interactions.
    - Jest : Library for implemetation of unit test cases
    - MySql Database
    - PostMan For API testing
    - Used VS code as code editer
    - Install dependencies
    

    ## File Structure
    /Backend/server.js: Entry point for the backend server.
    /Backend/models: Data models for MongoDB collections.
    Customer.js: Handles customer data.
    BusinessDetails.js: Stores business-related information.
    Document.js: Tracks uploaded documents.
    /Backend/config/db.js: Database connection setup.
    /Backend/ Tests/ 
    Auth.test.js : unit test case for authetication
    Customer.test.js : unit test cases for CRUD api responses 
    /package.json: Project dependencies and scripts.
    /README.md: Documentation for the project.
    /Frontend/index.html :file includes all frontend html code
    /Frontned/style.css : provide styling and design code to the all html tag
    /Frontend/script.js : include all method that connected with my backend api to allow dynamic change
    /Frontend/login.html and logins.css : include login page htmla and css code
    /Frontend/Registration.html and css : include registration page html and css code
    

    ## EndPoint
    File: routes/customerRoutes.js
    Endpoints:
    POST /api/customers: Add a new customer.
    GET /api/customers/:id: Retrieve a specific customer's details.
    PUT /api/customers/:id: Update a customer's information.
    DELETE /api/customers/:id: Delete a customer.

## Resources Used for Development

### Backend Development
- [Node.js Official Documentation](https://nodejs.org/en/docs/) - Core documentation for Node.js.
- [Express.js Documentation](https://expressjs.com/en/starter/installing.html) - Framework used for building the API.
- [MySQL Node.js Driver](https://www.npmjs.com/package/mysql) - Library used to connect and query the MySQL database.
- [JWT Authentication in Node.js](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs) - Guide for implementing authentication using JWT.

### Frontend Development (Optional)
- [HTML, CSS, and JavaScript Basics](https://developer.mozilla.org/en-US/docs/Web) - For web design and interactivity.
- [Bootstrap Documentation](https://getbootstrap.com/) - For responsive UI components and layout.

### API Design and Testing
- [Postman](https://www.postman.com/) - Tool for testing and validating REST APIs.
- [RESTful API Design](https://restfulapi.net/) - Best practices for building REST APIs.

### MySQL Integration
- [MySQL Documentation](https://dev.mysql.com/doc/refman/8.0/en/) - Official MySQL documentation.
- [Sequelize ORM Documentation](https://sequelize.org/) - If using Sequelize ORM for MySQL integration.
### Added login feature 2/12/2024
- https://www.geeksforgeeks.org/how-to-link-a-button-to-another-page-in-html/
- https://stackoverflow.com/questions/54063609/problems-using-sequelize-models-errors-like-cannot-read-property-create-of-u
- https://www.geeksforgeeks.org/how-to-resolve-a-cannot-find-module-error-using-node-js/

### Current Enhancements
Added authentication and authorization features.
Implement logging and monitoring for API requests.
Refactored the system to use Sequelize ORM for all database operations.
Optimized data relationships and removed raw SQL queries for maintainability.
### Acknowledgements
Sequelize documentation for ORM integration.
Community forums for resolving ORM-specific challenges.

### Configure Database:
Update database credentials in the config/db.js file.

### Run Synchronization:
Sync database models:
node config/sync.js

### Start server 
node server.js 
### Access API:

Base URL: http://localhost:5000/api/customers.

### Deployment Details

1. Infrastructure Setup
AWS EC2 Instance:

Instance Type: t2.micro (Free Tier eligible).
Operating System: Windows Server 2022.
Security Group:
HTTP (TCP 80): Open to 0.0.0.0/0.
Custom TCP (5000): Open to 0.0.0.0/0 for backend API access.
MySQL/Aurora (TCP 3306): Open to the required IP range.
RDP (TCP 3389): Restricted to your local IP for remote access.
Elastic IP attached for consistent public access.
### AWS RDS MySQL Database:

Database Engine: MySQL 8.x (Free Tier eligible).
Publicly accessible: Enabled.
Endpoint: database-1.cneoesewi0ty.eu-west-1.rds.amazonaws.com:3306.
Security Group: Configured to allow access from EC2 and local IP.


2. Application Setup
Backend:

Built with Node.js and Express.
Dependencies installed via npm install.
Configured CORS to allow requests from any origin (origin: '*').
Sequelize ORM used for database interactions.
Frontend:

Static files (HTML, CSS, JS) served via Express.
Default route (/) set to serve login.html.
Database:

Tables and relationships were created and synchronized using Sequelize.
CRUD operations implemented for customer-related data.

3. Deployment Process
Node.js Setup on Windows EC2:

Installed Node.js and npm manually.
Backend and frontend files uploaded to EC2 instance.
Application started using node server.js.
Application Access:

API endpoints exposed on port 5000.
Frontend accessible via the public IP: http://18.202.23.198:5000.

### Testing
## Unit test case for negative scenario
Test Cases Result shown on vs code console
Test Suites: 2 passed, 2 total                                                                          
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        2.955 s, estimated 3 s
Ran all test suites.
PS D:\Loan Origination System - Office Furniture> 
## Integration tets cases 
Data retrieval and submission via Postman.
Frontend functionality, including customer details fetch and form submission.
Database persistence with MySQL Workbench.


### How to Access the Deployed Application on AWS instance 
## Application URL : http://18.202.23.198:5000
API Endpoints:
GET: /api/customers/:id
POST: /api/customers
PUT: /api/customers/:id
DELETE: /api/customers/:id
Click on the URL :  http://18.202.23.198:5000
Result
![Screenshot (148)](https://github.com/user-attachments/assets/88990653-c2f0-46d6-a116-be301b5869d6)

