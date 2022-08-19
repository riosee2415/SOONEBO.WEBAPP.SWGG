const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductOptions extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        modelName: "ProductOptions",
        tableName: "productOptions",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductOptions.belongsTo(db.Product);
    db.ProductOptions.belongsTo(db.Option);
  }
};
