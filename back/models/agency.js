const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Agency extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        chief: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        bNo: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        postCode: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        mobile2: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(2000),
          allowNull: false,
        },
        memo: {
          type: DataTypes.STRING(2000),
          allowNull: false,
        },
        urlName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        homepageURL: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        iamPortId: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "Agency",
        tableName: "agencys",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
