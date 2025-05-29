const { Idol } = require("../models");

const idolController = {
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
