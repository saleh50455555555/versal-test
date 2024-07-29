const Comment = require('../models/commentModel');
const TouristPlace = require('../models/touristplaceModel');
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

exports.addComment = async (req, res) => {
    const { placeID, commentText } = req.body;
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, 'your_jwt_secret'); // 'your_jwt_secret' is your secret key

    try {
        const userID = decoded.userID; // Extract userID from the decoded token 
        console.log(userID);
        const user = await User.findOne({ userID });
        const place = await TouristPlace.findOne({ placeID });

        if (!user || !place) {
            return res.status(404).json({ message: 'User or Place not found' });
        }

        const newComment = new Comment({
            placeID,
            userID,
            commentText
        });

        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error('Error while adding comment', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getCommentsByPlace = async (req, res) => {
    const { placeID } = req.body;

    try {
        // جلب التعليقات بدون استخدام populate
        const comments = await Comment.find({ placeID }).sort({ timestamp: -1 });

        // جلب أسماء المستخدمين بناءً على userID
        const enrichedComments = await Promise.all(comments.map(async comment => {
            // استخدم findOne للبحث عن المستخدم باستخدام userID
            const user = await User.findOne({ userID: comment.userID }).select('username');
            return {
                ...comment._doc,
                username: user ? user.username : 'Unknown'
            };
        }));

        res.status(200).json(enrichedComments);
    } catch (error) {
        console.error('Error while getting comments', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
