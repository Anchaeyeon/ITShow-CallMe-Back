const express = require('express');
const letterController = require('../controllers/letterController');

const router = express.Router();

// 아이돌 이름 반환
router.get('/idolName/:id', letterController.getIdolName);

// 편지 입력
router.post('/message', letterController.addLetter);

// 메세지 1개 반환
router.get('/message/:id', letterController.getMessageDetail);

// 모든 메세지 반환
router.get('/allLetter', letterController.getAllLetters);

module.exports = router;