const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class WishItem extends Model {
  static init(sequelize) {
    return super.init(
      {
        ProductId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        productPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        productDiscount: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        productTitle: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        productThumbnail: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        productDelPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        optionString: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        optionPrice: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        qun: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        BoughtHitstoryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "WishItem",
        tableName: "wishItems",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.WishItem.belongsTo(db.WishList);
  }
};
