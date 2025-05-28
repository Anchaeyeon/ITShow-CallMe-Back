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
  });

  Letter.associate = models => {
    Letter.belongsTo(models.User, {foreignKey: "userId", sourceKey : "id"});
    Letter.belongsTo(models.Idol, {foreignKey: "idolId", sourceKey : "id"});
  };

  return Letter;
}