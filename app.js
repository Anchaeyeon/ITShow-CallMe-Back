const cors = require("cors");
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const { sequelize } = require("./models/index");
const emailRouter = require("./routes/email");
const idolRouter = require("./routes/idol");
const letterRouter = require("./routes/letter");
const idolVideoRoutet = require("./routes/idolVideo");
const app = express();

app.use(cors({
  origin: ["https://callme-nine.vercel.app", "http://localhost:5173"],
  credentials: true,
}));

// 용량 제한 크게 늘림 (10MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(methodOverride("_method"));

// 정적파일 라우팅
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB 동기화
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("디비와 테이블 동기화 완료");
  })
  .catch((error) => {
    console.error("디비와 테이블 동기화 실패:", error);
  });

// 기본 라우트
app.get("/", (req, res) => {
  res.send("hi");
});

// 라우터들
app.use("/email", emailRouter);
app.use("/idol", idolRouter);
app.use("/letter", letterRouter);
app.use("/idolVideo", idolVideoRoutet);

// 서버 실행
app.listen(3000, () => {
  console.log("서버가 http://localhost:3000 에서 실행 중입니다.");
});
