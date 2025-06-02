const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    capturePhoto: {
      type: DataTypes.STRING(500),
    }
  });

  return User;
}