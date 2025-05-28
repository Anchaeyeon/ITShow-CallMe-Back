const { Letter, User } = require("../models");

const letterController = {
  // 메세지 입력
  addLetter: async (req, res) => {
    const { message } = req.body;
    try {
      // 가장 최근에 생성된 값 가져오기
      const user = await User.findOne({ order: [['id', 'DESC']] });
      if (!user) {
        return res.status(404).send("사용자가 존재하지 않습니다.");
      }
      await Letter.create({ message, userId: user.id });
      res.send("메세지(편지) 저장 완료");
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // 메세지 반환
  getMessageDetail: async (req, res) => {
    const messageId = req.params.id;
    try {
      const message = await Letter.findByPk(messageId, {
        include: [
          {
            model: User,
            attributes: ['nickname'], // messageId 값의 닉네임 가져오기
          },
        ],
      });
      if (!message) {
        res.status(404).send("메세지를 찾을 수 없습니다.");
        return;
      }
      res.json({ message: message.message, nickname: message.User.nickname });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = letterController;