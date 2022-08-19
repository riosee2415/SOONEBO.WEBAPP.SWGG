const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(60),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        level: {
          // 사용자 권한 [1 : 일반회원, 2 : 비어있음, 3: 운영자, 4: 최고관리자, 5: 개발사]
          type: DataTypes.INTEGER,
          allowNull: false, //
          defaultValue: 1,
        },
        postCode: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        detailAddress: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        // 추천인 아이디
        managerId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        secret: {
          type: DataTypes.STRING(10),
          allowNull: true,
          defaultValue: null,
        },
        userPoint: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        // 대리점 여부
        isAgency: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isExit: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        exitedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        terms: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        bank: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        accountNo: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.belongsTo(db.UserGrade);
    db.User.belongsTo(db.Agency);
  }
};
