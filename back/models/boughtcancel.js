// 주문 취소
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BoughtCancel extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.INTEGER, //[1. 취소신청, 2. 교환신청, 3. 환불신청]
          allowNull: false,
        },
        reason: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        bankName: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        bankNo: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        isComplete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "BoughtCancel",
        tableName: "boughtCancels",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoughtCancel.belongsTo(db.BoughtHistory);
    db.BoughtCancel.belongsTo(db.User);
  }
};
