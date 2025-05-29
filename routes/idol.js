const express = require('express');
const nicknameController = require('../controllers/idolController');

const router = express.Router();

// 모든 아이돌 사진 (정보) 보여주기
router.get('/all', nicknameController.getIdolAllImage);

module.exports = router;