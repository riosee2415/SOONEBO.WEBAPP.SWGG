const DataTypes = require("sequelize");
const { Model } = DataTypes;

//event
module.exports = class Event extends Model {
  static init(sequelize) {
    return super.init(
      {
        thumbnail: {
          type: DataTypes.STRING(600),
          allowNull: false, // 필수
        },
        file: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Event",
        tableName: "events",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
