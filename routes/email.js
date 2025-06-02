const express = require("express");
const emailController = require("../controllers/emailController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/capture_img/"); // 저장 폴더 (어디 폴더에 사진을 저장할 지 폴더 지정)
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname); // 확장자(jpg, png 등등) 지정
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD 형식
    const filename = `${date}-CallMe${extension}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// 이메일 입력
router.post("/", emailController.addEmail);

// 이메일로 사진 전송
router.post("/send", upload.single("image"), emailController.sendEmailandImg);

module.exports = router;
