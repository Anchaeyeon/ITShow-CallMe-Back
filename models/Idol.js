const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Idol = sequelize.define(
  "Idol",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idolName: {
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

module.exports = Idol;
