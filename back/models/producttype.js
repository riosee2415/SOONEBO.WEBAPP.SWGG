const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductType extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "ProductType",
        tableName: "productTypes",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductType.hasMany(db.Product);
  }
};
