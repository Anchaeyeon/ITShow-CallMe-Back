const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

// 이메일 입력
router.post('/', emailController.addEmail);

module.exports = router;