const mongoose = require('mongoose');

const touristPlaceSchema = new mongoose.Schema({
    placeID: Number,
    placeName: String,
    description: String,
    location: String,
    images: [String],
    averageRating: Number,
    numberOfRatings: Number,
    provinceID: { type: mongoose.Schema.Types.Number, ref: 'Province' },
    type: Number // إضافة نوع المكان
});

const TouristPlace = mongoose.model('TouristPlace', touristPlaceSchema);

module.exports = TouristPlace;
