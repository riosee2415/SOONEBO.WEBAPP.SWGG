const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductBottom extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        mobileImagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
      },
      {
        modelName: "ProductBottom",
        tableName: "productBottoms",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductBottom.hasMany(db.Product);
  }
};
