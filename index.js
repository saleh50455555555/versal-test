const express = require('express');
const db = require('./src/db');
const path = require('path'); // إضافة مكتبة path
const app = express();
const authRoutes = require('./src/routes/authRoutes');
const placeRoutes = require('./src/routes/placeRoutes');


const TouristPlace = require('./src/models/touristplaceModel');


app.use(express.json());
const port = process.env.PORT || 5000;

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();
    console.log(`${method} ${url} ${time}`);
    next();
};

app.use(logger);

// إعداد تقديم الملفات الثابتة من مجلد public
app.use('/public', express.static(path.join(__dirname, 'public')));



const baseUrl = 'https://node-saleh.onrender.com'; // تحديث مع الدومين الفعلي بعد النشر






// إضافة مسارات المصادقة
app.use('/api/auth', authRoutes);

// إضافة مسارات الأماكن
app.use('/api/place', placeRoutes);

// تعريف المسار الأساسي للتطبيق
//const baseUrl = process.env.BASE_URL || `http://localhost:${port}`; // تحديث مع الدومين الفعلي بعد النشر

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});