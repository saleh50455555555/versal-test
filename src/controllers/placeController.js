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
