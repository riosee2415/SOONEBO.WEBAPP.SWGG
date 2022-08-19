// const DataTypes = require("sequelize");
// const { Model } = DataTypes;

// module.exports = class BoughtItem extends Model {
//   static init(sequelize) {
//     return super.init(
//       {
//         productId: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//         },
//         count: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//           defaultValue: 1,
//         },
//         productName: {
//           type: DataTypes.STRING(300), // 상품명
//           allowNull: false,
//         },
//         productPrice: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//         },
//         productThumbnail: {
//           type: DataTypes.STRING(600),
//           allowNull: false,
//         },
//         productDelPrice: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//         },
//         optionName: {
//           type: DataTypes.STRING(100),
//           allowNull: true,
//         },
//         optionPrice: {
//           type: DataTypes.INTEGER,
//           allowNull: true,
//         },
//         optionCount: {
//           type: DataTypes.INTEGER,
//           allowNull: true,
//         },
//       },
//       {
//         modelName: "BoughtItem",
//         tableName: "boughtItems",
//         charset: "utf8mb4",
//         collate: "utf8mb4_general_ci", // 한글 저장
//         sequelize,
//       }
//     );
//   }
//   static associate(db) {
//     db.BoughtItem.belongsTo(db.BoughtHistory);
//   }
// };
