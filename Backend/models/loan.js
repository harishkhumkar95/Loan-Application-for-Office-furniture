// backend/models/loan.js
const db = require('../config/db');

// Create loan
const createLoan = (data, callback) => {
    const query = 'INSERT INTO loans SET ?';
    db.query(query, data, callback);
};

// Get all loans
const getLoans = (callback) => {
    const query = 'SELECT * FROM loans';
    db.query(query, callback);
};

// Update loan
const updateLoan = (id, data, callback) => {
    const query = 'UPDATE loans SET ? WHERE id = ?';
    db.query(query, [data, id], callback);
};

// Delete loan
const deleteLoan = (id, callback) => {
    const query = 'DELETE FROM loans WHERE id = ?';
    db.query(query, id, callback);
};

module.exports = { createLoan, getLoans, updateLoan, deleteLoan };
