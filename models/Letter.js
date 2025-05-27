const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Idol = require('./Idol');

const Letter = sequelize.define('Letter', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  message: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    //allowNull: false,
    //fk(외래키 추가)
    references: {
        model: User, //참조할 테이블
        key: 'id', //참조할 컬럼(열)
    }
  },
  idolId: {
    type: DataTypes.INTEGER,
    //allowNull: false,
    references: {
        model: Idol,
        key: 'id'
    }
  }
});

module.exports = Letter;