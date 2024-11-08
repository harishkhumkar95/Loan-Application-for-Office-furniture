// backend/routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const Loan = require('../models/loan');

// Create loan
router.post('/loans', (req, res) => {
    Loan.createLoan(req.body, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.status(201).json({ id: result.insertId, ...req.body });
    });
});

// Get all loans
router.get('/loans', (req, res) => {
    Loan.getLoans((err, results) => {
        if (err) res.status(500).json({ error: err.message });
        else res.status(200).json(results);
    });
});

// Update loan
router.put('/loans/:id', (req, res) => {
    const { id } = req.params;
    Loan.updateLoan(id, req.body, (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.status(200).json({ id, ...req.body });
    });
});

// Delete loan
router.delete('/loans/:id', (req, res) => {
    const { id } = req.params;
    Loan.deleteLoan(id, (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.status(204).end();
    });
});

module.exports = router;
