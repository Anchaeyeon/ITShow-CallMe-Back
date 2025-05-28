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
    // userId: {
    //   type: DataTypes.INTEGER,
    //   //allowNull: false,
    //   unique: true,
    //   //fk(외래키 추가)
    //   references: {
    //     model: 'Users', //참조할 테이블
    //     key: 'id', //참조할 컬럼(열)
    //   }
    // },
    // idolId: {
    //   type: DataTypes.INTEGER,
    //   //allowNull: false,
    //   references: {
    //       model: 'Idols',
    //       key: 'id'
    //   }
    // }
  });

  Letter.associate = models => {
    Letter.belongsTo(models.User, {foreignKey: "userId", sourceKey : "id"});
  };

  Letter.associate = models => {
    Letter.belongsTo(models.Idol, {foreignKey: "idolId", sourceKey : "id"});
  };

  return Letter;
}