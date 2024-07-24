
const mongoose = require('mongoose');

const touristPlaceSchema = new mongoose.Schema({
    placeID: Number,
    placeName: String,
    description: String,
    location: {
        lat: Number,
        lng: Number
    },
    images: [String],
    averageRating: Number,
    numberOfRatings: Number,
    type: Number,
    provinceID: { type: mongoose.Schema.Types.Number, ref: 'Province' }
});

const TouristPlace = mongoose.model('TouristPlace', touristPlaceSchema);

module.exports = TouristPlace;
