const express = require("express");
const cors = require("cors");
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

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/images', express.static(path.join(__dirname, 'path_to_images_folder')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 서버 시작 전 테이블 동기화
sequelize
  .sync({ force: false }) // force: false로 설정해서 기존 테이블 덮어쓰지 않음, (true로 해서 테이블이 잘 생성되는지 확인해봄)
  .then(() => {
    console.log("디비와 테이블 동기화 완료");
  })
  .catch((error) => {
    console.error("디비와 테이블 동기화 실패:", error);
  });

app.get("/", (req, res) => {
  res.send("hi");
});

// 이메일
app.use("/email", emailRouter);

// 아이돌
app.use("/idol", idolRouter);

// 편지
app.use("/letter", letterRouter);

// 아이돌 비디오
app.use("/idolVideo", idolVideoRoutet);

app.listen(3000, () => {
  console.log("서버가 http://localhost:3000 에서 실행 중입니다.");
});
