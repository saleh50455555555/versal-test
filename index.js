const express = require('express');
const db = require('./src/db');
const path = require('path'); // إضافة مكتبة path
const app = express();
const authRoutes = require('./src/routes/authRoutes');
const placeRoutes = require('./src/routes/placeRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
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

app.use('/public', express.static(path.join(__dirname, 'public')));




const baseUrl = 'https://node-saleh.onrender.com';


app.use('/api/auth', authRoutes);


app.use('/api/place', placeRoutes);



app.use('/api/comments', commentRoutes);














app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});