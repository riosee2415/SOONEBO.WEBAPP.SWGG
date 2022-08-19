const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserGrade extends Model {
  static init(sequelize) {
    return super.init(
      {
        lvValue: {
          type: DataTypes.STRING(40), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        possiblePayment: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fee: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        modelName: "UserGrade",
        tableName: "userGrade",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
