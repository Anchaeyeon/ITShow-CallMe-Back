const express = require('express');
const methodOverride = require('method-override');

const sequelize = require('./models/index');
const nicknameRouter = require('./routes/nickname'); 
const emailRouter = require('./routes/email');
const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// 서버 시작 전 테이블 동기화
sequelize.sync({ force: false })  // force: false로 설정해서 기존 테이블 덮어쓰지 않음
  .then(() => {
    console.log('디비와 테이블 동기화 완료');
  })
  .catch((error) => {
    console.error('디비와 테이블 동기화 실패:', error);
  });

// 닉네임
app.use('/nickname', nicknameRouter);

// 이메일
app.use('/email', emailRouter);

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});