const express = require('express');
const Users = require('../models/User');

const router = express.Router();

// 이메일 입력
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        const [isUpdated] = await Users.update({email}, {where: {id}});
        if (isUpdated) {
            res.send('이메일 수정 완료');
        }
        else {
            res.status(404).send('이메일 찾기 실패');
            return;
        }
    } catch (err) {
        console.error('데이터베이스 쿼리 실패 : ', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;