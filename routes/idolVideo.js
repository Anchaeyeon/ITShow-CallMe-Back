const express = require('express');
const idolVideoController = require('../controllers/idolVideoController');

const router = express.Router();

// 아이돌 말풍선 보여주기
router.get('/choices/:id', idolVideoController.getIdolAllChoices);

// 사용자가 누른 말풍선에 따른 비디오 반환
router.get('/video/:id', idolVideoController.getIdolVideos);

module.exports = router;