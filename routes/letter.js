const express = require('express');
const letterController = require('../controllers/letterController');

const router = express.Router();

// 아이돌 이름 반환
router.get('/idolName/:id', letterController.getIdolName);

// 편지 입력
router.post('/message', letterController.addLetter);

// 사용자가 고른 아이돌 한 명에 대한 편지 모두 반환
router.get('/idolLetter/:id', letterController.getIdolLetter);

// 메세지 1개 반환
router.get('/message/:id', letterController.getOneMessageDetail);

// 모든 메세지 반환
router.get('/allLetter', letterController.getAllLetters);

module.exports = router;