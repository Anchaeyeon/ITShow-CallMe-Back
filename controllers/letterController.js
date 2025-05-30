const { Letter, User, Idol } = require("../models");

const letterController = {
  // 메세지 입력
  // 프론트에서 메세지와 사용자가 클릭한 아이디도 함께 보내주기
  addLetter: async (req, res) => {
    const { message, idolId } = req.body;
    try {
      // 가장 최근에 생성된 값 가져오기
      const user = await User.findOne({ order: [['id', 'DESC']] });
      const idol = await Idol.findByPk(idolId);
      if (!user) {
        return res.status(404).send("사용자가 존재하지 않습니다.");
      }
      if (!idol) {
        return res.status(404).send("아이돌 아이디가 존재하지 않습니다.");
      }
      await Letter.create({ message, userId: user.id, idolId: idol.id });
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
            model: User, // User 테이블과 조인
            attributes: ['nickname'], // messageId 값의 닉네임 가져오기
          },
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
      res.json({ message: message.message, nickname: message.User.nickname, idolname: message.Idol.idolName });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = letterController;