const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Review extends Model {
  static init(sequelize) {
    return super.init(
      {
        rate: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0.0,
        },
        title: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        imagePath1: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        imagePath2: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        imagePath3: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        imagePath4: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isComplete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        modelName: "Review",
        tableName: "reviews",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Review.belongsTo(db.User);
    db.Review.belongsTo(db.Product);
  }
};
