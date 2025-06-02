const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });

  Letter.associate = models => {
    Letter.belongsTo(models.Idol, {foreignKey: "idolId", sourceKey : "id"});
  };

  return Letter;
}