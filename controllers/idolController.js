const { Idol } = require("../models");

const idolController = {
  // 아이돌 클릭 시 클릭 횟수 증가
  clickIdol: async (req, res) => {
    const id = req.params.id;
    try {
      const clickCount = await Idol.findByPk(id);
      if (!clickCount) {
        return res.status(404).send("아이돌 아이디가 존재하지 않습니다.");
      }
      clickCount.videoCallCount += 1;
      await clickCount.save();
      res.send("아이돌 클릭 수 증가");
    } catch (err) {
      console.error("클릭 수 증가 실패: ", err);
      res.status(500).send("서버 에러");
    }
  },

  // 사용자가 선택한 아이돌 클릭 횟수 반환
  getclickOneIdol: async (req, res) => {
    const id = req.params.id;
    try {
      const idolClick = await Idol.findOne({ where: {id}, attributes: ["videoCallCount"] });
      if (!idolClick) {
        return res.status(404).send("아이돌 아이디가 존재하지 않습니다.");
      }
      res.json(idolClick);
    } catch (err) {
      console.error("사용자가 선택한 아이돌 클릭 횟수 반환 실패: ", err);
      res.status(500).send("서버 에러");
    }
  },

  // 아이돌 아이디, 이름, 사진, 클릭 횟수 반환 (모든 정보 반환)
  // 프론트에서 보여줘야 하는 사진이나 클릭 횟수 등 골라서 화면에 보이게 하면 돼!
  getIdolAllImage: async (req, res) => {
    try {
      const idolImg = await Idol.findAll({ attributes: ["id", "idolName", "idolGroup", "idolGroupKor", "idolImages", "videoCallCount"] });
      res.json(idolImg);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버 에러" });
    }
  },
};

module.exports = idolController;
