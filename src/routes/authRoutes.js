const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// مسار تسجيل مستخدم جديد
router.post('/register', authController.register);

// مسار تسجيل الدخول
router.post('/login', authController.login);

module.exports = router;
