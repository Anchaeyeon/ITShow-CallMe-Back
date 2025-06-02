const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const IdolVideo = sequelize.define("IdolVideo", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      videos: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      choices: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      idolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false, // createdAt, updatedAt 안 씀
    }
  );

  IdolVideo.associate = models => {
    IdolVideo.belongsTo(models.Idol, { foreignKey: 'idolId', sourceKey: 'id' });
  };

  return IdolVideo;
}
