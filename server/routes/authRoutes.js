const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/User');
const bcrypt=require('bcryptjs');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

       
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword
    });

    try {
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
