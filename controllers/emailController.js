const { User } = require("../models");
const nodemailer = require("nodemailer");
const path = require("path");

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
  },

  sendEmailandImg: async (req, res) => {
    try {
      const email = await User.findOne({
        order: [["id", "DESC"]],
      });
      if (!email) {
        return res.status(404).send("이메일이 존재하지 않습니다.");
      }
      const userEmail = email.email;
      const captureImg = path.join(
        __dirname,
        "../uploads/capture_img",
        req.file.filename
      );
      const captureImgDB = `uploads/capture_img/${req.file.filename}`;

      // 내 이메일 정의
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_NAME, // 내 Gmail 주소
          pass: process.env.EMAIL_PASS, // 내 Gmail 앱 비밀번호
        },
      });

      // 보낼 이메일의 제목, 내용 정의
      const mailContents = {
        from: process.env.EMAIL_NAME,
        to: userEmail,
        subject: "CallMe 이미지가 도착했습니다!",
        text: "이미지를 저장해주세요.\nCallMe를 이용해주셔서 감사합니다♡",
        attachments: [
          {
            filename: req.file.filename,
            path: captureImg,
          },
        ],
      };

      // 이메일 전송
      await transporter.sendMail(mailContents);
      res.send("이메일 전송 완료");

      // DB에 사진(경로) 저장
      await User.update(
        { capPhoto: captureImgDB },
        { where: { id: email.id } }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("이메일 전송 실패");
    }
  },

  // 캡쳐 사진 프론트에 반환
  getCapturePhoto: async (req, res) => {
    try {
      const captureImg = await User.findAll({
        attributes: ["id", "capPhoto"],
      });
      res.json(captureImg);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버 에러" });
    }
  },
};

module.exports = emailController;
