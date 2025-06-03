const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user.model');
require('dotenv').config();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET_KEY, { expiresIn: '2h' });
        return res.json({ token });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
