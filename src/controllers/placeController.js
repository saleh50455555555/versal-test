const TouristPlace = require('../models/TouristPlaceModel');

// استرجاع جميع الأماكن في محافظة معينة
exports.getPlacesByProvince = async (req, res) => {
    const { provinceID } = req.body;

    try {
        const places = await TouristPlace.find({ provinceID });
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
