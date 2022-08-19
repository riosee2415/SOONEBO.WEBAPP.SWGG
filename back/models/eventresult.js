const DataTypes = require("sequelize");
const { Model } = DataTypes;

//eventResult
module.exports = class EventResult extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "EventResult",
        tableName: "eventResults",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.EventResult.belongsTo(db.Event);
  }
};
