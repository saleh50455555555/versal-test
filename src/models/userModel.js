const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: String,
    passwordHash: String,
    email: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TouristPlace' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
