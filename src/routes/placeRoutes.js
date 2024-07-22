const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

// مسار استرجاع جميع الأماكن في محافظة معينة
router.post('/placebyprovince', placeController.getPlacesByProvince);

// مسار استرجاع معلومات مكان معين
router.post('/placebyid', placeController.getPlaceById);

module.exports = router;

