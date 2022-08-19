const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        title: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        thumbnail: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        hoverImage: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        videoPath: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        discount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        content: {
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        deliveryPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        /////////
        descImage1: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        descImage2: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        descImage3: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        descImage4: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        /////////
        mobileDescImage1: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        mobileDescImage2: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        mobileDescImage3: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        mobileDescImage4: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        ////////
        descAnimation1: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        descAnimation2: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        descAnimation3: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        descAnimation4: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        //////////
        isBest: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isMD: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isNew: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isSet: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
        modelName: "Product",
        tableName: "products",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Product.belongsTo(db.ProductType);
    db.Product.belongsTo(db.ProductBottom);
    db.Product.hasMany(db.ProductOptions);
  }
};
