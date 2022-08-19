const DataTypes = require("sequelize");
const { Model } = DataTypes;

// QNA
module.exports = class Qna extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        answerdAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Qna",
        tableName: "qnas",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Qna.belongsTo(db.User);
    db.Qna.belongsTo(db.Product);
  }
};
