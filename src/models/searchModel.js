const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    searchID: Number,
    userID: { type: mongoose.Schema.Types.Number, ref: 'User' },
    searchText: String,
    searchTimestamp: { type: Date, default: Date.now }
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;