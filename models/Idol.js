const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Idol = sequelize.define("Idol", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      idolName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      idolGroup: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      idolGroupKor: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      idolImages: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      videoCallCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false, // createdAt, updatedAt 안 씀
    }
  );

  Idol.associate = models => {
    Idol.hasMany(models.Letter, { foreignKey: 'idolId', sourceKey: 'id' });
    Idol.hasMany(models.IdolVideo, { foreignKey: 'idolId', sourceKey: 'id' });
  };

  return Idol;
}
