const { IdolVideo } = require("../models");

const IdolVideoController = {
  // 아이돌 말풍선 반환 (id와 idolId도 함께 반환)
  getIdolAllChoices: async (req, res) => {
    const idolId = req.params.id;
    try {
      const idolChoices = await IdolVideo.findAll({ where: {idolId}, attributes: ["id", "choices", "idolId"] });
      if (idolChoices.length === 0) {
        return res.status(404).send("해당 아이돌은 말풍선이 존재하지 않습니다.");
      }
      res.json(idolChoices);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버 에러" });
    }
  },

  // 사용자가 누른 말풍선에 따른 비디오 보여주기
  getIdolVideos: async (req, res) => {
    const id = req.params.id;
    try {
      const video = await IdolVideo.findOne({ where: {id}, attributes: ["videos"] });
      res.json(video);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버 에러" });
    }
  }
};

module.exports = IdolVideoController;