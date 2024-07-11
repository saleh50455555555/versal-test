const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentID: Number,
    placeID: { type: mongoose.Schema.Types.Number, ref: 'TouristPlace' },
    userID: { type: mongoose.Schema.Types.Number, ref: 'User' },
    commentText: String,
    timestamp: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;