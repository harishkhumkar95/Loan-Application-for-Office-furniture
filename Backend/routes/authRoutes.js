const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Use the MySQL connection

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Check if the user already exists
        const checkQuery = 'SELECT * FROM Users WHERE username = ?';
        const [existingUser] = await db.promise().query(checkQuery, [username]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        const insertQuery = 'INSERT INTO Users (username, password) VALUES (?, ?)';
        await db.promise().query(insertQuery, [username, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Fetch the user by username
        const fetchQuery = 'SELECT * FROM Users WHERE username = ?';
        const [users] = await db.promise().query(fetchQuery, [username]);

        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = users[0];

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
