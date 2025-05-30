const { Idol } = require("../models");

const idolController = {
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

  // 아이돌 사진 반환
  getIdolAllImage: async (req, res) => {
    try {
      const idolImg = await Idol.findAll({ attributes: ["id", "idolName", "idolImages", "videoCallCount"] });
      res.json(idolImg);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버 에러" });
    }
  },
};

module.exports = idolController;
