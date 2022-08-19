const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserPoint extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.STRING(100), // 구분
          allowNull: false,
        },
        usePrice: {
          type: DataTypes.INTEGER, // 사용 금액
          allowNull: false,
        },
        receivePrice: {
          type: DataTypes.INTEGER, // 지급 금액
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(100), // 내역
          allowNull: false,
        },
        remainPrice: {
          type: DataTypes.INTEGER, // 잔액
          allowNull: false,
        },
      },
      {
        modelName: "UserPoint",
        tableName: "userPoints",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UserPoint.belongsTo(db.User);
  }
};
