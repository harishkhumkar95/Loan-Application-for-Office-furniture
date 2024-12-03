    ## Title
    Loan Origination System - Office Furniture

    ## Project Description
    The Loan Origination System for Office Furniture simplifies and automates the loan application.
    I This system manages customer details, business information, and loan-related documentation with robust backend processing.


    ## Features provided in application
    - Loan application management with customer and business details.
    - Integration with document management for loan processing.
    - Database-driven system for structured data storage.
    - RESTful API for frontend-backend communication.
    ## Installation
    - Node.js (version 14.x or above)
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
    /package.json: Project dependencies and scripts.
    /README.md: Documentation for the project.

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

