const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

// مسار استرجاع جميع الأماكن في محافظة معينة
router.post('/placebyprovince', placeController.getPlacesByProvince);

// مسار استرجاع معلومات مكان معين
router.post('/placebyprovince/placebyid', placeController.getPlaceById);



// استرجاع جميع المطاعم في محافظة معينة
router.post('/placebyprovince/restaurants', placeController.getRestaurantsByProvince);

// استرجاع جميع الفنادق في محافظة معينة
router.post('/placebyprovince/hotels', placeController.getHotelsByProvince);

// استرجاع جميع الأماكن التاريخية في محافظة معينة
router.post('/placebyprovince/historical', placeController.getHistoricalPlacesByProvince);


module.exports = router;

