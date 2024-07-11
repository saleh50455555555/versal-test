const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    provinceID: Number,
    provinceName: String
});

const Province = mongoose.model('Province', provinceSchema);

module.exports = Province;