const jwt = require('jsonwebtoken');


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

res.json({ message: 'Login successful', token });
