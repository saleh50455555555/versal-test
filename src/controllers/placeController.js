const TouristPlace = require('../models/touristplaceModel');
const Province = require('../models/provinceModel');

// استرجاع جميع الأماكن في محافظة معينة
exports.getPlacesByProvince = async (req, res) => {
    const { provinceName } = req.body;

    try {
        // البحث عن معرف المحافظة بناءً على اسمها
        const province = await Province.findOne({ provinceName });
        if (!province) {
            return res.status(404).json({ message: 'Province not found' });
        }

        const places = await TouristPlace.find({ provinceID: province.provinceID });
        res.status(200).json(places);
    } catch (error) {
        console.error('Error while getting places', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// استرجاع معلومات مكان معين
exports.getPlaceById = async (req, res) => {
    const { placeID } = req.body;

    try {
        const place = await TouristPlace.findOne({ placeID });
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.status(200).json(place);
    } catch (error) {
        console.error('Error while getting place', error);
        res.status(500).json({ message: 'Server error', error });
    }
};



// استرجاع جميع المطاعم في محافظة معينة مرتبة تصاعديًا حسب التقييم
exports.getRestaurantsByProvince = async (req, res) => {
    const { provinceName } = req.body;

    try {
        const province = await Province.findOne({ provinceName });
        if (!province) {
            return res.status(404).json({ message: 'Province not found' });
        }

        // نوع 2 يمثل المطاعم
        const restaurants = await TouristPlace.find({ provinceID: province.provinceID, type: 2 }).sort({ averageRating: -1 });
        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error while getting restaurants', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// استرجاع جميع الفنادق في محافظة معينة مرتبة تصاعديًا حسب التقييم
exports.getHotelsByProvince = async (req, res) => {
    const { provinceName } = req.body;

    try {
        const province = await Province.findOne({ provinceName });
        if (!province) {
            return res.status(404).json({ message: 'Province not found' });
        }

        // نوع 1 يمثل الفنادق
        const hotels = await TouristPlace.find({ provinceID: province.provinceID, type: 1 }).sort({ averageRating: -1 });
        res.status(200).json(hotels);
    } catch (error) {
        console.error('Error while getting hotels', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// استرجاع جميع الأماكن التاريخية في محافظة معينة مرتبة تصاعديًا حسب التقييم
exports.getHistoricalPlacesByProvince = async (req, res) => {
    const { provinceName } = req.body;

    try {
        const province = await Province.findOne({ provinceName });
        if (!province) {
            return res.status(404).json({ message: 'Province not found' });
        }

        // نوع 3 يمثل الأماكن التاريخية
        const historicalPlaces = await TouristPlace.find({ provinceID: province.provinceID, type: 3 }).sort({ averageRating: -1 });
        res.status(200).json(historicalPlaces);
    } catch (error) {
        console.error('Error while getting historical places', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
