const express = require('express');
const Users = require('../models/User');

const router = express.Router();

// 이름 입력
router.post('/nickname', async (req, res) => {
    const { nickname } = req.body;
    try {
        await Users.create({nickname});
        res.send('닉네임 저장 완료');
    } catch (err) {
        console.error('데이터 베이스 쿼리 실패 : ', err);
        res.status(500).send('Insternal Server Error');
    }
});

module.exports = router;