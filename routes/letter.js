const express = require('express');
const letterController = require('../controllers/letterController');

const router = express.Router();

// 메세지 (편지) 입력
router.post('/message', letterController.addLetter);

// 메세지 반환
router.get('/message/:id', letterController.getMessageDetail);

module.exports = router;