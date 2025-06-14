const { Letter, Idol } = require("../models");

const letterController = {
  // 아이돌 이름 반환
  getIdolName: async (req, res) => {
    const idolId = req.params.id;
    try {
      const idol = await Idol.findByPk(idolId);
      if (!idol) {
        return res.status(404).send("아이돌 아이디가 존재하지 않습니다.");
      }
      res.json({ idolName: idol.idolName, id: idol.id });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // 메세지, 닉네임 입력
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

  // 사용자가 고른 아이돌 한 명에 대한 편지 모두 반환
  getIdolLetter: async (req, res) => {
    const idolId = req.params.id;
    try {
      const idolLetters = await Letter.findAll({
        where: { idolId },
        attributes: ["id", "message", "nickname"],
        include: [
          {
            model: Idol,
            attributes: ["idolName"],
          },
        ],
      });
      if (idolLetters.length === 0) {
        return res.status(404).send("어떤 아이돌에 대해 쓴 편지가 존재하지 않습니다.");
      }

      // 필요한 데이터만 추출
      const selectIdolLetters = idolLetters.map((letter) => ({
        id: letter.id,
        message: letter.message,
        nickname: letter.nickname,
        idolname: letter.Idol.idolName,
      }));

      res.json(selectIdolLetters);
    } catch (err) {
      console.error("아이돌 편지 조회 실패 ", err);
      res.status(500).send("서버 에러");
    }
  },

  // 메세지(아이디에 따른 아이돌 이름, 메세지 내용, 사용자 닉네임) 1개 반환
  getOneMessageDetail: async (req, res) => {
    const messageId = req.params.id;
    try {
      const message = await Letter.findByPk(messageId, {
        include: [
          {
            model: Idol, // Idol 테이블과 조인
            attributes: ["idolName"], // messageId 값의 아이돌 이름 가져오기
          },
        ],
      });
      if (!message) {
        res.status(404).send("메세지를 찾을 수 없습니다.");
        return;
      }
      res.json({
        message: message.message,
        nickname: message.nickname,
        idolName: message.Idol.idolName,
      });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // 모든 편지 가져오기
  getAllLetters: async (req, res) => {
    try {
      const letter = await Letter.findAll({
        attributes: ["id", "message", "nickname"],
        include: [
          {
            model: Idol, // Idol 테이블과 조인
            attributes: ["idolName"], // messageId 값의 아이돌 이름 가져오기
          },
        ],
        order: [
          ["id", "DESC"],
        ]
      });
      if (letter.length === 0) {
        return res.status(404).json({ message: "메세지를 찾을 수 없습니다." });
      }

      // 필요한 데이터(메세지, 닉네임, 아이돌 이름)만 뽑아서 새로운 배열로 만들기
      const allLetters = letter.map((letter) => ({
        id: letter.id,
        message: letter.message,
        nickname: letter.nickname,
        idolName: letter.Idol.idolName,
      }));
      res.json(allLetters);
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = letterController;
