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
    const imageName = Date.now() + "-CallMe-" + file.originalname;  // 파일(사진) 이름
    cb(null, imageName);
  },
});
const upload = multer({ storage });

// 이메일 입력
router.post("/", emailController.addEmail);

// 이메일 반환
router.get("/getEmail", emailController.getEmail);

// 이메일로 사진 전송
router.post("/send", upload.single("captureImg"), emailController.sendEmailandImg);

// 캡쳐 사진 반환
router.get("/capPhoto", emailController.getCapturePhoto);

module.exports = router;
