const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// إضافة تعليق جديد
router.post('/addcomment', commentController.addComment);

// استرجاع جميع التعليقات لمكان سياحي معين
router.post('/commentsbyplace', commentController.getCommentsByPlace);

module.exports = router;
