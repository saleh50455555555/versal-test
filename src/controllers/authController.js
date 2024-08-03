const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { omit } = require('lodash');

// تسجيل مستخدم جديد
exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }
        let userr = await User.findOne({ username });
        if (userr) {
            console.log('username is  reserved');
            return res.status(400).json({ message: 'username is  reserved' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            passwordHash: hashedPassword,
            email
        });

        await user.save();

        // إنشاء توكين JWT بعد التسجيل مباشرة
        const token = jwt.sign({ userID: user.userID }, 'your_jwt_secret', { expiresIn: '1h' });

        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error while registering user', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// تسجيل الدخول
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid email or password');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            console.log('Invalid email or password');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userID: user.userID }, 'your_jwt_secret', { expiresIn: '1h' });
        console.log('User logged in successfully');
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error while logging in', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
