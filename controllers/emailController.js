const { User } = require("../models");

const emailController = {
  // 이메일 입력
  addEmail: async (req, res) => {
    const { email } = req.body;
    try {
      await User.create({ email });
      res.send("이메일 저장 완료");
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    }
  }
};

module.exports = emailController;
