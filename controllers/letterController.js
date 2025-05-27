const Letter = require("../models/Letter");

const letterController = {
  // 메세지 입력
  addLetter: async (req, res) => {
    const { message } = req.body;
    try {
      await Letter.create({ message });
      res.send("메세지(편지) 저장 완료");
    } catch (err) {
      console.error("데이터 베이스 쿼리 실패 : ", err);
      res.status(500).send("Insternal Server Error");
    }
  },

  // 메세지 반환
  getMessageDetail: async (req, res) => {
    const messageId = req.params.id;
    try {
      const message = await Letter.findByPk(messageId);
      if (!message) {
        res.status(404).send("메세지을 찾을 수 없습니다.");
        return;
      }
      res.json({ message: message.message });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = letterController;