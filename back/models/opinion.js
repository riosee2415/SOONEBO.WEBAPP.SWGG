const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Opinion extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        terms: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isComplete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Opinion",
        tableName: "opinions",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Opinion.belongsTo(db.User);
    db.Opinion.belongsTo(db.OpinionType);
  }
};
