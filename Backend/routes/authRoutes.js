const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import the User model

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user });
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
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
