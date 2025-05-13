const express = require('express');
const nicknameController = require('../controllers/nicknameController');

const router = express.Router();

// 닉네임 입력
router.post('/', nicknameController.addNickname);

// 닉네임 반환
router.get('/:id', nicknameController.getNicknameDetail);

module.exports = router;