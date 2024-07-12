const express = require('express');
const db = require('./src/db');
const app = express();
const authRoutes = require('./src/routes/authRoutes');

app.use(express.json());
const port = process.env.PORT || 5000;


const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString(); // تعديل للحصول على تاريخ ووقت ISO
    console.log(`${method} ${url} ${time}`);
    next();
};

app.use(logger);

// إضافة مسارات المصادقة
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log('Server is running on port 5000');
});
