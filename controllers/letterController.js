const { Letter, Idol } = require("../models");

const letterController = {
  // 메세지 입력
  // 프론트에서 메세지와 사용자가 클릭한 아이디도 함께 보내주기
  addLetter: async (req, res) => {
    const { message, nickname, idolId } = req.body;
    try {
      const idol = await Idol.findByPk(idolId);
      if (!idol) {
        return res.status(404).send("아이돌 아이디가 존재하지 않습니다.");
      }
      await Letter.create({ message, nickname, idolId: idol.id });
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
            model: Idol, // Idol 테이블과 조인
            attributes: ['idolName'], // messageId 값의 아이돌 이름 가져오기
          }
        ],
      });
      if (!message) {
        res.status(404).send("메세지를 찾을 수 없습니다.");
        return;
      }
      res.json({ message: message.message, nickname: message.nickname, idolname: message.Idol.idolName });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = letterController;