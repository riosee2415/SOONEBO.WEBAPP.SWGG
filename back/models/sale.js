const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Sale extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.STRING(100), // 매출, 환불
          allowNull: false,
          defaultValue: "매출",
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        gradeString: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        isCompleted: {
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
        modelName: "Sale",
        tableName: "sales",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Sale.belongsTo(db.User);
  }
};
