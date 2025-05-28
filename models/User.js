const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
    },
    capturePhoto: {
      type: DataTypes.STRING(500),
    }
  });

  User.associate = models => {
    User.hasOne(models.Letter, { foreignKey: 'userId', sourceKey: 'id' });
  };

  return User;
}