const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

// sequelize 인스턴스를 전달
const User = require('./User')(sequelize);
const Letter = require('./Letter')(sequelize);
const Idol = require('./Idol')(sequelize);

User.hasOne(Letter, { foreignKey: 'userId', sourceKey: 'id' });   // 유저는 하나의 편지만 가짐
Letter.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' }); // 편지는 한 유저에게 속함

Idol.hasOne(Letter, { foreignKey: 'idolId', sourceKey: 'id' });
Letter.belongsTo(Idol, { foreignKey: 'idolId', sourceKey: 'id' });

module.exports = { sequelize, User, Letter, Idol };