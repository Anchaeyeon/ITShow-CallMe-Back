const express = require('express');
const idolVideoController = require('../controllers/idolVideoController');

const router = express.Router();

// 아이돌 말풍선 보여주기
router.get('/choices/:id', idolVideoController.getIdolAllChoices);

module.exports = router;