const express = require('express');
const db = require('./src/db');
const app = express();
const authRoutes = require('./src/routes/authRoutes');
const placeRoutes = require('./src/routes/placeRoutes');
const { toPath } = require('lodash');

app.use(express.json());
const port = process.env.PORT || 5000;

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();
    console.log(`${method} ${url} ${time}`);
    next();
};



//ldf  
//skldfjlaskdkjhkh
app.use(logger);

// إضافة مسارات المصادقة
app.use('/api/auth', authRoutes);

// إضافة مسارات الأماكن
app.use('/api/place', placeRoutes);



console.log('hi');


app.listen(port, () => {
    console.log('Server is running on port 5000');
});
