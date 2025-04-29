const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
  }
});

module.exports = User;