const Users = require("../models/User");

const nicknameController = {
  // 닉네임 입력
  addNickname: async (req, res) => {
    const { nickname } = req.body;
    try {
      await Users.create({ nickname });
      res.send("닉네임 저장 완료");
    } catch (err) {
      console.error("데이터 베이스 쿼리 실패 : ", err);
      res.status(500).send("Insternal Server Error");
    }
  },

  // 닉네임 반환
  getNicknameDetail: async (req, res) => {
    const nicknameId = req.params.id;
    try {
      const nickname = await Users.findByPk(nicknameId);
      if (!nickname) {
        res.status(404).send("닉네임을 찾을 수 없습니다.");
        return;
      }
      res.json({ nickname: nickname.nickname });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = nicknameController;
