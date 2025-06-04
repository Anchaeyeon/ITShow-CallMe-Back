const express = require('express');
const idolController = require('../controllers/idolController');

const router = express.Router();

// 모든 아이돌 사진 (정보) 보여주기
router.get('/all', idolController.getIdolAllImage);

// 아이돌 클릭 수 증가
router.get('/click/:id', idolController.clickIdol);

// 사용자가 선택한 아이돌 클릭 횟수 반환하기
router.get('/click/oneIdol/:id', idolController.getclickOneIdol);

module.exports = router;