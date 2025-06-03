const { IdolVideo } = require("../models");

const IdolVideoController = {
  // 아이돌 말풍선 반환 (id와 idolId도 함께 반환)
  getIdolAllChoices: async (req, res) => {
    const idolId = req.params.id;
    try {
      const idolChoices = await IdolVideo.findAll({ where: {idolId}, attributes: ["id", "choices", "idolId"] });
      res.json(idolChoices);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버 에러" });
    }
  },
};

module.exports = IdolVideoController;